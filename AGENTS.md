# Agent Guidelines for Cogniba

This document is for agentic coding tools operating in this repository.
Keep it updated when tooling or conventions change.

## Project Overview

- Next.js App Router web app.
- TypeScript, Tailwind CSS, shadcn/ui, Radix UI, lucide-react.
- Supabase (Postgres) + Drizzle ORM/Drizzle Kit.
- Zod + React Hook Form for validation.

## Environment

- Node engine: >= 24 (see package.json).
- Server Components by default; add "use client" only when needed.

## Commands

### Development

```bash
npm run dev
npm run build
npm run start
```

### Lint, Typecheck, Format

```bash
npm run lint
npm run typecheck
npm run format
npm run format:write
```

Notes:

- ESLint uses TypeScript project service; ensure new config files are either
  included in tsconfig or excluded via eslint ignores when needed.

### Database

```bash
npm run db:generate
npm run db:migrate
```

### Tests

- No automated test runner configured in package.json.
- No single-test command available; do not run npm test/jest/vitest unless added.

## Cursor/Copilot Instructions

- No .cursor/rules, .cursorrules, or .github/copilot-instructions.md found.
- If added later, mirror those instructions here.

## Repository Structure

- src/app: Next.js routes (App Router).
- src/actions: server actions.
- src/components: shared components; UI primitives in src/components/ui.
- src/context: client state providers.
- src/lib: helpers and utilities.
- src/services: server-side data access helpers.
- src/types: shared type aliases.
- src/zod: Zod schemas.
- src/database: Drizzle schemas/config.
- src/hooks: custom hooks.

## Imports and Modules

- Use @/ alias for internal imports.
- Prefer type-only imports (eslint consistent-type-imports).
- Avoid circular imports; keep modules focused.
- Use cn() for conditional class merging.

## Naming and Files

- Components: PascalCase.tsx, default export function.
- Hooks: useX.ts (camelCase).
- Utilities/actions: camelCase.ts, default export.
- Keep file names consistent with component name.

## React and Next.js

- Server Components by default; add "use client" only when needed.
- Functional components: export default function ComponentName(props).
- Props types: use type alias (not interface) per eslint rule.
- Keep layout data loading in server components when possible.

## Styling

- Tailwind CSS with Prettier Tailwind plugin.
- Use cn() to combine className with conditional classes.
- Prefer utility classes; avoid inline styles unless needed.

## TypeScript Strictness

- strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes.
- noPropertyAccessFromIndexSignature: use bracket access for index signatures.
- useUnknownInCatchVariables, noImplicitReturns, noImplicitOverride.
- Avoid any; use unknown + validation.

## ESLint Expectations

- Uses eslint recommended + typescript-eslint strict/stylistic + next core-web-vitals.
- Enforces consistent-type-definitions: type.
- Enforces consistent-type-imports.
- Disallows deprecated APIs.
- no-unused-vars with underscore ignore patterns.
- Avoid floating promises; use await or void.
- Prefer nullish coalescing over || for defaults.
- Avoid unnecessary optional chaining and conditions.

## Prettier

- Uses Prettier defaults (double quotes, semicolons, trailing commas).
- Run npm run format or format:write before committing.

## Environment Variables

- Use getEnv from src/lib/env.ts for required vars.
- Avoid non-null assertions on process.env.
- Use bracket notation for env vars with index signature.

## Server Actions

- Include "use server" directive at top.
- Return Result<T> from src/lib/result.ts instead of throwing.
- Prefer shared auth helper getUserOrError from src/lib/auth/getUserOrError.ts.
- Validate inputs with Zod schemas in src/zod/schemas.
- Log errors with console.error for debugging.

## API Routes

- Prefer server actions over API routes for app logic.
- API routes are reserved for external callbacks/webhooks (Supabase auth, Stripe).
- For routes that remain, parse request.json() as unknown and validate with Zod.
- Return NextResponse with explicit status codes.

## Database (Drizzle)

- Use db from @/database.
- Prefer chainable queries with select/from/where.
- Schemas live in src/database/schemas.

## Error Handling

- Use user-friendly error messages.
- Avoid throwing across server action boundary.
- When optional values are valid, use explicit checks.

## Data/Utils

- Use Zod for runtime validation; infer types from schema.
- Use bracket access for index signature objects (e.g., data["title"]).
- Guard array index access when noUncheckedIndexedAccess applies.

## Concurrency and Promises

- Await async calls; use void for fire-and-forget.
- Use Promise.all for parallel calls when safe.

## Ad-hoc Checks

- Lint a single file: npx eslint path/to/file.ts
- Format a file: npx prettier --write path/to/file.ts
- Typecheck is whole-project only; no single-file script.

## Suggested Workflow

- Make changes, run npm run typecheck.
- Run npm run lint and npm run format before committing.
- Update this AGENTS.md if tooling or rules change.

## Known Gaps

- No test runner configured; add instructions when tests are introduced.
- Lint uses strict type-aware rules; prefer fixing violations over disabling.
