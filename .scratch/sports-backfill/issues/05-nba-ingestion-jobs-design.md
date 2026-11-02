# Design nba's ingestion jobs layer (currently nonexistent) for live + Backfill use

Type: grilling
Status: resolved
Blocked by: 01 (resolved), 04 (resolved), 07 (resolved)

## Question

nba's `app/jobs/` (`nba/app/jobs/`) contains only the `ApplicationJob` stub — no `CreateGamesJob`/`UpdateGameJob` equivalent exists, unlike football. nba's models already exist (`Game`, `Team`, `Player`, `Season`, `Stat`, `TeamStat`, `PlayerStat`), and the crawler's nba routes (`crawler/src/v2/routes/nba.py`) already support a `season` param on `/api/nba/games` (looping an internal `MONTHS` list, scraping Basketball-Reference) and `season` on `/api/nba/teams`/`players`, cached in MongoDB.

Design nba's ingestion jobs layer from scratch, built to serve both the live/current-season case and the 10-year Backfill from day one (unlike football, where backfill is being retrofitted onto an existing live-only pattern). Reference the validated pattern from football's Backfill Task design (ticket 04, which this one is blocked by) for what to mirror vs. what nba's different data shape (season+month enumeration, Basketball-Reference as source, no per-league split) requires doing differently. nba also has no Deployment/k8s manifest in `sports-app-infra` yet, unlike football/sidekiq/crawler/auth/server/client — confirm whether a new nba Rails Deployment is needed in `sports-app-infra`'s k8s templates to run these jobs, or whether it runs inside an existing pod. (The GraphQL server already wires up `nbaApi.ts` in `server/src/dataSources/`, so serving isn't a gap here — only ingestion is.)

Call the `grilling` skill.

## Answer

**Deployment gap (in scope here, as a plan — this map doesn't execute)**: nba needs an entry in dev `docker-compose.yml` mirroring football's (`image: nba:${ENV}`, build context `nba`, `Dockerfile.${ENV}`, `depends_on: [db]`, port `3001` to match what `server/src/dataSources/nbaApi.ts` already expects). `sports-app-infra` will separately need `nba-deployment.yaml`/`nba-service.yaml` mirroring football's — noted here, not written (separate repo, out of this ticket's reach).

**Live mechanism**: no Sidekiq/Redis for nba — it has no queue infrastructure today and doesn't need one. A plain Rake task, `rake nba:sync_season` (no arg = current season), triggered by a new Kubernetes CronJob. This matches the codebase's own actual historical precedent (the old mlb `cron.rake`, invoked by an external scheduler) rather than football's Sidekiq self-perpetuation pattern, which nothing requires nba to copy.

**Backfill Task shape**: one Backfill Task = one `(season, task-type)` pair — two Rake tasks per season, each its own Backfill Task/k8s Job, sharing one code path with the live sync (explicit `year` = backfill, omitted = live/current):
- `nba:sync_season_schedule[year]` — teams, players, season schedule (the crawler's `/api/nba/games?season=` already aggregates all 9 months in one logical fetch).
- `nba:sync_season_stats[year]` — per-game stats for every game `sync_season_schedule` found that season (the bulk of the volume).

10 years × 2 task-types = 20 Backfill Tasks total for nba. No finer month/game-level Jobs — the ~1-2 session ceiling means more Jobs wouldn't buy more throughput, only smaller retry blast radius, and the crawler's existing per-month/per-game Mongo caching already makes a full season-task retry cheap.

**Idempotency fix**: add a migration — unique index on `games` over `(season_id, date, home_team_id)`, the composite key `Game#url` already treats as the real identity (no `espn_id` equivalent exists for nba; Basketball-Reference games are identified by date+home team, not a numeric id). Persistence throughout follows the same `find_or_create_by!` shape as football: `Season.find_or_create_by!(year:)`, `Team.find_or_create_by!(season:, abbr:)`, `Player.find_or_create_by!(season:, team:, abbr:)`, `Game.find_or_create_by!(season:, date:, home_team:)` (now backed by the new index), `Stat` (`TeamStat`/`PlayerStat`) `find_or_create_by!(model:, interval:)` then `update!` with the stat fields.

**Season year convention**: `Season.year` stores Basketball-Reference's own season-end-year convention directly (e.g. `2020` for the 2019-20 season) — no translation layer between the crawler's `season` param and Rails' `year` column.

## Reworked (was: Reopened)

Ticket 01 was reconsidered — nba now gets Sidekiq/Redis after all, for both live and backfill. The idempotency fix (unique index on `(season_id, date, home_team_id)`), the `find_or_create_by!` persistence shape, the deployment-gap plan (dev `docker-compose.yml` + noting `sports-app-infra`'s k8s Deployment), and the Season year convention are all unchanged from the original Answer above. What changed:

**Job chain** (replaces the season-level `sync_season_schedule`/`sync_season_stats` split): four job classes, mirroring football's self-enqueuing pattern and the crawler's actual scrape boundaries —
- `NbaSyncTeamsJob(year)` — `/api/nba/teams?season=`, persists all teams. On success, enqueues `NbaSyncRosterJob(year, team)` for every team **and** `NbaSyncScheduleJob(year)` — these two are independent of each other, both enqueued immediately.
- `NbaSyncRosterJob(year, team)` — `/api/nba/teams/<team>/players?season=`, persists that team's roster. Leaf node, no further enqueue.
- `NbaSyncScheduleJob(year)` — `/api/nba/games?season=`, persists the season's games. On success, enqueues `NbaSyncGameStatsJob(year, game_url, away_team, home_team)` for every game found.
- `NbaSyncGameStatsJob(...)` — `/api/nba/games/<game_url>/stats?...`, persists `TeamStat`/`PlayerStat`. Leaf node.

This gives nba its own teams-first job — resolving ticket 10's old asymmetry (nba used to bundle teams into its schedule job while mlb split them out) by unifying on mlb's original approach for both.

**Live mechanism**: no Rake task layer. The k8s CronJob's container command enqueues directly: `rails runner "NbaSyncTeamsJob.perform_later(current_year)"`. Live-triggered chains enqueue on `:default` (matching football's convention); backfill-triggered chains enqueue on `:backfill` via an explicit queue override at enqueue time (`NbaSyncTeamsJob.set(queue: :backfill).perform_later(year)`) — same job classes serve both, differing only in which year and which queue.

## Implementation notes

Built in `nba/app/jobs/{nba_sync_teams,nba_sync_roster,nba_sync_schedule,nba_sync_game_stats}_job.rb`, `nba/app/lib/crawler.rb` (new — nba had no Crawler client at all before this), plus Sidekiq wiring (`Gemfile`, `config/initializers/sidekiq.rb`, `config.active_job.queue_adapter = :sidekiq`) and a `nba`/`nba-sidekiq` entry in the root `docker-compose.yml` (on `redis://redis:6379/2`, separate db index from football's `/1`).

Two things worth recording:
- **nba also has a legacy `Database::Builder` layer** (`nba/app/lib/database/builder/{base,team,player,game,stat}.rb`) that this ticket's original grilling never surfaced — only mlb's was found at the time. It has the exact same shape of staleness mlb's did: an HTTP-calling layer targeting a prior crawler generation, and a `Stat` builder with the identical `model_type`-key bug (current `StatsScraper` distinguishes player/team rows by which list they're in, not a `model_type` key). The four new job classes adapt this legacy persistence logic (including the exact `csk`-timestamp date-parsing trick in `Game`) rather than being written from scratch, matching how mlb's ticket already handled this.
- **Queue propagation through the self-enqueuing chain**: the original design said backfill-triggered chains run on `:backfill` "same job classes... differing only in which year and which queue" — but a job's own `queue_as :default` class declaration doesn't automatically carry forward to jobs it enqueues. Each self-enqueue uses `.set(queue: queue_name)` (the currently-executing job's own resolved queue) rather than calling `.perform_later` bare, so a backfill-seeded `NbaSyncTeamsJob` correctly keeps its entire downstream chain (`NbaSyncRosterJob`, `NbaSyncScheduleJob`, `NbaSyncGameStatsJob`) on `:backfill` instead of silently falling back to `:default` partway through.

Not done: the `Gemfile.lock` update for the new `sidekiq` gem (needs a real `bundle install`, no network/bundler execution available here) and the k8s CronJob itself (that's `sports-app-infra`, out of this repo's reach, same as the deployment-gap plan already noted above).
