# Check football's games table for duplicate espn_id rows before the unique-index migration runs

Type: task
Status: resolved
Blocked by: 04 (resolved)

## Question

Ticket 04 calls for `add_index :games, :espn_id, unique: true` on football's `games` table, to make ticket 01's "just re-run a failed Backfill Task" resumability model actually safe. Football's `games` table has live production data today — if any duplicate `espn_id` rows already exist (from a past race, a bug, or manual data fixing), the migration fails outright when it runs.

This needs someone with access to football's production (and/or stage) Postgres database to run:

```sql
SELECT espn_id, COUNT(*) FROM games GROUP BY espn_id HAVING COUNT(*) > 1;
```

against each environment the migration will eventually run in, and record what comes back:
- **Empty result**: no duplicates, the migration is safe to run as planned.
- **Any rows returned**: duplicates exist — decide (and record) how they get resolved (e.g. which duplicate to keep, whether `Stat`/`Line` rows pointing at the discarded duplicate need re-pointing) before the migration can run.

This is a manual DB check, not something resolvable from the repo alone — hand it to whoever has database access, record the result here, and note which environments were checked.

## Answer

**No pre-migration check needed — existing data is disposable.** The user's call: football's current production data isn't worth protecting, so the careful "find duplicates, decide how to resolve each one, preserve related Stat/Line rows" path this ticket was written for doesn't apply. If the `add_index :games, :espn_id, unique: true` migration (ticket 04) fails on existing duplicates, the fix is a trivial destructive cleanup — delete the duplicate rows (keeping one per `espn_id`) immediately before the index is added — not a careful reconciliation. No read-only query or sign-off from someone with DB access is required first.
