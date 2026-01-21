# Roadmap: v1.2 Blog Page

**Created:** 2026-01-20
**Milestone:** v1.2 Blog Page
**Phases:** 9-12 (4 phases)

## Overview

```
Phase 9: Blog Foundation    → Navigation + base layout
Phase 10: Sidebar           → All sidebar components + responsive behavior
Phase 11: Blog Listing      → Post cards + pagination
Phase 12: Post Detail       → Single post view + example content
```

---

## Phase 9: Blog Foundation & Navigation ✓

**Goal:** Add blog route with Blogger-style two-column layout

**Status:** Complete (2026-01-20)
**Plans:** 1/1

**Requirements:**
- NAV-04: Header includes "Blog" link ✓
- NAV-05: Blog page accessible at /blog route ✓
- NAV-06: Blog page uses Layout component with header/footer ✓
- BLOG-01: Blog page displays Blogger-style layout (sidebar left, content right) ✓

**Success criteria:**
- /blog route renders with Layout (header + footer) ✓
- Header navigation includes "Blog" link ✓
- Two-column layout visible: sidebar placeholder left, content area right ✓
- Mobile shows stacked layout (sidebar above content) ✓

**Depends on:** None (first phase of milestone)

---

## Phase 10: Sidebar Components ✓

**Goal:** Build all sidebar widgets with fixed/collapsible behavior

**Status:** Complete (2026-01-21)
**Plans:** 2/2

**Requirements:**
- SIDE-01: Sidebar displays search input field (UI only, functionality deferred) ✓
- SIDE-02: Sidebar displays calendar widget showing post dates ✓
- SIDE-03: Sidebar displays tags cloud with clickable tags ✓
- SIDE-04: Sidebar displays categories list with clickable items ✓
- BLOG-02: Sidebar is fixed on desktop (doesn't scroll with content) ✓
- BLOG-03: Sidebar is collapsible/hidden on mobile with toggle ✓

**Success criteria:**
- Search input renders (no functionality yet) ✓
- Calendar widget shows current month with highlighted post dates ✓
- Tags cloud displays clickable tag pills ✓
- Categories list shows clickable category items ✓
- Desktop: sidebar stays fixed while content scrolls ✓
- Mobile: sidebar hidden by default, toggle button reveals it ✓

**Depends on:** Phase 9 (blog layout structure)

---

## Phase 11: Blog Listing & Pagination

**Goal:** Display post cards with pagination controls

**Requirements:**
- LIST-01: Blog listing displays posts in grid/list format
- LIST-02: Each post card shows title, excerpt, date, and tags
- LIST-03: Pagination shows max 4 posts per page
- LIST-04: Pagination includes prev/next navigation

**Success criteria:**
- Post cards render in grid/list layout
- Each card shows: title, excerpt (truncated), date, tags
- Maximum 4 posts visible per page
- Prev/Next buttons navigate between pages
- Page indicator shows current/total pages

**Depends on:** Phase 10 (sidebar complete for full layout)

---

## Phase 12: Post Detail & Content

**Goal:** Single post view with example content and sharing

**Requirements:**
- POST-01: Single post view displays full content
- POST-02: Post shows metadata (date, author, tags, category)
- POST-03: 1 hardcoded example post with realistic content
- POST-04: Social sharing buttons (Twitter/X, LinkedIn, copy link)

**Success criteria:**
- /blog/:slug route renders single post
- Post displays full markdown/HTML content
- Metadata visible: date, author, tags, category
- 1 realistic example post with meaningful content
- Share buttons for Twitter/X, LinkedIn, copy link
- Copy link shows confirmation feedback

**Depends on:** Phase 11 (post cards link to detail)

---

## Requirement Traceability

| Requirement | Phase | Description |
|-------------|-------|-------------|
| NAV-04 | 9 | Header includes "Blog" link |
| NAV-05 | 9 | Blog page accessible at /blog route |
| NAV-06 | 9 | Blog page uses Layout component |
| BLOG-01 | 9 | Blogger-style layout (sidebar left, content right) |
| BLOG-02 | 10 | Sidebar fixed on desktop |
| BLOG-03 | 10 | Sidebar collapsible on mobile |
| SIDE-01 | 10 | Search input field (UI only) |
| SIDE-02 | 10 | Calendar widget |
| SIDE-03 | 10 | Tags cloud |
| SIDE-04 | 10 | Categories list |
| LIST-01 | 11 | Posts in grid/list format |
| LIST-02 | 11 | Post cards with title, excerpt, date, tags |
| LIST-03 | 11 | Max 4 posts per page |
| LIST-04 | 11 | Prev/next pagination |
| POST-01 | 12 | Single post full content |
| POST-02 | 12 | Post metadata display |
| POST-03 | 12 | 1 hardcoded example post |
| POST-04 | 12 | Social sharing buttons |

**Coverage:** 17/17 requirements mapped (100%)

---
*Roadmap created: 2026-01-20*
