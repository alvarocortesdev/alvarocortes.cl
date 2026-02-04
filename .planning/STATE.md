# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-03)

**Core value:** El sitio debe sentirse fluido, profesional y demostrar dominio tecnico
**Current focus:** v1.4 Timeline Redesign + Blog Filters

## Current Position

Milestone: v1.4 Timeline Redesign + Blog Filters
Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-02-03 — Milestone v1.4 started

Progress: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0% (v1.4 - defining requirements)

## Milestone History

| Milestone | Phases | Plans | Status | Shipped |
|-----------|--------|-------|--------|---------|
| v1.0 MVP Foundation | 1-4 | 9 | SHIPPED | 2026-01-19 |
| v1.1 Portfolio Page | 5-8 | 6 | SHIPPED | 2026-01-20 |
| v1.2 Blog Page | 9-12 | 5 | SHIPPED | 2026-01-21 |
| v1.3 Admin Panel | 13-18 | 22 | SHIPPED | 2026-02-03 |

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
| 15-blog-crud | 4/4 | ~45 min | ~11 min |
| 16-projects-crud | 3/3 | ~5 min | ~2 min |
| 17-timeline-tech-crud | 5/5 | ~8 min | ~1.6 min |
| 18-site-integration | 4/4 | ~9 min | ~2.25 min |

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
- Database field naming: Use schema field names directly in components (tech_stack, live_url, repo_url)
- Blog content: dangerouslySetInnerHTML (needs sanitization for CMS)

### v1.3 Constraints

- Admin on separate subdomain: admin.alvarocortes.cl
- GitHub OAuth for authentication (single-user, owner only)
- Supabase for database and auth
- Must maintain existing site appearance (only data source changes)
- Deploy via GitHub push only (not Vercel CLI)
- Production is alvarocortes.cl — careful with breaking changes

### Patterns Established

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
- Projects CRUD follows same patterns as Posts CRUD
- Featured toggle helper function in CRUD libraries
- ProjectForm follows PostForm pattern for consistency
- Image upload with preview, replace, and cleanup on form submit
- Timeline CRUD library pattern with 6 typed operations
- DateInput component with hybrid text/dropdown date parsing
- Canonical 'Mon YYYY' date format (e.g., 'Mar 2023')
- IconPicker component for icon selection (simple-icons CDN + custom upload)
- CRUD updateOrders functions for batch display_order updates (drag-drop)
- dnd-kit for drag-drop functionality
- Nested DndContext for parent-child drag-drop hierarchies
- Expandable/collapsible list items with Set-based state
- Create-then-edit pattern for parent-child form relationships
- Inline entity management within parent form (edit mode only)
- Dashboard card pattern with counts and navigation
- Parallel data loading with Promise.all for counts
- QueryClientProvider at app root with locked config (5min staleTime, 2 retries)
- Utility files in apps/web/src/lib/ directory
- sanitizeHtml function for rich text content rendering
- Supabase client pattern: env validation + typed createClient
- React Query hook pattern: one hook per content type with typed interfaces
- Published content filtering at database query level
- Client-side joins for nested data relationships
- Enabled guards for conditional queries
- Component integration pattern: replace hardcoded data → add hook → add loading/error/empty states → wrap in motion.div
- Loading states use skeleton UI with 150ms fade-in
- Error states use red-themed alert boxes
- Empty states provide contextual messaging
- HTML sanitization before dangerouslySetInnerHTML
- Date field flexibility: published_at || created_at fallback pattern
- Database field naming: direct schema field names in components (no mapping layer)
- Complete data source migration: hardcoded data files removed after integration

### Pending Todos

- [ ] Define requirements for v1.4
- [ ] Create roadmap for v1.4
- [ ] Plan and execute phases for v1.4

### Blockers/Concerns

None — starting fresh milestone v1.4.

### Deferred to v1.4+

- Timeline redesign (animated horizontal line, vertical branches, drawer effect)
- Blog filters (functional search, calendar, tags, categories filtering)

## Session Continuity

Last session: 2026-02-03
Stopped at: Milestone v1.4 initialization — defining requirements
Resume file: None

---
*Last updated: 2026-02-03 — Milestone v1.4 started*
