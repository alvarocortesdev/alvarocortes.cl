# Alvaro Cortes Portfolio

## What This Is

Portfolio personal profesional para Alvaro Cortes. Un sitio web con home page responsiva, sistema de carga progresiva, y despliegue automático a Vercel. La v1.0 establece la base para futuras páginas de portfolio, blog, y panel admin. Inspirado visualmente en adhamdannaway.com.

## Core Value

El sitio debe sentirse fluido, profesional y demostrar dominio técnico — cada interacción, animación y detalle visual refleja capacidad de desarrollo frontend de alto nivel.

## Current Milestone: v1.1 Portfolio Page

**Goal:** Add a Portfolio page showcasing work timeline, tech stacks, and projects in a visually impressive layout.

**Target features:**
- Horizontal work timeline (2019-2025, 7 entries)
- Tech stacks section with 4 categorized cards and icons
- Bento Grid project showcase with hover effects and modals

## Current State (v1.0 Shipped)

**Live:** https://alvarocortes.vercel.app

**Tech stack:**
- Bun 1.3.5 + Turborepo 2.7
- Vite 6 + React 19 + Tailwind v4
- Hono API + Supabase client (backend infrastructure ready)
- Framer Motion for animations
- Vitest + ESLint + Prettier

**Codebase:**
- 432 LOC TypeScript/TSX
- 59 files across 3 workspaces
- 4 tests passing

**What's built:**
- Responsive home page with Banner and Bio sections
- Progressive loading (header immediate, content fade-in, footer scroll-reveal)
- Mobile hamburger menu with animated icon
- Dark theme with professional styling

## Requirements

### Validated

- Monorepo BHVR (Bun, Hono, Vite, React) — v1.0
- Supabase client configured — v1.0
- Vitest testing — v1.0
- Vercel deployment with CI/CD — v1.0
- Header with logo/name and navigation — v1.0
- Footer with scroll reveal — v1.0
- Progressive loading (header first, content transitions) — v1.0
- Desktop and mobile responsive design — v1.0
- Home page with banner, bio, Layout — v1.0

### Active (v1.1)

**Portfolio Page:**
- [ ] Horizontal work timeline (scrollable, 7 entries 2019-2025)
- [ ] Visual distinction between Work and Studies entries
- [ ] Tech stacks section with 4 categorized cards
- [ ] Technology icons (Frontend, Backend, Tools, Other)
- [ ] Bento Grid project showcase with placeholder data
- [ ] Hover effect: card lifts and enlarges
- [ ] Click opens modal with project details
- [ ] Responsive layout (mobile/desktop)

### Future (v1.2+)

**Blog Page:**
- [ ] Estilo réplica de Blogger
- [ ] Sidebar izquierda fija: búsqueda, calendario, tags
- [ ] Sidebar colapsable en móvil
- [ ] Paginación (máx 4 por vista)

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

---
*Last updated: 2026-01-20 after v1.1 milestone initialization*
