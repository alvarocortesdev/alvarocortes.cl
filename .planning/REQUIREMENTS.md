# Requirements: Alvaro Cortes Portfolio

**Defined:** 2026-01-16
**Core Value:** El sitio debe sentirse fluido, profesional y demostrar dominio técnico

## v1 Requirements

Requirements for MVP Foundation. Each maps to roadmap phases.

### Infrastructure

- [ ] **INFRA-01**: Monorepo structure with Bun workspaces (apps/web, packages/api, packages/shared)
- [ ] **INFRA-02**: Turborepo configured for build/dev/test orchestration
- [ ] **INFRA-03**: TypeScript configured across all packages with shared tsconfig
- [ ] **INFRA-04**: Vite configured for apps/web with React and Tailwind v4
- [ ] **INFRA-05**: Hono API package with RPC type exports
- [ ] **INFRA-06**: Supabase client configured in packages/api
- [ ] **INFRA-07**: Vitest configured with projects for monorepo testing
- [ ] **INFRA-08**: ESLint/Prettier configured for code quality

### Deployment

- [ ] **DEPLOY-01**: Vercel project connected to GitHub repo
- [ ] **DEPLOY-02**: apps/web deploys automatically on push to main
- [ ] **DEPLOY-03**: Environment variables configured in Vercel (Supabase keys)
- [ ] **DEPLOY-04**: Preview deployments work for pull requests

### Layout Components

- [ ] **LAYOUT-01**: Header component with logo/photo and name on left
- [ ] **LAYOUT-02**: Header shows navigation with "Inicio" link on right
- [ ] **LAYOUT-03**: Footer component hidden by default
- [ ] **LAYOUT-04**: Footer reveals on scroll to bottom of page
- [ ] **LAYOUT-05**: Layout wrapper component orchestrates header/content/footer

### Progressive Loading

- [ ] **LOAD-01**: Header renders immediately on page load
- [ ] **LOAD-02**: Main content fades in with opacity transition when ready
- [ ] **LOAD-03**: Footer appears after content is visible
- [ ] **LOAD-04**: No layout shifts during loading sequence

### Home Page

- [ ] **HOME-01**: Banner section with photo, name, and job title
- [ ] **HOME-02**: Bio/presentation section with personal description
- [ ] **HOME-03**: Home page uses Layout component with header/footer

### Responsive Design

- [ ] **RESP-01**: Desktop layout optimized (1024px+)
- [ ] **RESP-02**: Mobile layout optimized (< 768px)
- [ ] **RESP-03**: Header adapts to mobile (condensed navigation)
- [ ] **RESP-04**: Home page sections stack vertically on mobile

## v2 Requirements

Deferred to future milestones. Tracked but not in current roadmap.

### Authentication (Admin)

- **AUTH-01**: Admin can sign in with GitHub OAuth
- **AUTH-02**: Admin session persists across browser refresh
- **AUTH-03**: Protected routes redirect unauthenticated users

### Internationalization

- **I18N-01**: UI supports ES/EN language switching
- **I18N-02**: Language switcher in header
- **I18N-03**: Content (blog, portfolio) available in both languages

### Theming

- **THEME-01**: Light/dark mode toggle in header
- **THEME-02**: Up to 5 color themes selectable
- **THEME-03**: Each theme has light and dark variants
- **THEME-04**: Theme preference persists in localStorage

### Floating Icons

- **FLOAT-01**: Contact icon opens modal with form
- **FLOAT-02**: Info icon opens modal with social links
- **FLOAT-03**: Theme icon opens theme selector
- **FLOAT-04**: Icons show labels on hover

### Portfolio Page

- **PORT-01**: Horizontal timeline of work experience
- **PORT-02**: Tech stacks grid (4 categories with icons)
- **PORT-03**: Bento Grid of projects
- **PORT-04**: Project hover effect (lift and scale)
- **PORT-05**: Project click opens modal with preview

### Blog Page

- **BLOG-01**: Blogger-style layout with sidebar
- **BLOG-02**: Sidebar with search, calendar, tags
- **BLOG-03**: Collapsible sidebar on mobile
- **BLOG-04**: Post list with pagination (4 per page)

### Admin Panel

- **ADMIN-01**: Blog post CRUD (ES/EN)
- **ADMIN-02**: Portfolio project CRUD (ES/EN)
- **ADMIN-03**: Theme management CRUD

### Contact

- **CONTACT-01**: Contact form sends email via Resend

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Multiple admin users | Solo owner — single GitHub account |
| Blog comments | Not needed for portfolio purpose |
| E-commerce/payments | Portfolio, not a store |
| Advanced analytics | Vercel Analytics basic is sufficient |
| Tablet-specific layout | Desktop/mobile covers 95% of users |
| TV-specific layout | Extremely low priority for portfolio |
| Folded phone layout | Edge case, defer indefinitely |

## Traceability

Which phases cover which requirements. Updated by create-roadmap.

| Requirement | Phase | Status |
|-------------|-------|--------|
| (To be filled by create-roadmap) | | |

**Coverage:**
- v1 requirements: 20 total
- Mapped to phases: 0
- Unmapped: 20 (pending roadmap creation)

---
*Requirements defined: 2026-01-16*
*Last updated: 2026-01-16 after initial definition*
