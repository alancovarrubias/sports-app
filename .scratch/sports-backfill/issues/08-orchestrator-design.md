# Design the Backfill Task orchestrator/dispatch layer

Type: grilling
Status: resolved
Blocked by: 01 (resolved), 04 (reopened), 05 (reopened), 06 (reopened)

## Question

Something has to actually enumerate Backfill Tasks and create the Kubernetes `Job` objects for each — this has never been designed, only alluded to. Specifically:

- **Football** (ticket 04): week-count-per-season is discovered dynamically by harvesting the full week-selector off whichever week's page loads first for a `(league, year)`. Something has to run that discovery scrape, learn "nfl 2016 has 17 weeks," and then create 17 (or however many) `Job` objects for that season — before any of those Jobs' own pods start.
- **nba/mlb** (tickets 05/06): enumeration is simpler (fixed task-types per season — no dynamic discovery step), but something still has to loop over `(2016..2025) × task-types` and create the corresponding Jobs, respecting the dependency ordering within mlb's three task-types (`sync_season_teams` before `sync_season_schedule`, which must complete before `sync_season_stats` since it needs the games `sync_season_schedule` found).

None of this is designed: not where this orchestrator runs (a human operator's machine? a bootstrap Job itself? a script in `sports-app-infra`'s Ruby CLI, `bin/infra_cli.rb`?), not how it performs football's discovery scrapes (which themselves consume the shared rate-limit budget from ticket 01 — does discovery count against the same per-domain ceiling, or is it cheap enough to ignore?), and not how it sequences mlb's inter-task-type dependencies (wait for `sync_season_teams`'s Job to report Succeeded before creating `sync_season_schedule`'s Job, and so on).

Decide: what is this orchestrator, concretely — a Rake task/script that shells out to `kubectl create job` (or calls the Kubernetes API directly) for each discovered/enumerated Backfill Task, in what sequence, run from where, and how does it handle football's discovery-before-dispatch wrinkle without burning extra rate-limit budget unnecessarily.

Call the `grilling` skill.

## Answer

**Orchestrator location**: a new `Runners::Backfill` (or a new method on `Runners::Cluster`) in `sports-app-infra`'s existing Ruby CLI, run from an operator's machine with `KUBECONFIG` already set — the exact established pattern (`bin/lib/runners/cluster.rb` already shells out to `kubectl` via `Commands::Kubectl` for `restart`/`exec`/`wait_for_nodes`). `Commands::Kubectl` gains a `create_job`-style builder following the same string-builder convention. Job-creation power stays tied to whoever already has kubeconfig access, rather than granting Job-creation RBAC to workloads running inside the cluster.

**Football's discovery feedback loop**: the week-1 Rake task prints a well-defined log line on success (e.g. `WEEK_COUNT=17`). The orchestrator creates the week-1 Job, `kubectl wait --for=condition=complete` on it, then `kubectl logs job/...` to parse that line out, then creates Jobs for the season's remaining discovered weeks. No new infra, no RBAC expansion inside the cluster, no tracking table — reuses logs that already exist.

**Wave sequencing for mlb's teams→schedule→stats and nba's schedule→stats dependencies**: the orchestrator dispatches one wave at a time **per season** — e.g. all 10 years' `sync_season_teams` Jobs go out together (years don't depend on each other, only task-types within the same year do), waits for that whole wave to reach Succeeded, then dispatches the next wave. Different backends and different years can have waves running concurrently/interleaved; the actual throughput gate is ticket 01's crawler-side rate limiter, not this sequencing. No workflow engine (Argo/Tekton/etc.) is introduced — plain `kubectl wait` loops in the Ruby CLI are sufficient.

**Failure handling**: rely on each Kubernetes Job's own `.spec.backoffLimit` for automatic retry of transient failures (pod crashes, etc.) — no orchestrator involvement for those. A Job that exhausts `backoffLimit` and lands in a terminal Failed state gets manually re-dispatched: since every Backfill Task's parameters are fully deterministic (`(league, year, week)` or `(season, task-type)`), a retry is just re-running the identical `kubectl create job` command for that one task. No separate failure-tracking beyond listing non-succeeded Jobs (e.g. `kubectl get jobs --field-selector status.successful=0`) — consistent with ticket 01's "no tracking table" resumability model.

## Reworked (was: Reopened)

Ticket 01 was reconsidered — the dispatch mechanism switched from k8s `Job`s to a Sidekiq queue-worker model where workers self-enqueue follow-on work directly (confirmed concretely in tickets 04/05/06's reworks: `week==1`'s job, `NbaSyncTeamsJob`, and `MlbSyncTeamsJob` are each the sole discovery/fan-out point for their chain). This removes almost everything this ticket originally existed to solve — no external process needs to discover football's week-count via `kubectl logs`, and no wave-sequencing is needed for mlb's/nba's inter-task-type dependencies.

**What's left**: just the initial seed step — the one enqueue per independent starting point that kicks off each self-enqueuing chain. Total: 50 seed enqueues — 30 for football (`BackfillFootballWeekJob.set(queue: :backfill).perform_later(league, year, 1)` for each of 3 leagues × 2016-2025), 10 for nba (`NbaSyncTeamsJob.set(queue: :backfill).perform_later(year)` for 2016-2025), 10 for mlb (`MlbSyncTeamsJob.set(queue: :backfill).perform_later(year)` for 2016-2025).

**Design**: a `rake backfill:seed` task defined in each backend (football, nba, mlb) that loops its own years (and leagues, for football) and enqueues with the `:backfill` queue override. `sports-app-infra`'s existing `Runners::Cluster` (`bin/lib/runners/cluster.rb`) gains a new method — call it `backfill_seed` — that does `kubectl exec <pod> -- bundle exec rake backfill:seed`, mirroring its existing `seed` method's exact pattern (`@kubectl_command.exec(target_pod, 'rails', 'runner', %("load Rails.root.join('db/seeds.rb')"))`) almost verbatim, just invoking a different Rake task and reusing the same `-d <backend>` target-pod selection `seed`/`console`/`dump`/`restore` already use. No new Runner class, no `kubectl wait`/log-parsing, no workflow engine.

**Failure handling**: Sidekiq's own retry/backoff replaces `.spec.backoffLimit` + manual `kubectl create job` re-dispatch — nothing orchestrator-side needed for retries at all now.
