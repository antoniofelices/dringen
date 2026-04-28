# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Context

This project is a React webapp backed by a self-hosted Medplum FHIR server.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Type-check and build for production
npm run lint       # Run ESLint
npm run test       # Run all tests (Vitest)
npx vitest run src/path/to/file.test.ts  # Run a single test file
```

## Environment

Copy `.env.example` to `.env`. All env vars are prefixed with `APP_` (enforced by Vite). The Medplum config is centralised in `src/shared/fhir/config.ts` and re-exported as `MEDPLUM_CONFIG`. Key variables:

```
APP_MEDPLUM_BASE_URL
APP_MEDPLUM_CLIENT_ID
APP_MEDPLUM_CLIENT_SECRET
APP_MEDPLUM_PROJECT_ID
APP_MEDPLUM_ORGANIZATION_ID
```

## Architecture

### Domain-driven folder structure

Every FHIR resource lives under `src/resources/<resource-name>/` with these sub-folders:

```
components/     Pure UI components — no logic, only props/handlers received from a hook
config/         Readonly constants (options arrays, system URLs)
domain/         Adapters (fhirTo*, *ToFhir) and domain maps (e.g. ROLE_TO_SNOMED)
hooks/          React hooks — all component logic lives here
pages/          Route-level page components
schemas/        Zod schemas + co-located content files for validation error messages
services/       Async functions that call medplum directly; no React
types/          TypeScript types inferred from Zod schemas or hand-written
```

Non-FHIR Medplum concerns (AccessPolicy, ProjectMembership) live under `src/medplum/<concern>/` and are imported via the `@resourcesmedplum` alias.

Multi-resource business flows (e.g. a clinical encounter combining observations, diagnoses, and treatments) go in `src/workflows/<workflow-name>/` using the same sub-folder conventions.

### Path aliases (tsconfig + vite.config)

| Alias                 | Resolves to       |
| --------------------- | ----------------- |
| `@resources/*`        | `src/resources/*` |
| `@resourcesmedplum/*` | `src/medplum/*`   |
| `@shared/*`           | `src/shared/*`    |
| `@auth/*`             | `src/auth/*`      |
| `@config/*`           | `src/config/*`    |
| `@workflows/*`        | `src/workflows/*` |
| `@layouts/*`          | `src/layouts/*`   |
| `@pages/*`            | `src/pages/*`     |

### Routing and auth

TanStack Router with file-based routing (`src/routes/`). Two layout groups:

- `_authn` — unauthenticated routes (login, reset-password)
- `_authz` — protected routes; the layout guard in `src/routes/_authz.tsx` checks `medplum.getActiveLogin()` and redirects to `/` if no active session

The `AuthProvider` wraps all protected routes and exposes `{ profile, role, project, loading, isLoggedIn }` via context. The `role` is derived from the Medplum access policy name via `auth/me`.

### Medplum client

A singleton `medplum` (`MedplumClient`) is created in `src/shared/fhir/medplum.ts`. The `authenticateMedplum()` helper performs client-credential login (using `APP_MEDPLUM_CLIENT_SECRET`) and deduplicates concurrent calls with a shared promise. Services call `authenticateMedplum()` at the top of every async function.

`medplum.getProject()` returns the active project from the session token — do not construct a project ID manually.

### Form pattern

Each form follows this four-file pattern:

1. `schemas/<form>.schema.ts` — Zod schema; imports error strings from a sibling `<form>.content.ts`
2. `hooks/use<Form>.ts` — all form logic (`useForm`, `useFieldArray`, queries, `onSubmit`); imports the schema, services, and domain maps
3. `components/<Form>.tsx` — pure UI; calls the hook and renders fields
4. `components/<Form>.content.ts` — label and toast strings used by both the component and the hook

### Data layer pattern

- **Service** — calls `medplum.searchResources` / `readResource` / `createResource` / `updateResource`; throws on error; returns raw FHIR types
- **Adapter** — pure functions in `domain/` that convert between FHIR types and app domain types (`fhirTo*` / `*ToFhir`)
- **Hook** — wraps a service in `useQuery` / `useMutation`; applies adapter via `select`; exposes domain types to the UI

### FHIR coding constants

System URLs and terminology constants (`LOINC_SYSTEM`, `SNOMED_SYSTEM`, `ICD10_SYSTEM`, `HL7_TERMINOLOGY_BASE_URL`) are defined in `src/shared/fhir/config.ts`. Resource-level options (roles, genders, days-of-week) live in the resource's own `config/config.ts` as `as const` arrays so they can be passed directly to `z.enum()`.

### Role → policy mapping

`src/medplum/access-policy/domain/accessPolicy.domain.ts` maps `PractitionerRoleCode` → Medplum `AccessPolicy` name. `src/resources/practitioner/domain/practitioner.domain.ts` maps the same codes to SNOMED codes. Both must stay in sync when new roles are added.

### Logging

`src/shared/utils/Logger.ts` exports a singleton `logger`. Inside hooks, use `useLogger(componentName)` which returns `{ logError, logSuccess }` pre-bound to the component name.

## Constraints

- Do not modify any existing file unless strictly necessary.
- Reuse existing types and domain aggregates — do not duplicate domain knowledge.
- Reuse hooks from other resources if they already exist.
- Follow the exact same file naming conventions, folder structure, and code style as the existing codebase.
- Custom hooks act as controlled contamination points between resources. Do not call a hook from resource 1 inside a component from resource 2. Create a custom hook in the resources-2/hooks folder and then import it to the component.
