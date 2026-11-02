# sports-app

A multi-sport stats platform: three Rails backends (football, nba, mlb) scrape and persist game data via a shared Python crawler, exposed to clients through a GraphQL server.

## Language

**Backend**:
One of the three Rails applications — `football`, `nba`, `mlb` — each with its own database, models, and jobs. The unit of granularity for "per-sport" work: football's three Leagues are internal to one Backend, not three separate units.
_Avoid_: sport (ambiguous with League), app, service.

**League**:
football's `Season.league` enum (`nfl`, `cfb80`, `cfb81`) — independent schedules and seasons within the football Backend. nba and mlb have no League concept; each is a single implicit league within its own Backend.
_Avoid_: sport, division.

**Backfill**:
A one-time bulk fetch of historical data that predates when a Backend started tracking it live, as opposed to the existing live/current-season ingestion jobs (`CreateGamesJob`, `UpdateGameJob`, etc.) which only ever look at "now."
_Avoid_: historical import, batch load, sync.

**Backfill Task**:
One bounded slice of Backfill work dispatched as a unit of parallelism (e.g. "nfl, 2019, week 5"). Realized as a Sidekiq-enqueued ActiveJob instance on a dedicated `backfill` queue, not a Kubernetes `Job` resource (an earlier design used k8s `Job`s directly; superseded — see the sports-backfill map's ticket 01). Still a distinct domain concept from the Rails `*Job` class that embodies it, since "Backfill Task" names the logical unit of work (what, e.g. "nfl 2019 week 5"), not the Ruby class.
_Avoid_: job (ambiguous with ActiveJob), work item, chunk, shard.
