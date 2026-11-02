# Research: how much concurrent scraping can ESPN, Basketball-Reference, and Baseball-Reference tolerate

Type: research
Status: resolved

## Question

The crawler scrapes three third-party sources with real headless-Chrome sessions: ESPN (football, via `crawler/src/v2/url_builders/espn.py`), Basketball-Reference (nba, via `crawler/src/v2/url_builders/basketball_reference.py`), and Baseball-Reference (mlb, via `crawler/src/v2/url_builders/baseball_reference.py`). Backfilling 10 years across all three sports means fanning out to many concurrent scrapes against these sites.

Research each source's published (or reasonably inferred) rate limits, `robots.txt` crawl-delay directives, and any documented tolerance for automated/bulk access, plus whether any of the three publish a bulk-data API or downloadable dataset that would avoid scraping entirely for historical data. Also check whether the crawler already has any throttling/backoff/proxy logic (search `crawler/src/v2/` and `crawler/src/v2/scrapers/base.py` for retry/rate-limit handling — `retry_on_navigation`/`retry_on_stale` exist for flaky page loads, but confirm there's no existing rate-limit-specific logic).

Call the `research` skill. Capture: each source's `robots.txt` crawl-delay (if any), any stated or empirically-reasonable safe concurrency ceiling per source, whether a bulk/API alternative exists for any of them, and the risk of IP-ban/CAPTCHA at various concurrency levels. This feeds directly into the parallelism-mechanism ticket (01) this one blocks.

## Findings

Basketball-Reference and Baseball-Reference (both run by Sports Reference LLC) publish an explicit, documented limit of 20 requests/minute per IP/session, enforced with an up-to-24-hour block if exceeded — their robots.txt also sets `Crawl-delay: 3`. That caps safe sustained concurrency at roughly 1-2 concurrent Selenium sessions per site, with combined request rate kept well under 20/min. ESPN publishes no numeric rate limit at all; its robots.txt has no `Crawl-delay` but does block several named bots outright, and a live probe during research returned a suspicious HTTP 202/empty-body response suggestive of an active bot-mitigation layer (e.g. Akamai) — concurrency of roughly 3-5 sessions is a cautious inference, not a documented fact, and should be tuned empirically. None of the three sites offers a bulk-download or public API covering 10 years of historical schedules/boxscores; SRL explicitly says "it's not our business model" and charges a $5,000 minimum for custom data requests. The crawler's current code (`crawler/src/v2/scrapers/base.py`) has no rate-limiting, backoff, or proxy-rotation logic — `retry_on_navigation`/`retry_on_stale` exist only to handle ESPN's self-reloading pages and stale DOM elements, confirming new throttling logic would need to be built from scratch for any backfill to stay under these ceilings.

See docs/research/source-rate-limit-tolerance.md on branch research/source-rate-limit-tolerance for full findings.
