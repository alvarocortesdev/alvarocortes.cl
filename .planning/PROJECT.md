# Alvaro Cortes Portfolio

## What This Is

Portfolio personal profesional para Alvaro Cortes. Un sitio web con home page responsiva, portfolio page con timeline y proyectos, sistema de carga progresiva, y despliegue automático a Vercel. Inspirado visualmente en adhamdannaway.com.

## Core Value

El sitio debe sentirse fluido, profesional y demostrar dominio técnico — cada interacción, animación y detalle visual refleja capacidad de desarrollo frontend de alto nivel.

## Current Milestone: v1.2 Blog Page

**Goal:** Add a Blogger-style blog page with sidebar navigation, pagination, and responsive design.

**Target features:**
- Blog page with post listing (Blogger aesthetic)
- Fixed left sidebar (search, calendar, tags, categories)
- Collapsible sidebar on mobile
- Pagination (max 4 posts per page)
- Single post detail view
- 1 hardcoded example post (Supabase DB deferred to Admin)

## Current State (v1.1 Shipped)

**Live:** https://alvarocortes.vercel.app

**Tech stack:**
- Bun 1.3.5 + Turborepo 2.7
- Vite 6 + React 19 + Tailwind v4
- React Router 7.12.0 (SPA navigation)
- Hono API + Supabase client (backend infrastructure ready)
- Framer Motion for animations
- Vitest + ESLint + Prettier

**Codebase:**
- 946 LOC TypeScript/TSX
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

### Active (v1.2)

**Blog Page:**
- [ ] Blog page with Blogger-style aesthetic
- [ ] Fixed left sidebar (search, calendar, tags, categories)
- [ ] Collapsible sidebar on mobile
- [ ] Pagination (max 4 posts per page)
- [ ] Single post detail view with metadata
- [ ] 1 hardcoded example post

### Future (v1.3+)

**Admin Panel:**
- [ ] Supabase Auth con GitHub OAuth
- [ ] Admin en subdominio (admin.dominio.com)
- [ ] CRUD de posts del blog (ES/EN)
- [ ] CRUD de proyectos del portfolio (ES/EN)
- [ ] CRUD de temas

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

---
*Last updated: 2026-01-20 after v1.2 milestone initialization*
