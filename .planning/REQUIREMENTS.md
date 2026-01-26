# Requirements: Alvaro Cortes Portfolio

**Defined:** 2026-01-26
**Core Value:** El sitio debe sentirse fluido, profesional y demostrar dominio técnico

## v1.3 Requirements

Requirements for Admin Panel release. Each maps to roadmap phases.

### Infrastructure

- [ ] **INFRA-01**: Admin app exists as separate workspace (apps/admin)
- [ ] **INFRA-02**: Admin deployed to admin.alvarocortes.cl subdomain
- [ ] **INFRA-03**: Database schema created for posts, projects, timeline, tech_stacks

### Authentication

- [ ] **AUTH-01**: Admin can login with GitHub OAuth
- [ ] **AUTH-02**: Session persists across browser refresh
- [ ] **AUTH-03**: Admin can logout
- [ ] **AUTH-04**: Only owner (single user) can access admin
- [ ] **AUTH-05**: Unauthenticated users redirected to login

### Blog Posts

- [ ] **BLOG-01**: Admin can create blog post (title, slug, content, excerpt)
- [ ] **BLOG-02**: Admin can view list of all posts
- [ ] **BLOG-03**: Admin can edit existing post
- [ ] **BLOG-04**: Admin can delete post
- [ ] **BLOG-05**: Admin can publish/unpublish post
- [ ] **BLOG-06**: Rich text editor for post content
- [ ] **BLOG-07**: Admin can upload images for post
- [ ] **BLOG-08**: Admin can assign tags to post
- [ ] **BLOG-09**: Admin can assign category to post

### Projects

- [ ] **PROJ-01**: Admin can create project (title, description, tech stack, links)
- [ ] **PROJ-02**: Admin can view list of all projects
- [ ] **PROJ-03**: Admin can edit existing project
- [ ] **PROJ-04**: Admin can delete project
- [ ] **PROJ-05**: Admin can upload thumbnail image for project
- [ ] **PROJ-06**: Admin can mark project as featured

### Timeline

- [ ] **TIME-01**: Admin can create timeline entry (date, title, description)
- [ ] **TIME-02**: Admin can view list of all timeline entries
- [ ] **TIME-03**: Admin can edit existing entry
- [ ] **TIME-04**: Admin can delete entry
- [ ] **TIME-05**: Admin can select entry type (Work/Studies)

### Tech Stacks

- [ ] **TECH-01**: Admin can create tech category (name, technologies)
- [ ] **TECH-02**: Admin can view list of all categories
- [ ] **TECH-03**: Admin can edit existing category
- [ ] **TECH-04**: Admin can delete category
- [ ] **TECH-05**: Admin can add/remove technologies with icons

### Site Integration

- [ ] **SITE-01**: Main site fetches blog posts from Supabase
- [ ] **SITE-02**: Main site fetches projects from Supabase
- [ ] **SITE-03**: Main site fetches timeline from Supabase
- [ ] **SITE-04**: Main site fetches tech stacks from Supabase
- [ ] **SITE-05**: Blog content sanitized before rendering

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content

- **CONT-01**: Post scheduling (publish at future date)
- **CONT-02**: Post versioning/drafts
- **CONT-03**: Bulk operations (delete multiple)

### Media

- **MEDIA-01**: Media library for reusing images
- **MEDIA-02**: Image optimization/resizing

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Multiple admin users | Solo project, owner only |
| Comments management | Blog has no comments |
| Analytics dashboard | Use Vercel Analytics |
| i18n in admin | Admin is personal, Spanish only |

## Traceability

Which phases cover which requirements. Updated by create-roadmap.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | 13 | Pending |
| INFRA-02 | 13 | Pending |
| INFRA-03 | 13 | Pending |
| AUTH-01 | 14 | Pending |
| AUTH-02 | 14 | Pending |
| AUTH-03 | 14 | Pending |
| AUTH-04 | 14 | Pending |
| AUTH-05 | 14 | Pending |
| BLOG-01 | 15 | Pending |
| BLOG-02 | 15 | Pending |
| BLOG-03 | 15 | Pending |
| BLOG-04 | 15 | Pending |
| BLOG-05 | 15 | Pending |
| BLOG-06 | 15 | Pending |
| BLOG-07 | 15 | Pending |
| BLOG-08 | 15 | Pending |
| BLOG-09 | 15 | Pending |
| PROJ-01 | 16 | Pending |
| PROJ-02 | 16 | Pending |
| PROJ-03 | 16 | Pending |
| PROJ-04 | 16 | Pending |
| PROJ-05 | 16 | Pending |
| PROJ-06 | 16 | Pending |
| TIME-01 | 17 | Pending |
| TIME-02 | 17 | Pending |
| TIME-03 | 17 | Pending |
| TIME-04 | 17 | Pending |
| TIME-05 | 17 | Pending |
| TECH-01 | 17 | Pending |
| TECH-02 | 17 | Pending |
| TECH-03 | 17 | Pending |
| TECH-04 | 17 | Pending |
| TECH-05 | 17 | Pending |
| SITE-01 | 18 | Pending |
| SITE-02 | 18 | Pending |
| SITE-03 | 18 | Pending |
| SITE-04 | 18 | Pending |
| SITE-05 | 18 | Pending |

**Coverage:**
- v1.3 requirements: 38 total
- Mapped to phases: 38 ✓
- Unmapped: 0

---
*Requirements defined: 2026-01-26*
*Last updated: 2026-01-26 — phases mapped by create-roadmap*
