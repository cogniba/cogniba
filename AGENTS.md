# Agent Guidelines for Cogniba

This document is for agentic coding tools operating in this repository. Keep it up to date.

## Project Overview

- Next.js App Router web app.
- TypeScript, Tailwind CSS, shadcn/ui, Radix UI, lucide-react.
- Supabase (Postgres) + Drizzle ORM/Drizzle Kit.
- Zod + React Hook Form for validation.
- MDX blog content in `src/content/blog`.

## Environment

- Node engine: >= 24 (see `package.json`).
- Server Components by default; add "use client" only when needed.
- Canonical site URL via `NEXT_PUBLIC_SITE_URL`.

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

- ESLint uses the TypeScript project service; ensure new config files are included
  in `tsconfig.json` or explicitly ignored.

### Database

```bash
npm run db:generate
npm run db:migrate
```

### Tests

- No automated test runner configured in `package.json`.
- No single-test command available; do not run `npm test`, `jest`, or `vitest`.

### Ad-hoc Checks

- Lint a single file: `npx eslint path/to/file.ts`.
- Format a file: `npx prettier --write path/to/file.ts`.
- Typecheck is whole-project only; no single-file script.

## Repository Structure

- `src/app`: Next.js routes (App Router).
- `src/actions`: server actions.
- `src/components`: shared components; UI primitives in `src/components/ui`.
- `src/context`: client state providers.
- `src/lib`: helpers and utilities.
- `src/services`: server-side data access helpers.
- `src/types`: shared type aliases.
- `src/zod`: Zod schemas.
- `src/database`: Drizzle schemas/config.
- `src/hooks`: custom hooks.
- `src/content/blog`: MDX blog posts.

## Imports and Modules

- Use `@/` alias for internal imports.
- Prefer type-only imports (`import type { ... }`).
- Keep module responsibilities focused; avoid circular dependencies.
- Use `cn()` for conditional class merging.

## Naming and Files

- Components: `PascalCase.tsx`, default export function.
- Hooks: `useX.ts` (camelCase).
- Utilities/actions: `camelCase.ts`, default export.
- Keep file names consistent with component name.

## React and Next.js

- Server Components by default; add "use client" only when required.
- Functional components: `export default function ComponentName(props)`.
- Props types: use `type` aliases (not `interface`).
- Keep layout data loading in Server Components when possible.
- Prefer `generateMetadata` for SEO on marketing pages.

## Styling

- Tailwind CSS with Prettier Tailwind plugin.
- Prefer utility classes; avoid inline styles unless needed.
- Use `cn()` for conditional className composition.

## TypeScript Strictness

- `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` enabled.
- `noPropertyAccessFromIndexSignature`: use bracket access for index signatures.
- `useUnknownInCatchVariables`, `noImplicitReturns`, `noImplicitOverride` enabled.
- Avoid `any`; use `unknown` + validation.

## ESLint Expectations

- Uses ESLint recommended + typescript-eslint strict/stylistic + Next core-web-vitals.
- Enforces `consistent-type-definitions: type`.
- Enforces `consistent-type-imports`.
- Disallows deprecated APIs.
- `no-unused-vars` with underscore ignore patterns.
- Avoid floating promises; use `await` or `void`.
- Prefer nullish coalescing over `||` for defaults.
- Avoid unnecessary optional chaining/conditions.

## Prettier

- Prettier defaults: double quotes, semicolons, trailing commas.
- Run `npm run format` or `npm run format:write` before committing.

## Environment Variables

- Use `getEnv` from `src/lib/env.ts` for required vars.
- Avoid non-null assertions on `process.env`.
- Use bracket notation for env vars with index signature.

## Server Actions

- Include "use server" directive at top.
- Return `Result<T>` from `src/lib/result.ts` instead of throwing.
- Prefer shared auth helper `getUserOrError` from `src/lib/auth/getUserOrError.ts`.
- Validate inputs with Zod schemas in `src/zod/schemas`.
- Log errors with `console.error` for debugging.

## API Routes

- Prefer server actions over API routes for app logic.
- API routes are reserved for external callbacks/webhooks (Supabase auth, Stripe).
- Parse `request.json()` as `unknown` and validate with Zod.
- Return `NextResponse` with explicit status codes.

## Database (Drizzle)

- Use `db` from `@/database`.
- Prefer chainable queries with `select/from/where`.
- Schemas live in `src/database/schemas`.

## Error Handling

- Use user-friendly error messages.
- Avoid throwing across server action boundaries.
- When optional values are valid, use explicit checks.

## Data/Utils

- Use Zod for runtime validation; infer types from schema.
- Use bracket access for index signature objects (e.g., `data["title"]`).
- Guard array index access when `noUncheckedIndexedAccess` applies.

## Concurrency and Promises

- Await async calls; use `void` for fire-and-forget.
- Use `Promise.all` for parallel calls when safe.

## Workflow Requirements (Do Not Skip)

- Do not stop after running `npm run typecheck`, `npm run lint`, and `npm run build`
  without errors or warnings.
- Always run `npm run format:write` before stopping.
- Ensure all commands finish without errors or warnings before finalizing.
- Update this file if tooling or rules change.

## Known Gaps

- No test runner configured; add instructions when tests are introduced.
- Lint uses strict type-aware rules; prefer fixing violations over disabling.
