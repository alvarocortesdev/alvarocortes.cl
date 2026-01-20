# Roadmap: Alvaro Cortes Portfolio

## Milestones

- v1.0 MVP Foundation - Phases 1-4 (shipped 2026-01-19)
- v1.1 Portfolio Page - Phases 5-8 (in progress)

## Overview

Build a Portfolio page showcasing work timeline, tech stacks, and projects. The page demonstrates technical capability through smooth animations, responsive layouts, and interactive elements. Content is hardcoded initially, preparing for CMS integration in future admin module.

## Phases

<details>
<summary>v1.0 MVP Foundation (Phases 1-4) - SHIPPED 2026-01-19</summary>

See: .planning/milestones/v1.0-ROADMAP.md

</details>

### v1.1 Portfolio Page (In Progress)

- [x] **Phase 5: Portfolio Page Foundation** - Basic page with routing and layout
- [x] **Phase 6: Work Timeline** - Horizontal timeline with work/study history
- [ ] **Phase 7: Tech Stacks** - Four categorized cards with technology icons
- [ ] **Phase 8: Projects Bento** - Interactive project showcase with modal

## Phase Details

### Phase 5: Portfolio Page Foundation

**Goal**: Basic Portfolio page with routing and layout
**Depends on**: Phase 4 (v1.0)
**Requirements**: NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):
  1. Header shows "Portfolio" link next to "Inicio"
  2. /portfolio route loads without errors
  3. Portfolio page uses Layout component with header/footer
**Research**: Unlikely (internal routing, established patterns)
**Plans**: TBD

Plans:
- [x] 05-01: Portfolio page scaffolding and routing

### Phase 6: Work Timeline

**Goal**: Horizontal timeline showing 7 work/study entries from 2019-2025
**Depends on**: Phase 5
**Requirements**: TIME-01, TIME-02, TIME-03, TIME-04, TIME-05
**Success Criteria** (what must be TRUE):
  1. Timeline displays horizontally with scroll on desktop
  2. All 7 entries visible with period, role/program, company/institution
  3. Work entries styled differently from Studies entries (colors/icons)
  4. Timeline stacks vertically on mobile
**Research**: Unlikely (CSS layout, existing Tailwind/Framer patterns)
**Plans**: TBD

Plans:
- [x] 06-01: Timeline data and component (apps/web/src/data/timeline.ts, Timeline.tsx)
- [x] 06-02: Timeline responsive design (horizontal scroll desktop, vertical mobile)

### Phase 7: Tech Stacks

**Goal**: Four cards displaying categorized technologies with icons
**Depends on**: Phase 5
**Requirements**: TECH-01, TECH-02, TECH-03, TECH-04
**Success Criteria** (what must be TRUE):
  1. Four cards visible (Frontend, Backend, Tools, Other)
  2. Each card shows technologies with icons
  3. Grid responsive (2x2 mobile, 4 columns desktop)
**Research**: Likely (technology icons)
**Research topics**: simple-icons CDN, devicons, or SVG icon approach
**Plans**: TBD

Plans:
- [ ] 07-01: Tech stacks data, cards, and icons (single consolidated plan)

### Phase 8: Projects Bento

**Goal**: Interactive project showcase with hover effects and modal
**Depends on**: Phase 5
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05
**Success Criteria** (what must be TRUE):
  1. Bento grid layout displays placeholder projects
  2. Cards show name, description, tech badges
  3. Hover effect lifts and slightly enlarges card
  4. Click opens modal with project details
**Research**: Likely (bento grid, modal patterns)
**Research topics**: Responsive bento grid CSS, Framer Motion modal/AnimatePresence
**Plans**: TBD

Plans:
- [ ] 08-01: Bento grid layout and project cards
- [ ] 08-02: Project modal with details

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 5. Portfolio Foundation | 1/1 | Complete | 2026-01-20 |
| 6. Work Timeline | 2/2 | Complete | 2026-01-20 |
| 7. Tech Stacks | 0/1 | Not started | - |
| 8. Projects Bento | 0/2 | Not started | - |

---
*Roadmap created: 2026-01-20*
*Last updated: 2026-01-20 after Phase 6 completion*
