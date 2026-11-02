# Design football's Backfill Task: extending CreateGamesJob/UpdateGameJob for historical ranges

Type: grilling
Status: resolved
Blocked by: 01 (resolved)

## Question

football already has a live ingestion pattern: `CreateGamesJob` (`football/app/jobs/create_games_job.rb`) loops `LEAGUES` (`nfl`, `cfb80`, `cfb81` — `football/app/models/concerns/constants.rb`), calls `Crawler.schedule(league:)` with no year, and enqueues `UpdateGameJob` (`football/app/jobs/update_game_job.rb`) per unseen `espn_id`. Neither takes a year or week range — the whole pattern assumes "current season, right now" (see also `ScheduleUpdateGamesJob`, which filters `Game.where(date: DateTime.today)`).

The crawler side is already ready for historical pulls: `/api/football/games` (`crawler/src/v2/routes/football.py`) already accepts `year` and `week` query params and caches by `{year}{week}` in MongoDB — but the Rails `Crawler` client module (`football/app/lib/crawler.rb`) only ever calls `schedule(league:)`, never passing year/week.

Design how football's Backfill Tasks get enumerated and executed: what a Backfill Task concretely is for football (e.g. one `(league, year, week)` triple), how it's dispatched using the parallelism mechanism chosen in ticket 01, how it tracks its own completion for resumability, and whether it reuses `CreateGamesJob`/`UpdateGameJob` (extended with year/week params) or introduces new job classes alongside them. Also decide how far back "10 years" reaches for each of the 3 leagues, given `cfb80`/`cfb81` may have different history depth on ESPN than `nfl`.

Call the `grilling` skill. This ticket's resolution is the validated pattern that the nba (05) and mlb (06) jobs-layer design tickets, blocked on this one, extend.

## Answer

**A football Backfill Task is one `(league, year, week)` triple**, dispatched as one Kubernetes `Job` (per ticket 01), covering `2016`-`2025` (the last 10 completed seasons — not the in-progress one) across all three `LEAGUES` (`nfl`, `cfb80`, `cfb81`).

**Execution model**: the pod runs a new Rake task (`rails backfill:football[league,year,week]`, becoming the k8s Job's container command) that processes everything for that triple **synchronously, in-process** — no Sidekiq enqueueing. `UpdateGameJob`'s fetch+persist logic (gamecast/boxscore/playbyplay/stats) is extracted into a plain shared service object, called both by the live `UpdateGameJob#perform` (Sidekiq path, unchanged) and by this new Rake task (sync path). `CreateGamesJob` itself stays live-only; the Rake task replaces its role for historical runs, reusing the extracted service rather than `UpdateGameJob.perform_later`.

**Crawler client change**: `football/app/lib/crawler.rb`'s `EndpointBuilder.schedule` gains optional `year:`/`week:` kwargs (nil default preserves today's live-call behavior — `CreateGamesJob` is unaffected). The Rake task calls it with explicit values, then **must verify** the response's self-reported `schedule_data[:year]`/`[:week]` (parsed by the crawler's `ScheduleScraper` from the page's own "active week" element, not an echo of the request) match what was requested — a mismatch means ESPN didn't actually serve the requested week, and the task must fail loudly (non-zero exit) so the k8s Job's native retry/backoff kicks in, consistent with ticket 01's "just re-run on failure" model.

**Week-count-per-season**: revised from the original hardcoded-table answer — **discovered dynamically**, for all three leagues, not hardcoded. Reasoning: NFL's week count is a stable two-era fact (17 weeks through 2020, 18 from 2021), but `cfb80`/`cfb81`'s season structure is materially less predictable (different team counts, bye-week patterns, conference-championship/bowl weeks) than a two-value NFL split, so a hardcoded table risks silently missing or over-fetching weeks for the college leagues specifically.

This doesn't need to cost an extra round-trip: `crawler/src/v2/scrapers/nfl/schedule.py`'s `ScheduleScraper` already loads a page containing a full week-selector (`.custom--week` elements, of which `.is-active` is one — `get_active_url` currently only reads the active one via `find_elements(".custom--week.is-active")[0]`). The same page load for *any* single week of a season should already expose every other week's element too. Extend `ScheduleScraper.parse_data` to also harvest the full set of `.custom--week` elements' week numbers (not just the active one), giving the season's complete week list for free off whichever week's page is loaded first. (This needs empirical verification against the live page during implementation — the selector's exact structure wasn't observed directly, only inferred from the existing scraper code, consistent with this map being plan-only.) The Backfill Task enumeration step (at Job-creation time, not inside each pod) uses the first week scraped for a given `(league, year)` to discover the rest, then dispatches the remaining weeks' Backfill Tasks.

**Postseason**: **out of scope for this map**, deferred to a later effort (ESPN's schedule endpoint hardcodes `seasontype/2`/regular-season whenever an explicit year is passed — reaching playoff weeks needs a crawler-side change not taken on here). Added to the map's Out of scope section.

**Idempotency fix**: add a migration — `add_index :games, :espn_id, unique: true`. Required for ticket 01's "just re-run a failed Backfill Task" resumability model to actually be safe under concurrent/retried k8s Job pods; today only application-level `find_by_espn_id`/`find_or_create_by!` checks exist, with no DB constraint backing them.

## Reworked (was: Reopened)

Ticket 01 was reconsidered — the dispatch mechanism switched from "one k8s `Job` per Backfill Task" to a Sidekiq queue-worker model. The idempotency fix (unique index on `espn_id`) and the 2016-2025 window are unchanged from the original Answer above. What changed:

**Execution model**: a new job class, `BackfillFootballWeekJob(league, year, week)`, enqueued onto a dedicated `backfill` Sidekiq queue (a new `sidekiq-backfill` Deployment in `sports-app-infra`, running `bundle exec sidekiq -q backfill -c 5` — concurrency matching ticket 01's football ceiling, ~3-5 — noted, not written, since that's a separate repo). No Rake task, no k8s `Job`, no shared-service-object extraction. `BackfillFootballWeekJob#perform` calls `Crawler.schedule(league:, year:, week:)` (same crawler-client change as before), verifies the self-reported year/week match (same check as before — a mismatch raises, and Sidekiq's own retry/backoff handles it), then for each `espn_id` found, enqueues the **existing, unchanged** `UpdateGameJob` with its queue overridden at enqueue time: `UpdateGameJob.set(queue: :backfill).perform_later(espn_id, season.id, week)`. No new shared logic needed — `UpdateGameJob` already does exactly the right thing; it just needed to be reachable from an async enqueue instead of a synchronous in-process call, which Sidekiq already gives for free.

**Discovery hand-off**: `week == 1`'s job is the sole owner of discovery. In addition to processing its own week, it harvests the full week-selector (same mechanism as the original Answer — extending `ScheduleScraper.parse_data` to return every `.custom--week` element's week number, not just the active one) and self-enqueues `BackfillFootballWeekJob.perform_later(league, year, w)` for each remaining week `w` in `2..N`. Every other week's job is just "process this one week" — no discovery logic, no re-enqueueing. This means ticket 08's remaining "seed" step only has to enqueue week=1 for each `(league, year)` — 3 leagues × 10 years = 30 seed enqueues total, not one per week.

**Postseason** and all other original decisions are unaffected by this rework.
