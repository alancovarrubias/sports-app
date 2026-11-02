# Revisit the backfill time target for nba/mlb given the rate-limit ceiling

Type: grilling
Status: resolved

## Question

Ticket 01 (parallelization mechanism) surfaced the real wall-clock math once the rate-limit ceiling from ticket 02 was locked in as a hard constraint: nba ≈ 11 hours, mlb ≈ 21 hours, football ≈ 5-14 hours (unverified). The map's destination currently says "completing in hours rather than days" — that's not realistic for mlb (closer to a full day) and marginal for nba, no matter how the Kubernetes dispatch mechanism is tuned, because the bottleneck is Basketball-Reference's and Baseball-Reference's documented 20 req/min limits, not compute or cluster capacity.

Decide: does the destination's time target get revised (e.g. "football in hours, nba/mlb within a day" or "within a weekend"), or is there an appetite to explore ways to actually increase throughput despite the source limits (e.g. multiple egress IPs/proxies to get more independent rate-limit buckets — which increases the ToS-violation exposure already flagged and accepted, and risks more frequent 24-hour blocks if detected), or does mlb/nba's scope within this map shrink (e.g. fewer seasons, or dropping one of the two to free up relative priority)?

This decision should happen before nba's and mlb's ingestion-jobs-layer design tickets (05, 06) proceed, since their actual design (e.g. whether a rate-limiter-respecting single worker is "good enough" or whether more sophisticated throughput tricks are wanted) depends on the answer. football's design ticket (04) isn't blocked by this — its math is closer to the original target already.

Call the `grilling` skill.

## Answer

**Revise the destination's time target per-backend, accepting the real numbers**: football in hours; nba within half a day; mlb within a day. No scope change (10 years across all three sports stays as originally pinned), no added legal/ban risk — proxies/multiple-IPs to force faster throughput were explicitly ruled out (escalates from the already-accepted passive-scraping ToS exposure to active rate-limit evasion), and the $5,000+ Sports Reference paid-data route was also declined for now rather than spent on an unproven effort. The map's Destination section is updated to reflect this.

**Additive**: once nba's and mlb's backfills are both built, run them concurrently with each other (not sequentially) — they're independent rate budgets on separate domains (basketball-reference.com vs baseball-reference.com), so running them at the same time is a free win, cutting combined wall-clock from ~32h sequential to ~21h (the longer of the two).
