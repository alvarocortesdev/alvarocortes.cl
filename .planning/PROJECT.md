# Alvaro Cortes Portfolio

## What This Is

Portfolio personal profesional para Alvaro Cortes. Un sitio web con home page responsiva, portfolio page con timeline y proyectos, blog Blogger-style con sidebar y paginación, sistema de carga progresiva, y despliegue automático a Vercel. Inspirado visualmente en adhamdannaway.com.

## Core Value

El sitio debe sentirse fluido, profesional y demostrar dominio técnico — cada interacción, animación y detalle visual refleja capacidad de desarrollo frontend de alto nivel.

## Current Milestone: v1.3 Admin Panel

**Goal:** Full CMS with admin interface at separate subdomain, replacing hardcoded data with database-driven content.

**Target features:**
- Admin Panel App at admin.alvarocortes.cl (new workspace in monorepo)
- GitHub OAuth via Supabase Auth (single-user owner access)
- Blog Posts CRUD with rich content editor
- Projects CRUD for portfolio items
- Timeline CRUD for work/studies entries
- Tech Stacks CRUD for categories and icons
- Database Schema (Supabase PostgreSQL tables)
- API Integration (main site fetches from Supabase)

## Current State (v1.2 Shipped)

**Live:** https://alvarocortes.vercel.app

**Tech stack:**
- Bun 1.3.5 + Turborepo 2.7
- Vite 6 + React 19 + Tailwind v4
- React Router 7.12.0 (SPA navigation)
- Hono API + Supabase client (backend infrastructure ready)
- Framer Motion for animations
- Vitest + ESLint + Prettier

**Codebase:**
- 1,444 LOC TypeScript/TSX
- 3 workspaces (web, api, shared)
- 4 tests passing

**What's built:**
- Responsive home page with Banner and Bio sections
- Progressive loading (header immediate, content fade-in, footer scroll-reveal)
- Mobile hamburger menu with animated icon
- Dark theme with professional styling
- **Portfolio page** with:
  - Work timeline (7 entries 2019-2025, Work/Studies color distinction)
  - Tech stacks (4 cards with simple-icons CDN)
  - Projects bento grid (hover effects, modal with AnimatePresence)
- **Blog page** with:
  - Blogger-style two-column layout (sidebar left 256px, content fluid right)
  - Responsive sidebar (sticky desktop, toggle on mobile)
  - Sidebar widgets: search, calendar, tags cloud, categories
  - Post listing with pagination (4 posts/page)
  - Single post detail with metadata and social sharing

## Requirements

### Validated

**v1.0 MVP:**
- ✓ Monorepo BHVR (Bun, Hono, Vite, React)
- ✓ Supabase client configured
- ✓ Vitest testing
- ✓ Vercel deployment with CI/CD
- ✓ Header with logo/name and navigation
- ✓ Footer with scroll reveal
- ✓ Progressive loading (header first, content transitions)
- ✓ Desktop and mobile responsive design
- ✓ Home page with banner, bio, Layout

**v1.1 Portfolio Page:**
- ✓ Portfolio navigation link and /portfolio route
- ✓ Horizontal work timeline (scrollable, 7 entries 2019-2025)
- ✓ Visual distinction between Work and Studies entries
- ✓ Tech stacks section with 4 categorized cards and icons
- ✓ Bento Grid project showcase with placeholder data
- ✓ Hover effect: card lifts and enlarges
- ✓ Click opens modal with project details
- ✓ Responsive layout (mobile/desktop)

**v1.2 Blog Page:**
- ✓ Blog page with Blogger-style aesthetic — v1.2
- ✓ Fixed left sidebar (search, calendar, tags, categories) — v1.2
- ✓ Collapsible sidebar on mobile — v1.2
- ✓ Pagination (max 4 posts per page) — v1.2
- ✓ Single post detail view with metadata — v1.2
- ✓ 1 hardcoded example post — v1.2
- ✓ Social sharing buttons (Twitter/X, LinkedIn, copy link) — v1.2

### Active (v1.3)

**Admin Panel:**
- [ ] Admin app at admin.alvarocortes.cl (new workspace)
- [ ] GitHub OAuth via Supabase Auth
- [ ] Database schema for all entities
- [ ] Blog Posts CRUD with rich content
- [ ] Projects CRUD for portfolio
- [ ] Timeline CRUD for work/studies
- [ ] Tech Stacks CRUD for categories
- [ ] Main site API integration (dynamic content)

### Future (v1.4+)

**Enhancements:**
- [ ] Internacionalización (ES/EN switcher)
- [ ] Temas administrables (light/dark variants)
- [ ] 3 Íconos Flotantes (Contacto, Info, Temas)
- [ ] Formulario de contacto via Resend

### Out of Scope

- Múltiples usuarios admin — solo el owner
- Comentarios en blog — no necesarios
- E-commerce/pagos — es portfolio, no tienda
- Analytics avanzados — Vercel Analytics básico suficiente
- Tablet/TV/folded layouts — desktop/mobile covers 95%

## Context

**Referencia visual:** https://www.adhamdannaway.com/

**Propósito:** Sitio para atraer reclutadores y mostrar capacidades técnicas.

**Tipografía:** Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif

## Constraints

- **Stack**: BHVR (Bun, Hono, Vite, React) — no negociable
- **BD**: Supabase con PostgreSQL
- **Hosting**: Vercel con GitHub CI/CD
- **Testing**: Vitest
- **Arquitectura**: Monorepo (apps/web, packages/api, packages/shared)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Monorepo para sitio + admin | Código compartido, deploy unificado | ✓ Good — working well |
| Carga progresiva con transiciones | UX fluida, diferenciador visual | ✓ Good — 150ms feels smooth |
| Mobile-first responsive | Better code organization | ✓ Good — md: breakpoints work well |
| Tailwind v4 @import syntax | Modern CSS approach | ✓ Good — cleaner than directives |
| Framer Motion for animations | Powerful, declarative | ✓ Good — AnimatePresence works great |
| Footer scroll-reveal | Clean UX, reveals only when relevant | ✓ Good — 100px threshold feels natural |
| Photo placeholder with initials | Ship fast, real image later | — Pending real image |
| BrowserRouter in main.tsx | Routing setup | ✓ Good — wraps entire App |
| Layout per-route | Route structure | ✓ Good — flexibility for different layouts |
| simple-icons CDN | Tech icons without local assets | ✓ Good — white icons, text fallback |
| Bento grid col-span-2 | Featured projects | ✓ Good — visual hierarchy |
| AnimatePresence modal | Smooth enter/exit | ✓ Good — 3 close methods work well |
| Two-column blog layout | Blogger aesthetic | ✓ Good — sidebar 256px + fluid content |
| Sticky sidebar | UX consistency | ✓ Good — md:top-24 accounts for header |
| Mobile sidebar toggle | Clean mobile UX | ✓ Good — hidden by default |
| Native Date API calendar | No external deps | ✓ Good — sufficient for widget |
| Shared data modules | Reuse across components | ✓ Good — src/data/posts.ts pattern |
| dangerouslySetInnerHTML | Hardcoded HTML content | — Needs sanitization for CMS |
| prose-invert typography | Readable blog content | ✓ Good — consistent styling |

---
*Last updated: 2026-01-26 after v1.3 milestone initialization*
