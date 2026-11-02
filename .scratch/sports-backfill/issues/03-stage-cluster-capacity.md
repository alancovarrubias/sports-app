# Research: stage DOKS cluster's current capacity and headroom

Type: research
Status: resolved

## Question

The backfill is targeted to run on the `stage` environment (DigitalOcean Kubernetes, provisioned via `sports-app-infra/terraform/stage/` and `ansible/setup_stage.yml`, orchestrated by `Runners::Cluster` — see `sports-app-infra/CONTEXT.md`). Before deciding how aggressively to parallelize Backfill Tasks, find out what capacity actually exists today: node pool size/instance type (`terraform/stage/variables.tf`, `terraform/stage/main.tf`, `terraform/modules/infra`), the crawler Deployment's current resource requests/limits (`ansible/setup_app/templates/k8s/crawler-deployment.yaml`: currently 300m/768Mi requests, 1000m/1.5Gi limits per pod) and HPA ceiling (currently maxReplicas 10, see `crawler-hpa.yaml`), the stage Postgres instance's connection limits, and whether stage's DB is sized the same as prod or deliberately smaller.

This is a local-repo investigation (Terraform/Ansible/k8s manifest reading in `sports-app-infra`), not external research, but use the `research` skill's capture discipline. Capture: current node capacity, current CPU/memory headroom if the crawler scaled past its current HPA ceiling, Postgres connection ceiling, and whether reaching the stage environment requires any access/credentials setup the agent doesn't already have (if so, flag it explicitly — it may need to become a `task` ticket instead of being answered here). This feeds directly into the parallelism-mechanism ticket (01) this one blocks.

## Findings

Stage's DOKS node pool is a single `s-4vcpu-8gb` pool that autoscales 1-5 nodes (4 vCPU/8GB each, so 4-20 vCPU / 8-40GB nominal across the pool) — and notably it's provisioned through the exact same unparameterized Terraform module as prod, so stage's node pool and Postgres tier (`db-s-1vcpu-1gb`, single node, no HA) are not deliberately downsized for staging; they're identical to prod's. The crawler's current HPA ceiling (10 replicas x 300m/768Mi requests) already consumes roughly a full baseline node by itself, and combined with the other always-on services (sidekiq, client) already exceeds one node's nominal memory — meaning the cluster autoscaler is likely already scaling stage beyond 1 node today. If the HPA ceiling were raised, nominal headroom across the 5-node pool cap could support roughly 3-4x the current crawler ceiling, though this is approximate since real per-node allocatable capacity (after DO's system overhead) isn't visible from static config. The exact Postgres connection limit for the `db-s-1vcpu-1gb` tier isn't set anywhere in Terraform (it's a DO server-side property of the plan) and the crawler itself talks to Mongo, not Postgres — Postgres pressure would come from whichever Rails services (football/auth/server/sidekiq) the backfill drives. Live-cluster numbers (actual node count, actual utilization, actual DB connection ceiling) need `kubectl`/DO console access this investigation didn't attempt, since it was scoped to committed config only.

See docs/research/stage-cluster-capacity.md on branch research/stage-cluster-capacity in sports-app-infra for full findings.
