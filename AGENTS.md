# Agent Guidelines for Cogniba

This document provides instructions and context for AI agents operating in this repository.

## Project Context
Cogniba is a **Next.js 15** web application using **TypeScript**, **Tailwind CSS**, and **Supabase** (PostgreSQL) with **Drizzle ORM**. It uses the App Router architecture.

## Tech Stack
-   **Framework:** Next.js 15 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS, `shadcn/ui`, `lucide-react`, `clsx`, `tailwind-merge`
-   **Database:** Supabase, Drizzle ORM, Drizzle Kit
-   **Validation:** Zod, React Hook Form
-   **State/Async:** Server Actions, React Context (no heavy client-side state library seen)

## Build & execution commands

### Development
-   **Start Dev Server:** `npm run dev` (uses Turbopack)
-   **Build for Production:** `npm run build`
-   **Start Production:** `npm run start`

### Linting
-   **Lint Code:** `npm run lint`

### Database
-   **Generate Migrations:** `npm run db:generate`
-   **Run Migrations:** `npm run db:migrate`

### Testing
-   **Status:** There are currently **NO** automated tests configured in `package.json`.
-   **Instruction:** Do not attempt to run `npm test`, `jest`, or `vitest` unless you have explicitly installed and configured them as part of a task.

## Code Style & Conventions

### 1. File Structure & Imports
-   **Alias:** Use the `@/` alias for all internal imports (e.g., `import { cn } from "@/lib/cn"`).
-   **Directory Structure:**
    -   `src/app`: Routes and pages (App Router).
    -   `src/components`: UI components. Place reusable logic-free components in `src/components/ui`.
    -   `src/actions`: Server Actions (backend logic).
    -   `src/lib`: Utilities and helpers.
    -   `src/database`: Drizzle schemas and config.
    -   `src/hooks`: Custom React hooks.
-   **File Naming:**
    -   Components: `PascalCase.tsx` (e.g., `Glow.tsx`)
    -   Utilities/Hooks/Actions: `camelCase.ts` (e.g., `getProfile.ts`, `useWindowSize.ts`)

### 2. Components (React/Next.js)
-   **Functional Components:** Use `export default function ComponentName({ ... }: Props)`.
-   **Props:** Define interfaces for props, usually named `ComponentProps` or just `Props` if internal.
-   **Styling:** Use Tailwind CSS. Always use the `cn()` utility for conditional class names and merging.
    ```tsx
    import { cn } from "@/lib/cn";
    // ...
    <div className={cn("base-class", className)}>...</div>
    ```
-   **"use client":** Add only when necessary (interaction, hooks, etc.). Default to Server Components.

### 3. Server Actions & Async Logic
-   **Directives:** Always include `"use server"` at the top of server action files.
-   **Return Pattern:** Actions should return a plain object containing either the result or an error message. Do not throw errors to the client; catch them.
    ```ts
    // Example Pattern
    export default async function myAction(): Promise<{ data?: MyType; error?: string }> {
      try {
        // logic...
        return { data: result };
      } catch (error) {
        console.error(error);
        return { error: "User-friendly error message" };
      }
    }
    ```

### 4. Database (Drizzle ORM)
-   **Access:** Use the exported `db` instance from `@/database`.
-   **Queries:** Use chained methods (`db.select().from()...`).
-   **Schemas:** Define schemas in `src/database/schemas`.

### 5. Type Safety
-   **Strictness:** No `any`. Use specific types.
-   **Zod:** Use Zod for runtime validation, especially for form data and API inputs.
-   **Inference:** Infer TypeScript types from Zod schemas or Drizzle schemas when possible.

### 6. Formatting
-   **Prettier:** Code should be formatted according to Prettier defaults (double quotes, semi-colons, trailing commas).
