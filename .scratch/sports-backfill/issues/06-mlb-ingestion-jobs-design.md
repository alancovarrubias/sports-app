# Design mlb's ingestion jobs layer (currently nonexistent) for live + Backfill use

Type: grilling
Status: resolved
Blocked by: 01 (resolved), 04 (resolved), 07 (resolved)

## Question

The mlb Backend has no ingestion jobs either (`mlb/app/jobs/` is just the `ApplicationJob` stub), despite having the richest model set of the three (`Game`, `Team`, `Player`, `BattingStat`, `PitchingStat`, `Line`, `Forecast`, `Weather`, `Pred`). The crawler's mlb routes (`crawler/src/v2/routes/mlb.py`) are the most extensive of the three sports, but games are fetched per-team (`/api/mlb/teams/<team>/games?season=`, via Baseball-Reference) rather than league-wide like football/nba — meaning mlb's Backfill Task enumeration is naturally per-team-per-season, a different shape than football's per-league-per-week or nba's per-season-per-month.

mlb also has zero presence outside the crawler: no GraphQL data source in `server/src/dataSources/` (only `footballApi.ts` and `nbaApi.ts` exist), and no Deployment in `sports-app-infra`'s k8s templates. Confirm whether standing up mlb's GraphQL wiring and k8s Deployment is in scope of this ticket's design, or whether it's a separate concern from the ingestion-jobs/Backfill design — likely the latter, since the map's destination only requires data landing in Postgres, not being served. Flag this explicitly in the resolution so it doesn't silently become assumed scope.

Design mlb's ingestion jobs layer from scratch, serving both live and the 10-year Backfill, informed by football's validated Backfill Task pattern (ticket 04, which this one is blocked by) and by mlb's per-team-per-season enumeration shape (30 teams × 10 seasons = 300 team-seasons before per-game box scores/stats are even counted).

Call the `grilling` skill.

## Answer

**Deployment gap (in scope here, as a plan)**: mlb needs an entry in dev `docker-compose.yml` mirroring football's/nba's (`image: mlb:${ENV}`, build context `mlb`, `Dockerfile.${ENV}`, `depends_on: [db]`). `sports-app-infra` will separately need `mlb-deployment.yaml`/`mlb-service.yaml` — noted, not written (separate repo, out of this ticket's reach).

**Live mechanism**: same as nba — no Sidekiq/Redis. A Rake task (`rake mlb:sync_season`, no arg = current season) triggered by a new Kubernetes CronJob. This isn't just consistent with nba's resolution — it's this app's *own* historical pattern (the old `cron.rake`, `rake cron:hourly`, invoked by an external scheduler).

**Reuse the legacy `Database::Builder` layer, adapted**: `mlb/app/lib/database/builder/{teams,players,games,stats,play,play_store}.rb`'s persistence logic (not its HTTP-calling layer, which targets a prior crawler generation's flat endpoint shape) is the starting point. Required fixes while adapting: (a) rewrite `Base#query_server`/`#query` to call the current `crawler/src/v2/routes/mlb.py` endpoints instead of the stale `http://crawler:5000/{model}?sport=MLB&...` shape; (b) fix `Stats#build_stat`'s `model_type` bug — the current `StatsScraper` distinguishes player/team rows by which list they're in (`away_player_stats` vs `away_team_stats`), not a `model_type` key, so the persistence code needs to use that instead of the stale key lookup; (c) `Play`/`PlayStore` (the batted-ball-type derivation from play-by-play text) need only minor adaptation, not a rewrite.

**Batted-ball-type stats (fb/gb/ld) are in scope**: derived for free from the play-by-play text already returned by `StatsScraper` (play-by-play is explicitly in the destination's core-data list) via the adapted `Play`/`PlayStore` logic — not a new scrape or an out-of-scope source.

**Backfill Task shape**: one Backfill Task = one `(season, task-type)` pair — three Rake tasks per season, each its own Backfill Task/k8s Job, matching the natural scrape boundaries:
- `mlb:sync_season_teams[year]` — league-wide (one scrape covers all 30 teams), must run first since team records are looked up by abbr when persisting players/games.
- `mlb:sync_season_schedule[year]` — loops all 30 teams: players + that team's home-game schedule together (both are per-team-per-season scrapes; looping all teams here yields the complete season's games exactly once each, since each game is counted via its home team only).
- `mlb:sync_season_stats[year]` — every game `sync_season_schedule` found that season.

10 years × 3 task-types = 30 Backfill Tasks total for mlb.

**Idempotency fix**: add a migration — unique index on `games` over `(season_id, date, home_team_id, num)`, the composite key `Game#url` already treats as the real identity (`num` distinguishes doubleheader games on the same date between the same two teams; nba didn't need this column, mlb does). Persistence follows the same `find_or_create_by!` shape established for football/nba throughout: `Season.find_or_create_by!(year:)`, `Team.find_or_create_by!(season:, abbr:)`, `Player.find_or_create_by!(season:, team:, abbr:)`, `Game.find_or_create_by!(season:, date:, home_team:, num:)` (now backed by the new index), `BattingStat`/`PitchingStat` `find_or_create_by!(model:, interval:)` then `update!` with the stat fields (including the derived `fb`/`gb`/`ld` counts).

## Reworked (was: Reopened)

Ticket 01 was reconsidered — mlb now gets Sidekiq/Redis after all, for both live and backfill. The legacy `Database::Builder` reuse decision (HTTP layer rewrite, `Stats#build_stat`'s `model_type` bug fix, `Play`/`PlayStore` adaptation), the batted-ball-type stats scope decision, the idempotency fix (unique index on `(season_id, date, home_team_id, num)`), and the deployment-gap plan are all unchanged from the original Answer above — they're independent of dispatch mechanism. What changed:

**Job chain** (replaces the three-way `sync_season_teams`/`sync_season_schedule`/`sync_season_stats` season-level split): four self-enqueuing job classes, adapting the `Database::Builder` logic 1:1 —
- `MlbSyncTeamsJob(year)` — `/api/mlb/teams?season=` (adapts `Builder::Teams`). On success, enqueues `MlbSyncRosterJob(year, team)` **and** `MlbSyncScheduleJob(year, team)` for each of the 30 teams — independent of each other, both enqueued immediately.
- `MlbSyncRosterJob(year, team)` — `/api/mlb/teams/<team>/players?season=` (adapts `Builder::Players`). Leaf node.
- `MlbSyncScheduleJob(year, team)` — `/api/mlb/teams/<team>/games?season=` (adapts `Builder::Games`; mlb's schedule is fetched per-team, unlike nba's season-wide call). Persists that team's home games and `team.link`. On success, enqueues `MlbSyncGameStatsJob(year, game_url)` for every game found.
- `MlbSyncGameStatsJob(year, game_url)` — `/api/mlb/games/<game_url>/stats` (adapts `Builder::Stats` with the `model_type` fix, plus the adapted `Play`/`PlayStore` for `fb`/`gb`/`ld`). Leaf node.

**Live mechanism**: same as nba — no Rake task layer. The k8s CronJob's container command enqueues directly: `rails runner "MlbSyncTeamsJob.perform_later(current_year)"`. Live-triggered chains enqueue on `:default`; backfill-triggered chains enqueue on `:backfill` via an explicit queue override at enqueue time — same job classes serve both.

## Implementation notes

Built in `mlb/app/jobs/{mlb_sync_teams,mlb_sync_roster,mlb_sync_schedule,mlb_sync_game_stats}_job.rb`, `mlb/app/lib/crawler.rb` (new), plus the same Sidekiq wiring pattern as nba (Gemfile, initializer on `redis://redis:6379/3` — football is `/1`, nba is `/2` — `queue_adapter` config) and an `mlb`/`mlb-sidekiq` entry in `docker-compose.build.yml`.

- **`Teams`/`Players`/`Games`/`Stats` builder classes (`mlb/app/lib/database/builder/{teams,players,games,stats}.rb`) are now dead code**, not reused: their HTTP-calling layer was fundamentally incompatible with the current crawler API, so their *logic* was ported directly into the new job classes (idempotent `find_or_create_by!` throughout, replacing the old coarse `needs_data?` guards) rather than calling into the old classes as-is. `base.rb` was left alone despite being unused by the new jobs, because `lineups.rb`/`forecasts.rb`/`season_stats.rb`/`weathers.rb` (out-of-scope data types, still referenced by the existing `lib/tasks/cron.rake`) still inherit from it.
- **`Play`/`PlayStore` needed one real fix each**, not just "minor adaptation": both used string-keyed hash access (`play['text']`, `stats_res['plays']`) against data that `Crawler.stats` returns symbol-keyed (via `deep_symbolize_keys`). Fixed in place. Their actual field-matching logic (play text → batted-ball type, hit-type lookup keyed by player *name* for players / team *abbr* for teams) needed no changes — it already lined up with the current scraper's output.
- **Defensive player lookup in `MlbSyncGameStatsJob`**: `MlbSyncRosterJob` and the schedule→stats chain are enqueued independently with no ordering guarantee between them, so a stats job can run before a team's roster has synced. `team.players.find_or_create_by!(season:, abbr:)` (not `find_by!`) handles this regardless of execution order — matching the legacy `Stats` builder's own defensive `find_or_create_by` pattern, not a new behavior.
- **Queue propagation**: same `.set(queue: queue_name)` pattern as nba's fix, applied throughout this chain too, so a backfill-seeded `MlbSyncTeamsJob` keeps its entire downstream chain on `:backfill`.

Not done: `Gemfile.lock` isn't regenerated for the new `sidekiq` gem (same gap as nba — needs a real `bundle install`), and the k8s CronJob itself (`sports-app-infra`, out of this repo's reach).
