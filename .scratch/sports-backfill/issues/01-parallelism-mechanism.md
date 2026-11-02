# Choose the Kubernetes parallelization mechanism for Backfill Tasks

Type: grilling
Status: resolved (reopened once — see Reconsideration)
Blocked by: 02, 03 (both resolved)

## Question

How should Backfill Tasks (one bounded slice of backfill work, e.g. "nfl, 2019, weeks 1-4") actually get distributed across Kubernetes so the whole 10-year, 3-backend backfill completes in hours rather than days?

Today:
- The crawler (`crawler/`, Flask + Selenium) is a Kubernetes Deployment with an HPA (`sports-app-infra/ansible/setup_app/templates/k8s/crawler-deployment.yaml`, `crawler-hpa.yaml`): minReplicas 3, maxReplicas 10, scales on 50% CPU utilization. Each scrape spins up a real headless-Chrome session (`crawler/src/v2/scrapers/base.py`) — several seconds per page at minimum.
- football's live pipeline uses Sidekiq/Redis (`football/app/jobs/create_games_job.rb` → `update_game_job.rb`), fed by a `sidekiq` Deployment (`sports-app-infra/ansible/setup_app/templates/k8s/sidekiq-deployment.yaml`).
- There is no Kubernetes `Job`/`CronJob` manifest anywhere in `sports-app-infra` today — only long-running Deployments.
- The crawler's per-sport games endpoints already accept historical params (football: `year`+`week`; nba: `season`, looping an internal `MONTHS` list; mlb: per-team `season`) and cache scraped results in MongoDB keyed by those params (`crawler/src/v2/routes/{football,nba,mlb}.py`), so re-scraping an already-done Backfill Task is already cheap on the crawler side.

Resolve by reading the findings from the two research tickets this one is blocked by (source rate-limit tolerance, stage cluster capacity) and deciding between (at least): scaling the existing Sidekiq/Redis queue to absorb Backfill Tasks as regular jobs vs. introducing Kubernetes-native `Job` resources (one Job per Backfill Task, or one Job with `.spec.parallelism`) run separately from the always-on live pipeline vs. some hybrid. The decision must also fix how many Backfill Tasks can safely run concurrently, since that number is what every downstream per-backend ticket sizes its tasks against.

Call the `grilling` skill. Record the chosen mechanism, the safe concurrency ceiling, and the reasoning as the resolution.

## Answer (superseded — see Reconsideration below)

**Mechanism**: One Kubernetes `Job` per Backfill Task, dispatched separately from the always-on Sidekiq/live pipeline. A shared rate limiter (Redis token bucket, keyed per source domain — `espn.com`, `basketball-reference.com`, `baseball-reference.com`) lives inside the crawler itself, in front of the Selenium scrapers. This decouples dispatch parallelism from source throughput: Jobs can be created in numbers exceeding the safe concurrency ceiling without risk, because the limiter throttles actual outbound HTTP calls centrally regardless of how many Jobs/pods are asking — overprovisioning Jobs just means some sit blocked on the limiter, not that the source gets hammered.

**Concurrency ceilings locked in** (from ticket 02's research):
- football / ESPN: ~3-5 concurrent sessions — unverified inference (ESPN publishes no numeric limit but showed bot-mitigation signs), needs empirical tuning before trusting it.
- nba / Basketball-Reference: ~1-2 concurrent sessions, independent 20 req/min budget (separate domain from mlb's source — NOT shared with mlb).
- mlb / Baseball-Reference: ~1-2 concurrent sessions, independent 20 req/min budget (separate domain from nba's source — NOT shared with nba).

**Wall-clock math surfaced** (order-of-magnitude, pages-to-scrape ÷ safe req/min): nba ≈ 11 hours, mlb ≈ 21 hours, football ≈ 5-14 hours. "Hours or less" is not realistic as originally framed for mlb, and marginal for nba — the bottleneck is almost entirely source rate limits, not Kubernetes parallelism or stage cluster capacity. Per the user's standing instruction, this is surfaced here but **not** re-litigated in this ticket — revisit the destination's time target separately.

**Resumability**: no separate completion-tracking table. A Backfill Task can simply be re-run end-to-end on failure, made safe by two existing/required properties: (a) the crawler's Mongo cache (keyed by `{year}{week}` / `{season}` / `{team}{season}`, see `crawler/src/v2/routes/*.py`) already makes re-scraping a previously-done Backfill Task cheap, and (b) each backend's ingestion jobs must do idempotent Postgres upserts (football's `UpdateGameJob` already does `find_or_create_by!` on `espn_id` — nba's and mlb's from-scratch jobs layer, tickets 05/06, must follow the same pattern). The Kubernetes `Job` resource's own native Succeeded/Failed status is the retry signal; no additional bookkeeping table is needed.

## Reconsideration (supersedes the Answer above)

Raised mid-map: "shouldn't this be a queue worker picking up jobs from a queue?" instead of one k8s `Job` per Backfill Task. Walked through the trade-off honestly:

- **What the queue model fixes**: ticket 08's orchestrator had two genuinely awkward parts — reading a discovered week-count out of `kubectl logs`, and an external wave-sequencing loop for mlb's/nba's inter-task-type dependencies. Both problems are native to Kubernetes `Job`s (which can't talk to each other) and disappear entirely with a queue, where a worker just self-enqueues the next unit of work when it finishes. It also removes the need for ticket 09's brand-new Redis-token-bucket rate limiter inside the crawler — concurrency is just "how many workers are running," no separate limiter needed.
- **What the k8s-Job model had going for it**: a fresh container per task, which matters for Selenium/Chrome specifically (memory leaks, zombie processes accumulate across a long-lived worker's lifetime in a way they don't across many short-lived Job pods). This is a real cost of the queue model, accepted as worth it for the orchestration simplification.

**Decision**: switch to a dedicated queue-worker model, using Sidekiq (already present for football, newly stood up for nba/mlb). A fixed-size worker pool per backend, on a queue separate from live traffic, is the throttle — no crawler-side rate limiter needed. Concurrency ceilings are unchanged from the original research (ticket 02): football ~3-5 workers, nba ~1-2, mlb ~1-2 (nba and mlb get separate queues/worker pools, since their rate budgets are independent per-domain).

**nba/mlb now get Sidekiq/Redis for both live and backfill** — this reverses tickets 05/06's "no Sidekiq, Rake task + k8s CronJob" decision, not just for backfill but across the board, for consistency with football's existing pattern. A k8s `CronJob` is still needed as the periodic trigger (nothing else in this codebase schedules anything), but it now just enqueues a live-sync ActiveJob onto Sidekiq rather than running a Rake task synchronously itself.

**Self-enqueuing chains replace both ticket 08's orchestrator complexity and the original Backfill Task granularity sizing**: a job that discovers football's week count (ticket 04) enqueues the remaining weeks' jobs itself. mlb's teams job enqueues its schedule jobs; schedule enqueues stats jobs; nba's schedule job enqueues its stats jobs. Because Sidekiq handles large job counts natively (that's what it's for), there's no more "minimize k8s object count" pressure — per-game jobs (mirroring football's own existing `CreateGamesJob`→`UpdateGameJob` fan-out, just parameterized with explicit year/week and routed to a `backfill` queue) are now the natural granularity, not the batched season-level tasks tickets 05/06 sized specifically to avoid excess k8s `Job` objects.

**This invalidates the k8s-Job-shaped parts of tickets 04, 05, 06, 08, and 09** — reopened below rather than left showing stale answers. Ticket 10 (nba/mlb task-granularity reconciliation) is absorbed into 05/06's rework rather than independently resolvable now — the season-level batching it was reconciling no longer applies once self-enqueuing per-game/per-task jobs replace it. Ticket 11 (espn_id duplicate check) is unaffected — it's about existing production data, independent of the dispatch mechanism.
