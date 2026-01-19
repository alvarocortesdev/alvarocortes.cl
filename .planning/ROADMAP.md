# Roadmap: Alvaro Cortes Portfolio

## Overview

Build a professional developer portfolio MVP with BHVR stack (Bun, Hono, Vite, React). Starting with monorepo foundation, then deployment pipeline to ship early, followed by layout system with progressive loading, and finally the responsive home page.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Monorepo Foundation** - Complete BHVR dev environment with tooling
- [x] **Phase 2: Deployment Pipeline** - Vercel CI/CD to ship early and iterate
- [ ] **Phase 3: Layout System** - Header, footer, and progressive loading
- [ ] **Phase 4: Home Page** - Responsive home with banner and bio

## Phase Details

### Phase 1: Monorepo Foundation
**Goal**: Working development environment with Bun workspaces, TypeScript, Vite, Hono, Supabase, and tooling
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07, INFRA-08
**Success Criteria** (what must be TRUE):
  1. `bun install` succeeds at repo root
  2. `bun dev` starts dev server for apps/web
  3. `bun test` runs Vitest across all packages
  4. `bun lint` checks code quality
  5. TypeScript compiles without errors
  6. Hono API package has type exports for RPC
  7. Supabase client configured in packages/api
**Research**: Unlikely (STACK.md research already done)
**Plans**: 4 plans in 3 waves

Plans:
- [x] 01-01: Monorepo Scaffolding (Wave 1) — Bun workspaces, Turborepo, TypeScript config
- [x] 01-02: Frontend Stack (Wave 2) — Vite 6, React 19, Tailwind v4
- [x] 01-03: Backend Stack (Wave 2) — Hono API, Supabase client, RPC types
- [x] 01-04: Tooling (Wave 3) — Vitest, ESLint, Prettier

### Phase 2: Deployment Pipeline
**Goal**: Site deploys automatically to Vercel on push to main
**Depends on**: Phase 1
**Requirements**: DEPLOY-01, DEPLOY-02, DEPLOY-03, DEPLOY-04
**Success Criteria** (what must be TRUE):
  1. Pushing to main triggers Vercel build
  2. Build succeeds and site is accessible at Vercel URL
  3. Environment variables (Supabase keys) available in runtime
  4. PR branches create preview deployments
**Research**: Unlikely (Vercel deployment patterns in STACK.md)
**Plans**: 1 plan in 1 wave

Plans:
- [x] 02-01: Vercel Deployment Setup (Wave 1) — Deploy apps/web with GitHub CI/CD

### Phase 3: Layout System
**Goal**: Header, footer, and progressive loading orchestration
**Depends on**: Phase 2
**Requirements**: LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-04, LAYOUT-05, LOAD-01, LOAD-02, LOAD-03, LOAD-04
**Success Criteria** (what must be TRUE):
  1. Header appears immediately on page load with logo/name on left
  2. Header shows "Inicio" navigation link on right
  3. Footer is hidden until user scrolls to bottom
  4. Main content fades in smoothly with opacity transition
  5. No layout shifts during loading sequence
**Research**: Unlikely (Framer Motion patterns in STACK.md)
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: Home Page
**Goal**: Complete responsive home page with banner and bio sections
**Depends on**: Phase 3
**Requirements**: HOME-01, HOME-02, HOME-03, RESP-01, RESP-02, RESP-03, RESP-04
**Success Criteria** (what must be TRUE):
  1. Banner displays photo, name, and job title
  2. Bio section shows personal description text
  3. Desktop layout optimized for 1024px+
  4. Mobile layout stacks sections vertically with adapted header
  5. Page uses Layout component with header/footer
**Research**: Unlikely (Tailwind v4 responsive patterns in STACK.md)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Monorepo Foundation | 4/4 | ✓ Complete | 2026-01-16 |
| 2. Deployment Pipeline | 1/1 | ✓ Complete | 2026-01-18 |
| 3. Layout System | 0/? | Not started | - |
| 4. Home Page | 0/? | Not started | - |

---
*Roadmap created: 2026-01-16*
*Last updated: 2026-01-18 after Phase 2 execution*
