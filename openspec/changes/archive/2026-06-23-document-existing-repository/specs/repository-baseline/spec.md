# Repository Baseline Specification

## Purpose

Document the current repository structure, configuration flow, backend API surface, and runtime assumptions without changing product behavior.

## Requirements

### Requirement: Workspace Structure Is Documented

The repository MUST be documented as a pnpm workspace with a root package that orchestrates two packages: `backend` for the Express API and `frontend` for the Angular application.

#### Scenario: Root workspace delegates package commands

- GIVEN the repository root metadata
- WHEN a reader inspects the documented workspace structure
- THEN the root package is identified as the shared entry point for `dev:backend`, `dev:frontend`, `build`, and `build:pages`
- AND the workspace package list is limited to `backend` and `frontend`

#### Scenario: Package responsibilities stay distinct

- GIVEN the documented package boundaries
- WHEN a reader looks up package responsibilities
- THEN `backend` is described as the Node/Express API package
- AND `frontend` is described as the Angular application package

### Requirement: Configuration Flow Is Documented

The repository MUST document the current configuration flow from workspace scripts to runtime settings, including backend environment parsing, frontend site configuration loading, and local development proxy behavior.

#### Scenario: Backend runtime configuration is described

- GIVEN the backend runtime configuration
- WHEN a reader checks documented backend inputs
- THEN `PORT` is documented as the API listen port with default `3000`
- AND `FRONTEND_ORIGIN` is documented as the allowed browser origin with default `http://localhost:4200`

#### Scenario: Frontend runtime content is described

- GIVEN the frontend runtime configuration
- WHEN a reader checks documented frontend inputs
- THEN `frontend/src/assets/config/site.config.json` is documented as the source of company content and optional `apiBaseUrl`
- AND the frontend is documented as loading that file at runtime through `SiteConfigService`

#### Scenario: Local development integration is described

- GIVEN local development behavior
- WHEN a reader checks how frontend and backend interact locally
- THEN Angular serve mode is documented as proxying `/api` to `http://localhost:3000`
- AND lead submission is documented as calling the backend only when `apiBaseUrl` is configured

### Requirement: Current Backend API Surface Is Documented

The repository MUST document the current backend API surface as `GET /api/health` and `POST /api/leads`, including their present request validation and response behavior.

#### Scenario: Health endpoint is described

- GIVEN the backend route documentation
- WHEN a reader checks the health endpoint
- THEN `GET /api/health` is documented as returning JSON with `status: "ok"`
- AND the response is documented as including the service name `Plantilla Empresas Plasencia API`

#### Scenario: Leads endpoint validation is described

- GIVEN the backend route documentation
- WHEN a reader checks the leads endpoint
- THEN `POST /api/leads` is documented as accepting `name`, `email`, optional `phone`, and `message`
- AND invalid payloads are documented as returning HTTP 400 with validation errors
- AND valid payloads are documented as returning HTTP 201 with a success message

#### Scenario: Leads endpoint implementation scope is described

- GIVEN the current leads flow
- WHEN a reader checks what happens after validation succeeds
- THEN the route is documented as logging the lead payload
- AND the route is documented as not persisting or forwarding the lead to another system

### Requirement: Runtime And Deployment Assumptions Are Documented

The repository MUST document the current runtime and deployment assumptions already encoded in project metadata, local defaults, and workflow files.

#### Scenario: Local runtime expectations are described

- GIVEN the repository runtime metadata
- WHEN a reader checks documented local prerequisites
- THEN Node `22.x` and pnpm `11.x` are documented as the repository expectations
- AND the default local URLs are documented as `http://localhost:3000` for the API and `http://localhost:4200` for the frontend

#### Scenario: GitHub Pages deployment scope is described

- GIVEN the deployment workflow documentation
- WHEN a reader checks the current hosted path
- THEN GitHub Pages is documented as building and deploying the frontend bundle only
- AND the Pages build is documented as using the repository base href `/Plantilla-Empresas-Plasencia/`
- AND the documentation records that the workflow currently runs with Node `24`

#### Scenario: Demo-mode deployment limitation is described

- GIVEN the default frontend site configuration
- WHEN a reader checks runtime behavior without backend deployment
- THEN the documentation states that an empty `apiBaseUrl` keeps the form in demo mode without backend calls
- AND the documentation does not treat GitHub Pages as a backend hosting path
