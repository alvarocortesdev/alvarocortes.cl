# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-26)

**Core value:** El sitio debe sentirse fluido, profesional y demostrar dominio tecnico
**Current focus:** v1.3 Admin Panel

## Current Position

Milestone: v1.3 Admin Panel
Phase: 15 (Blog CRUD) — IN PROGRESS
Plan: 3 of 4
Status: Plan 15-03 complete, ready for 15-04
Last activity: 2026-01-27 — Completed 15-03-PLAN.md (Blog Form)

Progress: █████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 40% (v1.3 - 3/8 phases in progress)

## Milestone History

| Milestone | Phases | Plans | Status | Shipped |
|-----------|--------|-------|--------|---------|
| v1.0 MVP Foundation | 1-4 | 9 | SHIPPED | 2026-01-19 |
| v1.1 Portfolio Page | 5-8 | 6 | SHIPPED | 2026-01-20 |
| v1.2 Blog Page | 9-12 | 5 | SHIPPED | 2026-01-21 |
| v1.3 Admin Panel | 13-18 | TBD | IN PROGRESS | — |

## Performance Metrics

### v1.0

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-monorepo | 4/4 | ~35 min | ~9 min |
| 02-deployment | 1/1 | ~12 min | ~12 min |
| 03-layout | 2/2 | ~5 min | ~2.5 min |
| 04-home-page | 2/2 | ~13 min | ~6.5 min |

### v1.1

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 05-portfolio-foundation | 1/1 | ~5 min | ~5 min |
| 06-work-timeline | 2/2 | ~8 min | ~4 min |
| 07-tech-stacks | 1/1 | ~4 min | ~4 min |
| 08-projects-bento | 2/2 | ~9 min | ~4.5 min |

### v1.2

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 09-blog-foundation | 1/1 | ~3 min | ~3 min |
| 10-sidebar | 2/2 | ~6 min | ~3 min |
| 11-blog-listing | 1/1 | ~3 min | ~3 min |
| 12-post-detail | 1/1 | ~4 min | ~4 min |

### v1.3

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 13-admin-foundation | 3/3 | ~15 min | ~5 min |
| 14-authentication | 3/3 | ~15 min | ~5 min |
| 15-blog-crud | 3/4 | ~7 min | ~2.3 min |

## Accumulated Context

### Key Decisions

See PROJECT.md Key Decisions table for full list with outcomes.

Summary:
- Stack: BHVR (Bun, Hono, Vite, React)
- Tailwind v4 with @import syntax
- Mobile-first responsive with md: breakpoints
- Progressive loading: 150ms content fade-in
- Footer scroll-reveal at 100px threshold
- Framer Motion for animations
- React Router for SPA navigation
- simple-icons CDN for tech icons
- Blog: Two-column layout (sidebar left 256px, content right fluid)
- Sidebar: Sticky positioning with md:top-24 to account for header
- Sidebar: Hidden by default on mobile with toggle button
- Shared data modules: src/data/ directory for reusable data
- Blog content: dangerouslySetInnerHTML (needs sanitization for CMS)

### v1.3 Constraints

- Admin on separate subdomain: admin.alvarocortes.cl
- GitHub OAuth for authentication (single-user, owner only)
- Supabase for database and auth
- Must maintain existing site appearance (only data source changes)
- Deploy via GitHub push only (not Vercel CLI)
- Production is alvarocortes.cl — careful with breaking changes

### Patterns Established

- Shared data modules: src/data/ directory for reusable data
- Social sharing: window.open with noopener,noreferrer
- Clipboard feedback: useState with setTimeout for visual confirmation
- AuthProvider wraps app at router level
- useAuth hook for auth state consumption
- ProtectedRoute guards protected routes
- Pages directory for route components
- Dashboard header with user info and sign out
- exchangeCodeForSession for OAuth redirect handling
- Admin page header with back navigation
- Content Management card grid on Dashboard
- Tables helper type for supabase row types
- TipTap useEditor hook pattern for rich text
- ToolbarButton component for editor toolbar
- CRUD library pattern: lib/posts.ts with typed functions
- generateSlug utility for URL-safe slugs
- Form mode detection via useParams

### Pending Todos

- [x] Plan and execute Phase 13 (Admin Foundation)
- [x] Plan and execute Phase 14 (Authentication)
- [ ] Plan and execute Phase 15 (Blog CRUD) — in progress (2/4 plans complete)
- [ ] Plan and execute Phase 16 (Projects CRUD)
- [ ] Plan and execute Phase 17 (Timeline & Tech CRUD)
- [ ] Plan and execute Phase 18 (Site Integration)

### Blockers/Concerns

None — ready for Phase 15 Plan 04 (Image Uploads).

### Deferred to v1.4+

- Timeline redesign (animated horizontal line, vertical branches, drawer effect)
- Blog filters (functional search, calendar, tags, categories filtering)

## Session Continuity

Last session: 2026-01-27
Stopped at: Plan 15-04 code complete, pending visual verification
Resume file: .planning/phases/15-blog-crud/.continue-here.md

---
*Last updated: 2026-01-27 — Phase 15 Blog CRUD in progress, Plan 03 complete*
