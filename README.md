# Dringen

## Overview

Dringen is a React webapp that provides healthcare professionals with tools to manage patients, clinical records, and appointments. It follows HL7 FHIR standards via Medplum as the backend.

### Roles

| Role             | Description                                        |
| ---------------- | -------------------------------------------------- |
| `admin`          | Full system access                                 |
| `physician`      | Clinical records, appointments, patient management |
| `medical_office` | Administrative tasks, scheduling                   |
| `user`           | Read-only access                                   |

Patients are not modeled as users — they are FHIR `Patient` resources.

## Features

- **User management** — create and manage staff accounts with role-based access policies
- **Patient management** — full clinical histories, demographics, and attachment files per patient
- **Appointments** — calendar-based scheduling with React Big Calendar
- **Statistics** — charts for patient demographics (residence, gender, diagnosis)
- **FHIR-native** — all data stored as FHIR resources via Medplum

## Tech Stack

| Layer         | Library                           |
| ------------- | --------------------------------- |
| Framework     | React + TypeScript + Vite         |
| Routing       | TanStack Router (file-based)      |
| Data fetching | TanStack Query                    |
| Tables        | TanStack Table                    |
| Forms         | React Hook Form + Zod             |
| UI            | Shadcn/ui + Tailwind CSS          |
| Backend       | Medplum (self-hosted FHIR server) |
| Tests         | Vitest                            |

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A running Medplum instance (self-hosted or cloud)

### Installation

```bash
git clone git@github.com:antoniofelices/dringen.git
cd dringen
npm install
```

### Configuration

Copy the example env file and fill in your Medplum credentials:

```bash
cp .env.example .env
```

| Variable                      | Description                   |
| ----------------------------- | ----------------------------- |
| `APP_MEDPLUM_BASE_URL`        | Medplum server URL            |
| `APP_MEDPLUM_CLIENT_ID`       | OAuth2 client ID              |
| `APP_MEDPLUM_CLIENT_SECRET`   | OAuth2 client secret          |
| `APP_MEDPLUM_PROJECT_ID`      | Medplum project ID            |
| `APP_MEDPLUM_ORGANIZATION_ID` | FHIR Organization resource ID |

### Running

```bash
npm run dev        # Start dev server
npm run build      # Type-check and build for production
npm run lint       # Run ESLint
npm run test       # Run all tests
```

## Architecture

The project follows a **domain-driven folder structure** where each FHIR resource lives under `src/resources/<resource-name>/`:

```
components/   Pure UI components — props and handlers only
config/       Readonly constants (option arrays, system URLs)
domain/       Adapters (fhirTo*, *ToFhir) and domain maps
hooks/        All component logic (useQuery, useMutation, form state)
pages/        Route-level page components
schemas/      Zod schemas + validation error messages
services/     Async functions that call Medplum directly
types/        TypeScript types from Zod schemas
```

Multi-resource business flows live in `src/workflows/<workflow-name>/` using the same structure.

See `CLAUDE.md` for full architecture documentation, path aliases, and contribution conventions.

## Contributing

Please feel free to send pull requests and raise issues.
Any contributions you make will be under the MIT license.
Therefore, when you submit code changes, they are understood to be covered by the same licence.

### Code of Conduct

Studio Moare has adopted the Contributor Covenant Code of Conduct that we expect project participants to adhere to. [Please read the full text](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) so that you can understand what actions will and will not be tolerated.

## License

© 2025+, Antonio Felices. Released under the [MIT licence](./LICENSE).
