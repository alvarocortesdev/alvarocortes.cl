# Stack Research: Developer Portfolio with Blog + Admin CMS

**Researched:** 2026-01-16
**Domain:** Full-stack TypeScript monorepo (BHVR pattern)
**Overall Confidence:** HIGH

---

## Executive Summary

This research defines the complete technology stack for a professional developer portfolio with an admin CMS, built on the BHVR (Bun + Hono + Vite + React) monorepo pattern. The core stack is already decided and non-negotiable. This document focuses on supporting libraries, integration patterns, and configuration best practices.

**Key findings:**
1. The BHVR monorepo pattern with Turborepo provides excellent DX and type safety
2. Hono RPC enables end-to-end type safety without code generation (tRPC-like experience)
3. TanStack Router + Query create a cohesive, type-safe data layer
4. Tailwind CSS v4 with CSS variables enables the multi-theme system natively
5. Vitest 3.2 projects configuration is the modern approach for monorepo testing

**Primary recommendation:** Follow the established BHVR pattern with TanStack ecosystem for routing/data fetching, using Hono RPC for type-safe API communication.

---

## Core Stack (Non-Negotiable)

| Technology | Version | Purpose | Notes |
|------------|---------|---------|-------|
| [Bun](https://bun.sh) | Latest | Runtime + Package Manager | Workspace support, fast installs |
| [Hono](https://hono.dev) | ^4.11.4 | Backend Framework | Web Standards, RPC support |
| [Vite](https://vite.dev) | ^6.3.1 | Build Tool | First-party Tailwind v4 plugin |
| [React](https://react.dev) | ^19.0.0 | Frontend Framework | Latest with hooks |
| [Supabase](https://supabase.com) | ^2.90.1 | Database + Auth | PostgreSQL, GitHub OAuth |
| [Vitest](https://vitest.dev) | ^3.2.x | Testing | Projects config for monorepo |
| [Vercel](https://vercel.com) | - | Hosting | Monorepo deployment |

**Confidence:** HIGH - Versions verified via npm registry (January 2026)

---

## Monorepo Structure

### Recommended Directory Layout

```
alvarocortes/
├── apps/
│   ├── web/                    # Public portfolio site
│   │   ├── src/
│   │   │   ├── components/     # UI components
│   │   │   ├── routes/         # TanStack Router routes
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── lib/            # Utilities
│   │   │   ├── styles/         # Global styles + themes
│   │   │   └── main.tsx
│   │   ├── public/
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── vitest.config.ts
│   │   └── package.json
│   │
│   └── admin/                  # Admin CMS (admin.domain.com)
│       ├── src/
│       │   ├── components/
│       │   ├── routes/
│       │   ├── hooks/
│       │   ├── lib/
│       │   └── main.tsx
│       ├── vite.config.ts
│       ├── vitest.config.ts
│       └── package.json
│
├── packages/
│   ├── api/                    # Hono backend
│   │   ├── src/
│   │   │   ├── routes/         # API route handlers
│   │   │   ├── middleware/     # Auth, validation, etc.
│   │   │   ├── services/       # Business logic
│   │   │   ├── db/             # Supabase client + queries
│   │   │   └── index.ts        # App entry + type export
│   │   ├── vitest.config.ts
│   │   └── package.json
│   │
│   ├── shared/                 # Shared types + utilities
│   │   ├── src/
│   │   │   ├── types/          # Shared TypeScript types
│   │   │   ├── schemas/        # Zod schemas (shared validation)
│   │   │   ├── constants/      # Shared constants
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── ui/                     # Shared UI components (optional)
│       ├── src/
│       │   └── components/     # shadcn/ui components
│       └── package.json
│
├── package.json                # Root workspace config
├── turbo.json                  # Turborepo config
├── vitest.config.ts            # Root Vitest projects config
├── tsconfig.json               # Root TypeScript config
└── .env.example
```

**Confidence:** HIGH - Based on official BHVR template and Turborepo best practices

### Root package.json Configuration

```json
{
  "name": "alvarocortes",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "vitest",
    "lint": "turbo lint",
    "type-check": "turbo type-check"
  },
  "devDependencies": {
    "turbo": "^2.5.5",
    "typescript": "^5.7.2",
    "vitest": "^3.2.0"
  }
}
```

### turbo.json Configuration

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "type-check": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    }
  }
}
```

---

## Supporting Libraries Stack

### Routing: TanStack Router

| Package | Version | Purpose |
|---------|---------|---------|
| [@tanstack/react-router](https://tanstack.com/router) | ^1.150.0 | Type-safe routing |
| [@tanstack/react-router-devtools](https://tanstack.com/router) | ^1.150.0 | Development tools |

**Why TanStack Router over React Router v7:**
- Full TypeScript type safety for routes, params, and search queries
- First-class search params state management (essential for filtering/pagination)
- Seamless integration with TanStack Query
- File-based routing with type generation
- Catches routing errors at compile time

**Confidence:** HIGH - TanStack Router is the recommended choice for type-safe SPAs in 2025-2026

### Data Fetching: TanStack Query + Hono RPC

| Package | Version | Purpose |
|---------|---------|---------|
| [@tanstack/react-query](https://tanstack.com/query) | ^5.90.17 | Server state management |
| [@tanstack/react-query-devtools](https://tanstack.com/query) | ^5.91.2 | Development tools |
| [hono](https://hono.dev) | ^4.11.4 | RPC client (hono/client) |

**Pattern:** Hono RPC + TanStack Query

```typescript
// packages/api/src/index.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono()
  .get('/posts', async (c) => {
    const posts = await getPosts()
    return c.json(posts)
  })
  .post('/posts', zValidator('json', createPostSchema), async (c) => {
    const data = c.req.valid('json')
    const post = await createPost(data)
    return c.json(post)
  })

export type AppType = typeof app
export default app
```

```typescript
// apps/web/src/lib/api.ts
import { hc } from 'hono/client'
import type { AppType } from '@alvarocortes/api'

export const client = hc<AppType>(import.meta.env.VITE_API_URL)
```

```typescript
// apps/web/src/hooks/usePosts.ts
import { useQuery, useMutation } from '@tanstack/react-query'
import { client } from '../lib/api'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await client.posts.$get()
      return res.json()
    }
  })
}
```

**Why not tRPC:** Hono RPC provides similar type safety with less complexity. No need for tRPC adapter, works directly with Hono's native routing.

**Confidence:** HIGH - Verified with Hono documentation and community examples

### Forms: React Hook Form + Zod

| Package | Version | Purpose |
|---------|---------|---------|
| [react-hook-form](https://react-hook-form.com) | ^7.71.1 | Form state management |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | ^5.x | Validation adapters |
| [zod](https://zod.dev) | ^4.3.5 | Schema validation |

**Why this combination:**
- Zod schemas are shared between frontend validation and Hono backend
- React Hook Form minimizes re-renders (uncontrolled approach)
- Single source of truth for validation rules
- TypeScript types auto-generated from Zod schemas

**Pattern:** Shared schemas

```typescript
// packages/shared/src/schemas/post.ts
import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  published: z.boolean().default(false)
})

export type CreatePost = z.infer<typeof createPostSchema>
```

**Confidence:** HIGH - Industry standard combination, verified versions

### Internationalization: react-i18next

| Package | Version | Purpose |
|---------|---------|---------|
| [i18next](https://www.i18next.com) | ^25.7.4 | Core i18n framework |
| [react-i18next](https://react.i18next.com) | ^16.2.4 | React bindings |
| [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) | ^8.x | Auto language detection |
| [i18next-http-backend](https://github.com/i18next/i18next-http-backend) | ^3.x | Async translation loading |

**Why react-i18next over LinguiJS:**
- Larger ecosystem and plugin availability
- Better documentation and community support
- More flexible for runtime language switching
- Async loading of translation files (important for bundle size)

**Trade-off:** Larger bundle size (~22 kB vs ~10 kB for Lingui), but ecosystem benefits outweigh this for a portfolio project.

**Confidence:** HIGH - Most widely adopted React i18n solution

### Animations: Motion (Framer Motion)

| Package | Version | Purpose |
|---------|---------|---------|
| [framer-motion](https://motion.dev) | ^12.26.2 | Animation library |

**Why Motion/Framer Motion:**
- Declarative API fits React paradigm
- Built-in support for layout animations (essential for Bento Grid)
- Scroll-linked animations for progressive loading effects
- LazyMotion for bundle size optimization (~30 kB deferred)
- Gesture support (drag, hover, tap)

**Key features needed:**
- `AnimatePresence` for enter/exit transitions
- `layoutId` for shared element transitions between routes
- `useScroll` + `useTransform` for scroll-linked effects
- `LazyMotion` + `domAnimation` for code splitting

**Confidence:** HIGH - Industry standard for React animations

### Styling: Tailwind CSS v4

| Package | Version | Purpose |
|---------|---------|---------|
| [tailwindcss](https://tailwindcss.com) | ^4.1.18 | CSS framework |
| [@tailwindcss/vite](https://tailwindcss.com/docs/vite) | ^4.x | Vite integration |

**Multi-Theme Architecture:**

Tailwind v4's CSS-first configuration with `@theme` directive enables the required 5-theme system:

```css
/* apps/web/src/styles/themes.css */
@import "tailwindcss";

/* Base theme variables */
@theme {
  --color-primary: hsl(220, 90%, 56%);
  --color-secondary: hsl(280, 70%, 50%);
  --color-background: hsl(0, 0%, 100%);
  --color-foreground: hsl(0, 0%, 5%);
  --color-muted: hsl(0, 0%, 96%);
  --color-accent: hsl(220, 90%, 96%);
}

/* Dark mode overrides */
.dark {
  --color-background: hsl(0, 0%, 5%);
  --color-foreground: hsl(0, 0%, 98%);
  --color-muted: hsl(0, 0%, 15%);
  --color-accent: hsl(220, 50%, 15%);
}

/* Theme: Ocean */
[data-theme="ocean"] {
  --color-primary: hsl(200, 80%, 50%);
  --color-secondary: hsl(180, 70%, 45%);
}

/* Theme: Forest */
[data-theme="forest"] {
  --color-primary: hsl(140, 60%, 40%);
  --color-secondary: hsl(80, 50%, 45%);
}

/* Theme: Sunset */
[data-theme="sunset"] {
  --color-primary: hsl(30, 90%, 55%);
  --color-secondary: hsl(350, 80%, 55%);
}

/* Theme: Lavender */
[data-theme="lavender"] {
  --color-primary: hsl(270, 60%, 60%);
  --color-secondary: hsl(300, 50%, 55%);
}

/* Theme: Monochrome */
[data-theme="monochrome"] {
  --color-primary: hsl(0, 0%, 30%);
  --color-secondary: hsl(0, 0%, 50%);
}
```

**Confidence:** HIGH - Tailwind v4 natively supports this pattern

### UI Components: shadcn/ui

| Package | Version | Purpose |
|---------|---------|---------|
| [shadcn/ui](https://ui.shadcn.com) | Latest CLI | Component primitives |
| [@radix-ui/react-*](https://radix-ui.com) | Various | Accessible primitives |
| [class-variance-authority](https://cva.style) | ^0.7.x | Variant management |
| [clsx](https://github.com/lukeed/clsx) | ^2.x | Class merging |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | ^3.x | Tailwind class deduplication |

**Why shadcn/ui:**
- Copy-paste components (no external dependency lock-in)
- Built on Radix UI (accessibility-first)
- Tailwind CSS native (works with v4)
- Full customization control
- Active ecosystem with 1100+ blocks available

**Installation:**
```bash
npx shadcn@latest init
```

**Confidence:** HIGH - Industry standard for React + Tailwind projects

### Email: Resend

| Package | Version | Purpose |
|---------|---------|---------|
| [resend](https://resend.com) | ^6.7.0 | Email API |
| [@react-email/components](https://react.email) | ^0.x | Email templates |

**Why Resend over SendGrid:**
- Native React Email integration (same team)
- Simpler API, better DX
- Free tier: 3,000 emails/month (sufficient for portfolio contact form)
- Regional delivery for lower latency
- Idempotency keys support

**Confidence:** HIGH - Recommended for React projects, verified version

---

## Supabase Integration Patterns

### Client Setup

```typescript
// packages/api/src/db/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

export function createSupabaseClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )
}

// For server-side with service role (admin operations)
export function createSupabaseAdmin() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
```

### Auth Middleware for Hono

```typescript
// packages/api/src/middleware/auth.ts
import { createMiddleware } from 'hono/factory'
import { createClient } from '@supabase/supabase-js'

type Env = {
  Variables: {
    user: User | null
    supabase: SupabaseClient
  }
}

export const authMiddleware = createMiddleware<Env>(async (c, next) => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: c.req.header('Authorization') ?? ''
        }
      }
    }
  )

  // IMPORTANT: Use getUser(), not getSession() for security
  const { data: { user }, error } = await supabase.auth.getUser()

  c.set('supabase', supabase)
  c.set('user', user)

  await next()
})

// Protected route middleware
export const requireAuth = createMiddleware<Env>(async (c, next) => {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  await next()
})
```

### GitHub OAuth Setup

For admin panel authentication:

1. Configure GitHub OAuth in Supabase Dashboard
2. Set redirect URL: `https://admin.yourdomain.com/auth/callback`
3. Use Supabase Auth UI or custom flow

```typescript
// apps/admin/src/lib/auth.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export async function signInWithGitHub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  if (error) throw error
}
```

**Confidence:** HIGH - Verified with official Supabase documentation

---

## Vite + Vitest Configuration

### Vite Config (apps/web)

```typescript
// apps/web/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    TanStackRouterVite(),
    react(),
    tailwindcss()
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

### Vitest Root Config (Monorepo)

```typescript
// vitest.config.ts (root)
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // Vitest 3.2+ uses 'projects' instead of deprecated 'workspace'
    projects: [
      'apps/*/vitest.config.ts',
      'packages/*/vitest.config.ts'
    ]
  }
})
```

### Vitest Package Config (Example: apps/web)

```typescript
// apps/web/vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    name: 'web',
    environment: 'happy-dom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    globals: true,
    setupFiles: ['./src/test/setup.ts']
  }
})
```

### Vitest Package Config (Example: packages/api)

```typescript
// packages/api/vitest.config.ts
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: 'api',
    include: ['src/**/*.{test,spec}.ts'],
    globals: true
  }
})
```

**Confidence:** HIGH - Based on Vitest 3.2 documentation

---

## Vercel Deployment Configuration

### Monorepo with Subdomain Setup

**Strategy:** Deploy as separate Vercel projects from same repo

1. **Project 1: web** (yourdomain.com)
   - Root Directory: `apps/web`
   - Build Command: `cd ../.. && bun run build --filter=web`
   - Output Directory: `dist`

2. **Project 2: admin** (admin.yourdomain.com)
   - Root Directory: `apps/admin`
   - Build Command: `cd ../.. && bun run build --filter=admin`
   - Output Directory: `dist`

3. **Project 3: api** (api.yourdomain.com or yourdomain.com/api)
   - Root Directory: `packages/api`
   - Build Command: `cd ../.. && bun run build --filter=api`
   - Framework Preset: Other (Serverless Functions)

### vercel.json (apps/web)

```json
{
  "buildCommand": "cd ../.. && bun run build --filter=web",
  "outputDirectory": "dist",
  "framework": "vite",
  "ignoreCommand": "git diff HEAD^ HEAD --quiet ./apps/web ./packages/shared"
}
```

### vercel.json (apps/admin)

```json
{
  "buildCommand": "cd ../.. && bun run build --filter=admin",
  "outputDirectory": "dist",
  "framework": "vite",
  "ignoreCommand": "git diff HEAD^ HEAD --quiet ./apps/admin ./packages/shared"
}
```

### Environment Variables

Set in Vercel Dashboard for each project:

```
# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx (API only, not VITE_ prefixed)

# API
VITE_API_URL=https://api.yourdomain.com

# Resend
RESEND_API_KEY=re_xxx
```

**Confidence:** HIGH - Based on Vercel monorepo documentation

---

## Complete Dependencies List

### apps/web/package.json

```json
{
  "name": "@alvarocortes/web",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@tanstack/react-router": "^1.150.0",
    "@tanstack/react-query": "^5.90.17",
    "hono": "^4.11.4",
    "@supabase/supabase-js": "^2.90.1",
    "react-hook-form": "^7.71.1",
    "@hookform/resolvers": "^5.0.0",
    "zod": "^4.3.5",
    "framer-motion": "^12.26.2",
    "i18next": "^25.7.4",
    "react-i18next": "^16.2.4",
    "i18next-browser-languagedetector": "^8.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^3.0.0",
    "@alvarocortes/shared": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.4.0",
    "@tailwindcss/vite": "^4.1.18",
    "tailwindcss": "^4.1.18",
    "vite": "^6.3.1",
    "vite-tsconfig-paths": "^5.0.0",
    "@tanstack/router-plugin": "^1.150.0",
    "@tanstack/react-router-devtools": "^1.150.0",
    "@tanstack/react-query-devtools": "^5.91.2",
    "vitest": "^3.2.0",
    "@testing-library/react": "^16.0.0",
    "happy-dom": "^17.0.0",
    "typescript": "^5.7.2"
  }
}
```

### apps/admin/package.json

```json
{
  "name": "@alvarocortes/admin",
  "private": true,
  "type": "module",
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@tanstack/react-router": "^1.150.0",
    "@tanstack/react-query": "^5.90.17",
    "hono": "^4.11.4",
    "@supabase/supabase-js": "^2.90.1",
    "react-hook-form": "^7.71.1",
    "@hookform/resolvers": "^5.0.0",
    "zod": "^4.3.5",
    "framer-motion": "^12.26.2",
    "i18next": "^25.7.4",
    "react-i18next": "^16.2.4",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^3.0.0",
    "@alvarocortes/shared": "workspace:*"
  }
}
```

### packages/api/package.json

```json
{
  "name": "@alvarocortes/api",
  "private": true,
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "dev": "bun run --hot src/index.ts",
    "build": "bun build src/index.ts --outdir dist --target bun",
    "test": "vitest"
  },
  "dependencies": {
    "hono": "^4.11.4",
    "@hono/zod-validator": "^0.5.0",
    "@supabase/supabase-js": "^2.90.1",
    "@supabase/ssr": "^0.6.0",
    "zod": "^4.3.5",
    "resend": "^6.7.0",
    "@alvarocortes/shared": "workspace:*"
  },
  "devDependencies": {
    "@types/bun": "latest",
    "vitest": "^3.2.0",
    "typescript": "^5.7.2"
  }
}
```

### packages/shared/package.json

```json
{
  "name": "@alvarocortes/shared",
  "private": true,
  "type": "module",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "dependencies": {
    "zod": "^4.3.5"
  },
  "devDependencies": {
    "typescript": "^5.7.2"
  }
}
```

---

## What NOT to Use

| Avoid | Use Instead | Why |
|-------|-------------|-----|
| tRPC | Hono RPC | Simpler, no adapter needed, same type safety |
| React Router v7 | TanStack Router | Better TypeScript support, search params |
| styled-components | Tailwind CSS v4 | CSS variables for theming, better performance |
| CSS Modules | Tailwind CSS v4 | Design system consistency |
| Formik | React Hook Form | Better performance, smaller bundle |
| Yup | Zod v4 | Better TypeScript inference, newer |
| SendGrid | Resend | Better React integration, simpler API |
| npm/yarn | Bun | Faster, workspace support built-in |
| Jest | Vitest | Vite-native, faster, same API |
| Webpack | Vite | Faster dev server, HMR |
| react-intl | react-i18next | Larger ecosystem, better docs |
| GSAP | Framer Motion | React-native approach, simpler API |
| pnpm workspaces | Bun workspaces | Already using Bun as runtime |

---

## Sources

### Primary (HIGH confidence)
- [Hono Documentation](https://hono.dev/docs/) - RPC, middleware patterns
- [Supabase Hono Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/hono) - Integration patterns
- [TanStack Router Docs](https://tanstack.com/router/latest) - Routing patterns
- [TanStack Query Docs](https://tanstack.com/query/latest) - Data fetching
- [Vitest Projects Guide](https://vitest.dev/guide/projects) - Monorepo configuration
- [Tailwind CSS v4 Blog](https://tailwindcss.com/blog/tailwindcss-v4) - Theme variables
- [Vercel Monorepos](https://vercel.com/docs/monorepos) - Deployment patterns
- [BHVR Template](https://github.com/stevedylandev/bhvr) - Monorepo structure

### Secondary (MEDIUM confidence)
- [npm registry](https://www.npmjs.com) - Package version verification
- [Hono Stacks](https://hono.dev/docs/concepts/stacks) - RPC + TanStack Query integration
- [React Hook Form + Zod](https://react-hook-form.com/docs/useform) - Form validation

### Tertiary (LOW confidence)
- Community blog posts and tutorials (used for patterns, verified with official docs)

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Core Stack Versions | HIGH | Verified via npm registry January 2026 |
| Monorepo Structure | HIGH | Based on official BHVR template |
| Hono RPC Pattern | HIGH | Official Hono documentation |
| Supabase Integration | HIGH | Official Supabase docs + @supabase/ssr |
| Vitest Configuration | HIGH | Vitest 3.2 projects documentation |
| Tailwind v4 Theming | HIGH | Official Tailwind v4 @theme directive |
| Vercel Deployment | HIGH | Official Vercel monorepo docs |
| Supporting Libraries | HIGH | All versions verified, industry standards |

---

## Research Date & Validity

**Researched:** 2026-01-16
**Valid until:** 2026-02-16 (30 days - stack is stable)

**Note:** Check for Hono v5 release and Vitest breaking changes before starting development if beyond validity date.
