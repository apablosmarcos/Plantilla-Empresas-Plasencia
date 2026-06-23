# Project context

## Repository overview

- pnpm workspace monorepo with two packages: `backend/` and `frontend/`.
- Root package is private and coordinates local development and production builds.
- Goal, per `README.md`, is a reusable company website template for Plasencia businesses.

## Stack

- Backend: Express 4 + TypeScript + Zod (`backend/`).
- Frontend: Angular 18 application with SCSS (`frontend/`).
- Runtime/tooling: Node 22.x, pnpm 11.x.

## Runtime entry points

- Backend server: `backend/src/server.ts`.
- Frontend bootstrap: `frontend/src/main.ts`.
- Shared workspace commands: `pnpm dev:backend`, `pnpm dev:frontend`, `pnpm build`.

## Current architecture notes

- Backend exposes `/api/health` and `/api/leads` routes.
- Backend environment is validated with Zod in `backend/src/config/env.ts`.
- Frontend loads site data from `frontend/src/assets/config/site.config.json` via `SiteConfigService`.
- Angular dev server uses `frontend/proxy.conf.json` when serving locally.

## Documentation scope for next phases

- Document package boundaries and request/configuration flow.
- Capture configuration surfaces before proposing behavioral changes.
- Keep OpenSpec focused on repository structure and existing behavior first.

## Known gaps

- No `openspec/` content existed before this initialization.
- No backend test script is defined yet; current executable verification is the TypeScript build.
- `.atl/skill-registry.md` is not present.
