# Design: document-existing-repository

## Summary

This change adds a small OpenSpec design for documenting the repository as it exists today. The design stays documentation-only and organizes the baseline around four factual slices already encoded in the repo:

1. workspace/package boundaries;
2. configuration flow;
3. current backend API surface;
4. runtime and deployment assumptions.

No application behavior, package layout, deployment flow, or API logic changes in this phase.

## Documentation Structure

The baseline documentation should be organized to mirror the existing repository shape so future updates can be made by checking a short, stable set of files:

### 1. Workspace structure

Describe the root workspace as the entry point for developer workflows and package orchestration.

Primary evidence:

- `package.json`
- `pnpm-workspace.yaml`
- `backend/package.json`
- `frontend/package.json`

Facts captured from these files:

- the repo is a pnpm workspace;
- the workspace contains only `backend` and `frontend`;
- root scripts delegate `dev:backend`, `dev:frontend`, `build`, and `build:pages`;
- `backend` is the Node/Express API package;
- `frontend` is the Angular application package.

### 2. Configuration flow

Describe configuration as a read-only path from repository metadata and runtime files into the running apps.

Primary evidence:

- `backend/src/config/env.ts`
- `backend/src/server.ts`
- `frontend/src/assets/config/site.config.json`
- `frontend/src/app/core/site-config.service.ts`
- `frontend/src/app/pages/home/home.component.ts`
- `frontend/proxy.conf.json`

Facts captured from these files:

- backend reads `PORT` and `FRONTEND_ORIGIN` through Zod parsing, with defaults `3000` and `http://localhost:4200`;
- backend applies `FRONTEND_ORIGIN` to CORS and listens on `PORT`;
- frontend loads company-facing content from `site.config.json` at runtime through `SiteConfigService`;
- local Angular development proxies `/api` to `http://localhost:3000`;
- lead submission only calls the backend when `apiBaseUrl` is populated; otherwise the frontend stays in demo mode.

### 3. Backend API surface

Describe only the routes that currently exist and their observable behavior.

Primary evidence:

- `backend/src/server.ts`
- `backend/src/routes/health.ts`
- `backend/src/routes/leads.ts`

Facts captured from these files:

- `GET /api/health` returns JSON with `status: "ok"` and service name `Plantilla Empresas Plasencia API`;
- `POST /api/leads` validates `name`, `email`, optional `phone`, and `message`;
- invalid lead payloads return HTTP 400 with validation errors;
- valid lead payloads return HTTP 201 with a success message;
- successful lead handling currently logs the payload and does not persist or forward it.

### 4. Runtime and deployment assumptions

Describe only assumptions already encoded in metadata and workflow files.

Primary evidence:

- `package.json`
- `.github/workflows/deploy-pages.yml`
- `frontend/src/assets/config/site.config.json`

Facts captured from these files:

- local expectations are Node `22.x` and pnpm `11.x`;
- default local URLs are `http://localhost:3000` for backend and `http://localhost:4200` for frontend;
- GitHub Pages builds and deploys the frontend bundle only;
- the Pages build uses base href `/Plantilla-Empresas-Plasencia/`;
- the Pages workflow currently runs with Node `24`;
- the default empty `apiBaseUrl` leaves the published frontend in demo mode rather than providing backend hosting.

## Evidence Model

This design depends on direct repository evidence, not inferred future intent.

Documentation updates for this baseline should prefer these sources, in order:

1. runtime code and route files;
2. package/workspace metadata;
3. checked-in runtime configuration files;
4. deployment workflow files.

If a fact cannot be tied to one of those files, it is out of scope for this baseline.

## File Changes

- `openspec/changes/document-existing-repository/design.md`: records the documentation organization, evidence sources, and explicit boundaries for this baseline change.

## Testing

No code or behavior changes are introduced, so no test updates are required for this design phase.

## Rollout / Maintenance

This design rolls out by existing as the repository-backed reference for the later tasks/spec sync work in the same change.

Ongoing maintenance is simple: when the repo changes, update the matching baseline section using the same evidence files listed above.

## Out of Scope

- changing code, scripts, dependencies, or workflows;
- resolving the Node `22.x` vs workflow Node `24` mismatch;
- adding new APIs, persistence, or integrations for leads;
- documenting future-state architecture, diagrams, or product plans not already implemented;
- treating GitHub Pages as backend hosting.
