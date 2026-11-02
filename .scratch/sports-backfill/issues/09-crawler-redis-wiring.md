# Wire Redis into the crawler for ticket 01's rate limiter

Type: grilling
Status: closed (superseded — see Answer)
Blocked by: 01 (resolved)

## Question

Ticket 01 decided the crawler needs a shared Redis token-bucket rate limiter (keyed per source domain) in front of its Selenium scrapers. Nothing about actually getting Redis into the crawler was decided — and today the crawler has no path to Redis at all: `crawler/Pipfile` depends only on `pymongo` (no Python Redis client), and its Kubernetes Deployment (`sports-app-infra/ansible/setup_app/templates/k8s/crawler-deployment.yaml`) only wires a `MONGO_URI` env var, no `REDIS_URL`.

A `redis` instance already exists in dev `docker-compose.yml` (used today only by `sidekiq`, at `redis://redis:6379/1`) and presumably has a counterpart in `sports-app-infra`'s stage/prod provisioning.

Decide:
1. Does the crawler's rate limiter reuse that same Redis instance (a different db number, e.g. `/2`, to stay isolated from Sidekiq's queue data), or does it need its own dedicated Redis instance/deployment?
2. What Python Redis client gets added to `crawler/Pipfile` (e.g. `redis-py`), and what does the token-bucket implementation look like at a high level (key naming per domain, bucket size, refill rate matching ticket 01's ceilings — football ~3-5, nba ~1-2, mlb ~1-2)?
3. What's the plan for `crawler-deployment.yaml` gaining a `REDIS_URL` env var (noted here, not written — that's `sports-app-infra`, a separate repo) and for dev `docker-compose.yml`'s `crawler` service gaining the same?

Call the `grilling` skill.

## Answer

**Moot — closed without resolving.** Ticket 01 was reconsidered: the dispatch mechanism switched from k8s `Job`s + a crawler-side rate limiter to a Sidekiq queue-worker model, where the per-backend worker pool size *is* the concurrency throttle. There's no more rate limiter for the crawler to host, so there's nothing left for this ticket to design. The crawler keeps its existing Mongo-only dependency footprint; no `REDIS_URL` wiring is needed there after all.
