# keynesfariz.github.io

## Commands

- **Development**: `bun run dev`
- **Build**: `bun run build`
- **Start**: `bun run start`
- **Lint**: `bun run lint`
- **Format**: `bun run format`
- **Generate Writing**: `bun run writing`

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript, React 19
- **Styling**: Tailwind CSS v4, shadcn/ui, clsx, tailwind-merge
- **Package Manager**: Bun
- **Content**: Content Collections (@content-collections/core, @content-collections/markdown, @content-collections/next)

## Project Structure

- `app/`: Next.js App Router pages, layouts, and API routes.
- `components/`: React components, including base UI and shadcn/ui components.
- `components/layout/`: Shared layout structures (e.g., `main-layout.tsx`).
- `components/providers/`: Dedicated folder for context providers (e.g., `theme-provider.tsx`).
- `lib/`: Utility functions and shared logic.
- `public/`: Static assets.
- `scripts/`: Development and utility scripts (e.g., `writing-generator.ts`).
- `types/`: TypeScript type definitions.

## Code Style & Conventions

- Prefer **TypeScript** for all new code. Use strict typing.
- Use **Next.js App Router** patterns (`page.tsx`, `layout.tsx`, React Server Components by default).
- For styling, use **Tailwind CSS**. Manage class combinations with `clsx` and `tailwind-merge`.
- Use **Bun** (`bun install`, `bun run`, `bunx`) for package management and running scripts. Do not use `npm`, `yarn`, or `pnpm`.
- Adhere to the existing **ESLint** and **Prettier** configurations.
- Use `lucide-react` for icons.
- Format dates with `date-fns`.
- **Component Naming**: All component filenames must use `kebab-case`.
- **Component Colocation**: Move related or single-use components to their respective `app/{the_page}/` folders (e.g., `app/resume/skill.tsx`) instead of dumping them all in the global `components/` directory.
- **Layout Enforcement**: Wrap page contents manually with `<MainLayout>` (from `components/layout/main-layout.tsx`) to enforce standard max-width spacing, rather than placing `<main>` in the root `layout.tsx`.
- **Server Utilities**: Suffix server-only modules with `.server.ts` (e.g., `image.server.ts`, `github.server.ts`). This is critical for functions using Node APIs (`node:fs`, `node:path`) to prevent client-side build collisions.
- **Lib Structure**: Keep `lib/utils.ts` exclusive to the `cn` function (used by shadcn). Group all other utility functions into small, domain-specific files (e.g., `seo.ts`, `string.ts`, `resume.ts`).
