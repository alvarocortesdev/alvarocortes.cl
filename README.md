# alvarocortes.cl

Personal portfolio, technical blog, and admin CMS — built as a Bun + Turborepo monorepo.

[![Live](https://img.shields.io/badge/live-alvarocortes.cl-blue)](https://alvarocortes.cl)

## Tech Stack

| Layer | Tech |
|-------|------|
| Runtime | Bun 1.3.5 |
| Monorepo | Turborepo 2.5 |
| Framework | React 19, Vite 6 |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL + Auth) |
| Data Fetching | TanStack Query v5 |
| Animation | Framer Motion 12 |
| Rich Text | TipTap 3 |
| Drag & Drop | dnd-kit |
| Image CDN | Cloudinary |
| API | Hono (Vercel Serverless) |

## Architecture

```
alvarocortes/
├── apps/
│   ├── web/          # Public portfolio + blog (React SPA)
│   └── admin/        # CMS dashboard (React SPA, auth-gated)
├── packages/
│   ├── api/          # Serverless API routes (Hono on Vercel)
│   └── shared/       # Supabase types, shared utilities
├── turbo.json
└── package.json
```

**apps/web** — Public-facing site at `alvarocortes.cl`. Homepage with animated timeline, bento-grid portfolio, tech stack display, and a blog with sidebar filters (search, calendar, categories). Supports dark/light themes and ES/EN i18n.

**apps/admin** — CMS at `admin.alvarocortes.cl`. GitHub OAuth login. CRUD for blog posts (rich text editor, image upload, scheduling), timeline entries, tech categories, and blog categories. Drag-and-drop ordering via dnd-kit.

**packages/api** — Hono-based serverless functions deployed on Vercel. Handles Cloudinary image operations.

**packages/shared** — Auto-generated Supabase database types shared across workspaces.

## Features

### Portfolio
- Animated timeline (viewport-triggered SVG + staggered card animations)
- Bento grid project showcase
- Tech stack display with categorized icons

### Blog
- Sidebar with search, calendar date picker, category filters
- i18n-aware categories (ES/EN from database)
- Syntax-highlighted code blocks, embedded images
- Post scheduling with timezone support

### Admin CMS
- Rich text editor (TipTap) with image upload to Cloudinary
- Drag-and-drop ordering for categories, technologies, timeline entries
- Post lifecycle: draft, scheduled, published
- Preview modal before publishing
- Bilingual content editing (ES/EN tabs)

### UX
- Progressive loading with skeleton states
- Dark/light theme (system preference + toggle)
- Full i18n (Spanish/English) with `localized()` helper
- Responsive (mobile-first)

## Development

```bash
# Install dependencies
bun install

# Start all workspaces in dev mode
bun run dev

# Run linting across all packages
bun run lint

# Run tests
bun run test

# Type checking
bun run type-check

# Build all packages
bun run build
```

### Environment Variables

**apps/web** — `.env`:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

**apps/admin** — `.env`:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

**packages/api** — set in Vercel:
```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Deployment

Deployed on Vercel with automatic CI/CD from `main`.

| App | Domain |
|-----|--------|
| web | [alvarocortes.cl](https://alvarocortes.cl) |
| admin | [admin.alvarocortes.cl](https://admin.alvarocortes.cl) |
| api | Vercel Serverless Functions |

## Project Metrics

- ~9,500 LOC (TypeScript/TSX)
- 4 workspaces
- 0 lint warnings
