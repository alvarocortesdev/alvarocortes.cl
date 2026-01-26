# Phase 13: Admin Foundation - Research

**Researched:** 2026-01-26
**Domain:** Monorepo deployment, database schema design, Supabase CMS
**Confidence:** HIGH

## Summary

This phase establishes the foundation for the admin panel: a separate Vite+React app deployed to a subdomain, with Supabase database tables to replace hardcoded data. The research covers three interconnected areas: (1) Vercel deployment of multiple apps from the same monorepo to different subdomains, (2) Supabase schema design for a single-admin CMS with proper Row Level Security, and (3) Turborepo workspace configuration for adding a new app.

The established pattern is clear: create a second Vercel project linked to the same repository with a different root directory, use Supabase migrations for schema management with RLS policies that check against the admin's auth.uid(), and add the new workspace following the existing `@alvarocortes/` naming convention.

**Primary recommendation:** Deploy admin as separate Vercel project with root directory `apps/admin`, use Supabase CLI migrations with declarative SQL files, implement RLS with hardcoded admin UUID check.

## Standard Stack

The established libraries/tools for this domain:

### Core (Already in Project)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vite | 6.3.1 | Build tool | Already in web app, consistent |
| React | 19.0.0 | UI framework | Already in web app, consistent |
| Tailwind CSS | 4.1.18 | Styling | Already in web app, consistent |
| React Router | 7.12.0 | SPA navigation | Already in web app, consistent |
| @supabase/supabase-js | 2.90.1 | Database client | Already in api package |

### New for Admin
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Supabase CLI | latest | Migrations, type generation | Official tool for schema management |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| zod | 3.24.0 | Validation | Already in api, use for form validation |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Supabase migrations | Prisma | Prisma adds complexity; Supabase CLI is native to stack |
| Hardcoded admin UUID | Admin table lookup | Overkill for single-user; adds query per request |
| Separate Vercel project | Path-based rewrites | Subdomains are cleaner for admin separation |

**Installation:**
```bash
# Global Supabase CLI (if not installed)
npm install -g supabase

# No new packages needed in apps/admin - copy from apps/web
```

## Architecture Patterns

### Recommended Project Structure
```
alvarocortes/
├── apps/
│   ├── web/              # Existing public site
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── admin/            # NEW: Admin panel
│       ├── src/
│       │   ├── main.tsx
│       │   ├── App.tsx
│       │   └── styles/
│       │       └── main.css
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       └── vercel.json   # Per-app Vercel config
├── packages/
│   ├── api/              # Existing API package
│   └── shared/           # Existing shared types
├── supabase/             # NEW: Supabase config at root
│   ├── config.toml
│   ├── migrations/
│   │   └── YYYYMMDDHHMMSS_create_cms_tables.sql
│   └── seed.sql
├── package.json
├── turbo.json
└── vercel.json           # Root Vercel config (for web)
```

### Pattern 1: Separate Vercel Projects for Monorepo Apps
**What:** Each app in the monorepo is a separate Vercel project, linked to the same Git repository with different root directories.
**When to use:** When apps need different domains/subdomains.
**Configuration:**

Root `vercel.json` (already exists, for web):
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "bun run build --filter=@alvarocortes/web",
  "outputDirectory": "apps/web/dist",
  "installCommand": "bun install"
}
```

Admin `apps/admin/vercel.json`:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "cd ../.. && bun run build --filter=@alvarocortes/admin",
  "outputDirectory": "dist",
  "installCommand": "cd ../.. && bun install"
}
```

### Pattern 2: Supabase Migrations for Schema Changes
**What:** All schema changes as versioned SQL files in `supabase/migrations/`.
**When to use:** Always - never modify schema via Dashboard in production.
**Workflow:**
```bash
# Create new migration
supabase migration new create_cms_tables

# Apply locally
supabase db reset  # Resets and applies all migrations

# Deploy to production
supabase db push
```

### Pattern 3: RLS with Hardcoded Admin UUID
**What:** Row Level Security policies that check `auth.uid()` against a known admin UUID.
**When to use:** Single-admin systems where admin identity is fixed.
**Example:**
```sql
-- Enable RLS on table
alter table posts enable row level security;

-- Public read for published posts
create policy "Public can read published posts"
on posts for select
using (status = 'published');

-- Admin full access (hardcode YOUR Supabase auth.uid)
create policy "Admin has full access"
on posts for all
using ((select auth.uid()) = 'YOUR-ADMIN-UUID-HERE');
```

### Anti-Patterns to Avoid
- **Modifying schema via Supabase Dashboard:** Changes won't be version controlled. Always use migrations.
- **Service role key in frontend:** Never expose. Only use in server-side code.
- **RLS based on user_metadata:** Can be modified by users. Use auth.uid() only.
- **Shared vercel.json for multiple apps:** Each app needs its own project with specific root directory.
- **Nested packages in Turborepo:** Not supported. Keep flat structure in apps/ and packages/.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Database migrations | Manual SQL files | Supabase CLI migrations | Versioned, timestamped, rollback support |
| Type safety | Manual interfaces | `supabase gen types typescript` | Auto-generated from schema, always in sync |
| Auth session handling | Custom JWT parsing | `supabase.auth.getSession()` | Handles refresh, expiry, all edge cases |
| RLS policies | Middleware auth checks | Postgres RLS | Enforced at database level, can't be bypassed |
| UUID generation | Custom functions | `gen_random_uuid()` | Postgres built-in, cryptographically secure |

**Key insight:** Supabase provides a complete toolchain. Using `supabase gen types` and RLS policies eliminates entire categories of bugs that occur when manually syncing types or implementing auth middleware.

## Common Pitfalls

### Pitfall 1: Vercel Builds Both Apps on Every Push
**What goes wrong:** Every commit triggers builds for all connected projects, wasting build minutes.
**Why it happens:** Vercel's default behavior without workspace filtering.
**How to avoid:** Vercel automatically skips unaffected projects for GitHub repos using npm/yarn/pnpm/bun workspaces. Ensure unique `name` fields in each package.json and explicit dependencies.
**Warning signs:** Build logs show "Building..." for unchanged apps.

### Pitfall 2: RLS Blocks Admin Access
**What goes wrong:** Admin can't access data even when authenticated.
**Why it happens:** Forgot to add admin policy, or wrong UUID.
**How to avoid:**
1. Get your admin UUID after first GitHub OAuth login: `select id from auth.users;`
2. Add admin policy to EVERY table.
3. Test locally with service role first, then with auth.
**Warning signs:** 403 errors or empty responses when admin queries tables.

### Pitfall 3: Migration Order Issues
**What goes wrong:** Migration fails because it references a table/type that doesn't exist yet.
**Why it happens:** Migrations run in lexicographic (filename) order.
**How to avoid:**
1. Use timestamps in filenames: `20260126120000_create_enums.sql`, `20260126120001_create_tables.sql`
2. Put dependent objects in later migrations.
3. Or use single migration file for related objects.
**Warning signs:** `relation "x" does not exist` errors during migration.

### Pitfall 4: Environment Variables Not Shared
**What goes wrong:** Admin app missing Supabase URL/keys.
**Why it happens:** Each Vercel project has separate env vars by default.
**How to avoid:** Use Vercel Shared Environment Variables at team level. Link `SUPABASE_URL` and `SUPABASE_ANON_KEY` to both web and admin projects.
**Warning signs:** Runtime errors about missing environment variables.

### Pitfall 5: Types Out of Sync
**What goes wrong:** TypeScript types don't match actual database schema.
**Why it happens:** `supabase gen types` not run after schema changes.
**How to avoid:** Add npm script: `"db:types": "supabase gen types typescript --local > src/types/database.types.ts"`. Run after every migration.
**Warning signs:** Runtime errors where TypeScript didn't catch type mismatches.

### Pitfall 6: Subdomain DNS Misconfiguration
**What goes wrong:** admin.alvarocortes.cl returns 404 or SSL error.
**Why it happens:** CNAME not pointing to Vercel, or domain not added to project.
**How to avoid:**
1. Add CNAME record: `admin` -> `cname.vercel-dns.com`
2. In Vercel admin project settings, add domain: `admin.alvarocortes.cl`
3. Wait for SSL certificate (automatic, may take minutes).
**Warning signs:** DNS lookup fails, or certificate warnings in browser.

## Code Examples

Verified patterns from official sources:

### Create Enum Type for Post Status
```sql
-- Source: Supabase documentation pattern
create type post_status as enum ('draft', 'published', 'archived');
```

### Posts Table with Proper Constraints
```sql
-- Source: Supabase documentation + MakerKit pattern
create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  status post_status not null default 'draft',
  author text not null default 'Alvaro Cortes',
  category text,
  tags text[] default '{}',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Ensure published posts have published_at timestamp
  constraint valid_publication check (
    (status = 'published' and published_at is not null) or
    (status != 'published')
  )
);

-- Index for common queries
create index idx_posts_status on posts (status);
create index idx_posts_published_at on posts (published_at desc)
  where status = 'published';
create index idx_posts_slug on posts (slug);
```

### Projects Table with Ordering
```sql
-- Source: Supabase documentation pattern
create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  details text,
  tech_stack text[] default '{}',
  image_url text,
  live_url text,
  repo_url text,
  featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for display ordering
create index idx_projects_featured on projects (featured, display_order);
```

### Timeline Entries Table
```sql
-- Source: Existing TypeScript interface + Supabase patterns
create type timeline_entry_type as enum ('work', 'studies');

create table timeline_entries (
  id uuid primary key default gen_random_uuid(),
  type timeline_entry_type not null,
  period text not null,
  title text not null,
  organization text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_timeline_order on timeline_entries (display_order);
```

### Tech Stacks with Categories
```sql
-- Source: Existing TypeScript interface + Supabase patterns
create table tech_categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table technologies (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references tech_categories(id) on delete cascade,
  name text not null,
  icon text not null,  -- simple-icons slug
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique(category_id, name)
);

create index idx_technologies_category on technologies (category_id, display_order);
```

### RLS Policies for Single-Admin CMS
```sql
-- Source: Supabase RLS documentation
-- Replace 'ADMIN_UUID' with actual auth.uid() after first login

-- Posts RLS
alter table posts enable row level security;

create policy "Public can read published posts"
on posts for select
using (status = 'published');

create policy "Admin can do everything with posts"
on posts for all
using ((select auth.uid()) = 'ADMIN_UUID');

-- Projects RLS
alter table projects enable row level security;

create policy "Public can read all projects"
on projects for select
using (true);

create policy "Admin can do everything with projects"
on projects for all
using ((select auth.uid()) = 'ADMIN_UUID');

-- Timeline RLS
alter table timeline_entries enable row level security;

create policy "Public can read timeline"
on timeline_entries for select
using (true);

create policy "Admin can do everything with timeline"
on timeline_entries for all
using ((select auth.uid()) = 'ADMIN_UUID');

-- Tech Categories RLS
alter table tech_categories enable row level security;

create policy "Public can read categories"
on tech_categories for select
using (true);

create policy "Admin can do everything with categories"
on tech_categories for all
using ((select auth.uid()) = 'ADMIN_UUID');

-- Technologies RLS
alter table technologies enable row level security;

create policy "Public can read technologies"
on technologies for select
using (true);

create policy "Admin can do everything with technologies"
on technologies for all
using ((select auth.uid()) = 'ADMIN_UUID');
```

### TypeScript Type Generation
```bash
# Source: Supabase CLI documentation
# Run after any schema change

# From project root
supabase gen types typescript --local > packages/shared/src/database.types.ts
```

### Using Generated Types
```typescript
// Source: Supabase TypeScript documentation
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@alvarocortes/shared/database.types'

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Type-safe query
const { data: posts } = await supabase
  .from('posts')
  .select('*')
  .eq('status', 'published')
  .order('published_at', { ascending: false })
// posts is typed as Database['public']['Tables']['posts']['Row'][]
```

### Admin Package.json
```json
{
  "name": "@alvarocortes/admin",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --max-warnings 0",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@alvarocortes/shared": "workspace:*",
    "@supabase/supabase-js": "^2.90.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.12.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.4.0",
    "@tailwindcss/vite": "^4.1.18",
    "tailwindcss": "^4.1.18",
    "vite": "^6.3.1",
    "vite-tsconfig-paths": "^5.0.0",
    "typescript": "^5.7.2"
  }
}
```

### GitHub OAuth Sign In
```typescript
// Source: Supabase GitHub Auth documentation
import { supabase } from './supabase'

async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })

  if (error) {
    console.error('Auth error:', error.message)
  }
}
```

## State of the Art (2026)

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual SQL files | Supabase declarative schemas | 2025 | Schema files in `supabase/schemas/` auto-generate migrations |
| Dashboard-first | Code-first migrations | 2024 | All changes tracked in version control |
| Separate env per app | Shared Environment Variables | 2023 | Team-level env vars link to multiple projects |

**New tools/patterns to consider:**
- **Supabase declarative schemas:** Alternative to imperative migrations. Define schema in `.sql` files, CLI generates diffs. (Available but migrations are more explicit for this project size)
- **Vercel Related Projects:** `relatedProjects` in vercel.json auto-links preview deployments. Useful for frontend-backend pairing.
- **PostgREST v14:** 20% faster GET requests. Enabled by default for new Supabase projects (January 2026).

**Deprecated/outdated:**
- **Modifying schema via Supabase Dashboard:** Still works but creates drift. Always use migrations.
- **RLS using user_metadata:** Security risk. Only use auth.uid() or similar immutable claims.

## Open Questions

Things that couldn't be fully resolved:

1. **Admin UUID after GitHub OAuth**
   - What we know: Need admin's auth.uid() to hardcode in RLS policies
   - What's unclear: Exact UUID unknown until first OAuth login
   - Recommendation: Create migration with placeholder comment, update after first login, or use a separate "first-time setup" migration

2. **Supabase project configuration**
   - What we know: Need supabase init, link to remote project
   - What's unclear: Whether Supabase project already exists for this repo
   - Recommendation: Check for existing Supabase project in dashboard, if not create one

3. **Seed data migration**
   - What we know: Existing hardcoded data in `apps/web/src/data/` should move to database
   - What's unclear: Best approach - separate seed.sql or part of initial migration
   - Recommendation: Use `supabase/seed.sql` for development, create manual insert migration for production

## Sources

### Primary (HIGH confidence)
- [Vercel Monorepos Documentation](https://vercel.com/docs/monorepos) - Multi-project deployment, root directory config
- [Vercel Monorepos FAQ](https://vercel.com/docs/monorepos/monorepo-faq) - Build filtering, shared files
- [Supabase Database Migrations](https://supabase.com/docs/guides/deployment/database-migrations) - Migration workflow
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) - RLS policies, auth.uid()
- [Supabase TypeScript Types](https://supabase.com/docs/guides/api/rest/generating-types) - Type generation
- [Supabase GitHub OAuth](https://supabase.com/docs/guides/auth/social-login/auth-github) - OAuth setup
- [Turborepo Repository Structure](https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository) - Workspace setup
- [Vercel Shared Environment Variables](https://vercel.com/docs/environment-variables/shared-environment-variables) - Team-level env vars

### Secondary (MEDIUM confidence)
- [MakerKit Supabase Blog Tutorial](https://makerkit.dev/blog/tutorials/create-blog-supabase) - Blog schema patterns
- [Dev.to Vercel Subdomain Guide](https://dev.to/jdtjenkins/how-to-deploy-a-monorepo-to-different-subdomains-on-vercel-2chn) - Practical subdomain steps
- [Dev.to Vercel Domain Setup](https://dev.to/farhadjaman/setting-up-a-domain-and-subdomain-on-vercel-a-step-by-step-guide-2idg) - DNS CNAME details

### Tertiary (LOW confidence)
- None - all key patterns verified with official documentation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Using existing project libraries
- Vercel deployment: HIGH - Official docs clear, pattern established
- Supabase schema: HIGH - Official docs + common patterns
- RLS policies: HIGH - Official docs explicit
- Turborepo workspace: HIGH - Existing project structure as reference

**Research date:** 2026-01-26
**Valid until:** 2026-02-26 (stable technologies, 30-day validity)
