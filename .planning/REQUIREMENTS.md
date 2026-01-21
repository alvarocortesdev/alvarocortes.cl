# Requirements: Alvaro Cortes Portfolio

**Defined:** 2026-01-20
**Core Value:** El sitio debe sentirse fluido, profesional y demostrar dominio técnico

## v1.2 Requirements

Requirements for Blog Page release. Each maps to roadmap phases.

### Navigation

- [x] **NAV-04**: Header includes "Blog" link
- [x] **NAV-05**: Blog page accessible at /blog route
- [x] **NAV-06**: Blog page uses Layout component with header/footer

### Blog Layout

- [x] **BLOG-01**: Blog page displays Blogger-style layout (sidebar left, content right)
- [ ] **BLOG-02**: Sidebar is fixed on desktop (doesn't scroll with content)
- [ ] **BLOG-03**: Sidebar is collapsible/hidden on mobile with toggle

### Sidebar

- [ ] **SIDE-01**: Sidebar displays search input field (UI only, functionality deferred)
- [ ] **SIDE-02**: Sidebar displays calendar widget showing post dates
- [ ] **SIDE-03**: Sidebar displays tags cloud with clickable tags
- [ ] **SIDE-04**: Sidebar displays categories list with clickable items

### Blog Listing

- [ ] **LIST-01**: Blog listing displays posts in grid/list format
- [ ] **LIST-02**: Each post card shows title, excerpt, date, and tags
- [ ] **LIST-03**: Pagination shows max 4 posts per page
- [ ] **LIST-04**: Pagination includes prev/next navigation

### Post Detail

- [ ] **POST-01**: Single post view displays full content
- [ ] **POST-02**: Post shows metadata (date, author, tags, category)
- [ ] **POST-03**: 1 hardcoded example post with realistic content
- [ ] **POST-04**: Social sharing buttons (Twitter/X, LinkedIn, copy link)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Search

- **SRCH-01**: Search filters posts by title/content
- **SRCH-02**: Search results page

### CMS Integration

- **CMS-01**: Posts from Supabase database
- **CMS-02**: Dynamic tags/categories from database

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Comments on posts | No necesarios para portfolio |
| RSS feed | Deferred to v1.3+ |
| Related posts | Requires CMS/algorithm |

## Traceability

Which phases cover which requirements. Updated by create-roadmap.

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-04 | 9 | Complete |
| NAV-05 | 9 | Complete |
| NAV-06 | 9 | Complete |
| BLOG-01 | 9 | Complete |
| BLOG-02 | 10 | Pending |
| BLOG-03 | 10 | Pending |
| SIDE-01 | 10 | Pending |
| SIDE-02 | 10 | Pending |
| SIDE-03 | 10 | Pending |
| SIDE-04 | 10 | Pending |
| LIST-01 | 11 | Pending |
| LIST-02 | 11 | Pending |
| LIST-03 | 11 | Pending |
| LIST-04 | 11 | Pending |
| POST-01 | 12 | Pending |
| POST-02 | 12 | Pending |
| POST-03 | 12 | Pending |
| POST-04 | 12 | Pending |

**Coverage:**
- v1.2 requirements: 17 total
- Mapped to phases: 17 ✓
- Unmapped: 0

---
*Requirements defined: 2026-01-20*
*Last updated: 2026-01-20 after initial definition*
