# Proposal: document-existing-repository

## Intent

Establish the first OpenSpec change as baseline documentation for the repository as it exists today, so future changes can reference package boundaries, configuration flow, API surface, and runtime assumptions without re-discovering them.

## Why now

- The repository already has multiple packages, runtime entry points, and deployment/configuration paths.
- Current knowledge is spread across README, package manifests, runtime code, and workflow files.
- A minimal baseline spec lowers the cost of future proposals while avoiding product changes.

## Scope

This change documents existing behavior only.

Included:

- Workspace/package boundaries across the root, `backend/`, and `frontend/`.
- Configuration surfaces and flow, including root scripts, backend environment parsing, frontend site config, and local proxying.
- Existing backend API surface: `/api/health` and `/api/leads`.
- Deployment/runtime assumptions already present in the repo, including Node/pnpm expectations and the GitHub Pages frontend workflow.

Excluded:

- New product features or behavior changes.
- New backend integrations for leads.
- Refactors, dependency changes, or deployment redesign.
- Filling undocumented future-state architecture beyond what the repository already implements.

## Affected areas

- `openspec/changes/document-existing-repository/`
- Root workspace metadata: `package.json`, `pnpm-workspace.yaml`
- Backend runtime/config surface: `backend/package.json`, `backend/src/server.ts`, `backend/src/config/env.ts`, `backend/src/routes/*.ts`
- Frontend runtime/config surface: `frontend/package.json`, `frontend/angular.json`, `frontend/proxy.conf.json`, `frontend/src/assets/config/site.config.json`, `frontend/src/app/core/site-config.service.ts`
- Deployment assumptions: `.github/workflows/deploy-pages.yml`

## Proposed documentation slice

1. Capture the monorepo structure and responsibility split between backend and frontend.
2. Describe how configuration enters the system:
   - root workspace scripts orchestrate package commands;
   - backend reads `PORT` and `FRONTEND_ORIGIN` through Zod-validated env parsing;
   - frontend reads company/site content from `site.config.json`;
   - Angular local development proxies `/api` to the backend.
3. Describe the current backend API surface and its documented purpose:
   - `GET /api/health`
   - `POST /api/leads`
4. Record runtime and deployment assumptions already encoded in the repo:
   - local development defaults (`localhost:3000`, `localhost:4200`);
   - Node 22.x and pnpm 11.x in project metadata;
   - frontend-only GitHub Pages deployment path and its current repo/plan caveat.

## Minimal versioning approach

- Keep this first change documentation-only and repository-shaped.
- Prefer a small set of facts that can be updated alongside code.
- Avoid speculative diagrams, target-state architecture, or requirements for systems not yet present.

## Risks

- Repository drift if future code changes do not update the baseline documentation.
- Runtime documentation may become confusing if Node/runtime expectations remain split between project metadata (Node 22.x) and the GitHub Pages workflow (`setup-node@v4` with Node 24).
- The deployment section can be overread as a product commitment even though GitHub Pages currently covers only the frontend bundle.

## Rollback

Rollback is trivial: remove this OpenSpec change directory if the team decides not to maintain baseline repository documentation in OpenSpec.

## Success criteria

- The change proposal clearly states that this is documentation-only.
- Scope is limited to current package boundaries, config flow, backend API surface, and runtime/deployment assumptions.
- No speculative future features or behavior changes are introduced.
- The proposal is small enough to version and update with normal repository maintenance.

## Proposal question round

To improve the follow-up PRD/spec without changing scope, review these product/documentation questions:

1. Should the baseline explicitly document GitHub Pages as a frontend-only publishing path, or keep deployment notes limited to "current workflow exists"?
2. Should the current Node version mismatch between project metadata (`22.x`) and the Pages workflow (`24`) be treated as a documentation caveat only, or as an issue to flag for later cleanup outside this change?
3. For the backend API surface, should the baseline stop at route names and request purpose, or also include request/response payload summaries for `/api/leads` validation and errors?
4. Should the baseline describe `site.config.json` as the primary customization surface for company-specific content, even though assets/images and style changes also exist?

Current proposal assumptions:

- This first slice stays strictly documentation-only.
- Existing repository facts are more important than completeness.
- Deployment coverage is descriptive, not a promise of production readiness.
- The backend lead route is documented as a template/demo surface, not as a fully integrated business workflow.
