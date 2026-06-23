## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 20-80 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR |
| Delivery strategy | single-pr |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: stacked-to-main
400-line budget risk: Low

## Tasks

- [x] **RED — confirm repository facts against source files**
  - Re-check the documented facts in `openspec/changes/document-existing-repository/proposal.md`, `openspec/changes/document-existing-repository/specs/repository-baseline/spec.md`, and `openspec/changes/document-existing-repository/design.md` against:
    - `package.json`
    - `pnpm-workspace.yaml`
    - `backend/package.json`
    - `backend/src/config/env.ts`
    - `backend/src/server.ts`
    - `backend/src/routes/health.ts`
    - `backend/src/routes/leads.ts`
    - `frontend/package.json`
    - `frontend/proxy.conf.json`
    - `frontend/src/assets/config/site.config.json`
    - `frontend/src/app/core/site-config.service.ts`
    - `.github/workflows/deploy-pages.yml`

- [x] **GREEN — sync the baseline documentation only where facts drift**
  - Update only the OpenSpec change docs under `openspec/changes/document-existing-repository/` so workspace boundaries, config flow, API behavior, and runtime/deployment assumptions match the repository exactly.
  - Keep the change documentation-only; do not edit application code, scripts, workflow behavior, or package metadata.

- [x] **TRIANGULATE — align repeated statements across artifacts**
  - Make sure `proposal.md`, `design.md`, and `specs/repository-baseline/spec.md` say the same thing about:
    - `backend` vs `frontend` responsibilities
    - `PORT` / `FRONTEND_ORIGIN` defaults
    - `GET /api/health` and `POST /api/leads`
    - Node `22.x`, pnpm `11.x`, and Pages workflow Node `24`
    - frontend-only GitHub Pages deployment and demo-mode `apiBaseUrl`

- [x] **REFACTOR / VERIFY — keep the slice minimal and check it is reviewable**
  - Trim any speculative wording from `openspec/changes/document-existing-repository/` so the baseline stays repository-shaped and versionable.
  - Verify the change remains low-risk by confirming only documentation files changed and no new feature or code work was introduced.

- [x] **SYNC — prepare the change for later phases**
  - Leave `openspec/changes/document-existing-repository/tasks.md` as the implementation checklist for apply/verify/sync.
  - Preserve clear source-of-truth links in the change docs so future updates can be made from the same repository files.
