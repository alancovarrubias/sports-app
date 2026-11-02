# Reconcile nba's and mlb's team-discovery task-granularity asymmetry

Type: grilling
Status: closed (absorbed — see Answer)
Blocked by: 05 (reopened), 06 (reopened)

## Question

nba's and mlb's Backfill Task designs split team-discovery differently, despite having the identical underlying dependency (team records must exist before `Player`/`Game` persistence can look them up by abbreviation):

- **mlb** (ticket 06): a dedicated `mlb:sync_season_teams[year]` Backfill Task runs first, separate from `mlb:sync_season_schedule[year]`.
- **nba** (ticket 05): team discovery is bundled directly into `nba:sync_season_schedule[year]`, with no separate teams task at all.

This was surfaced during a full-map review (not a user decision at the time each ticket was resolved) — found during a later review, not a conscious choice at either ticket's resolution time. Neither is wrong (both satisfy the real dependency; mlb's split only differs in granularity, not correctness), but the asymmetry has no stated reason.

Decide: unify on one pattern — either give nba its own `sync_season_teams` task (matching mlb), or fold mlb's teams call into its `sync_season_schedule` task (matching nba) — or leave the asymmetry in place with an explicit rationale (e.g. mlb's per-team loop structurally benefits more from a separate teams-first task than nba's does, if that's actually true). Update tickets 05 and/or 06 with whichever is decided.

Call the `grilling` skill.

## Answer

**Absorbed into 05/06's rework — closed without resolving independently.** Ticket 01 was reconsidered: the dispatch mechanism switched to Sidekiq self-enqueuing chains, under which the season-level batched tasks this ticket was reconciling (`sync_season_schedule` etc.) no longer apply — per-team/per-game jobs are now the natural granularity for both backends. Whatever team-discovery sequencing nba and mlb end up with will be decided fresh as part of reworking tickets 05 and 06, not reconciled against their old shapes.
