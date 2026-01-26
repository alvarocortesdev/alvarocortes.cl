# Roadmap: v1.3 Admin Panel

**Created:** 2026-01-26
**Milestone:** v1.3 Admin Panel
**Phases:** 6 (13-18)
**Requirements:** 38

## Overview

Full CMS admin panel at admin.alvarocortes.cl with GitHub OAuth authentication, managing blog posts, projects, timeline entries, and tech stacks. Main site integrates with Supabase for dynamic content.

## Phases

### Phase 13: Admin Foundation

**Goal:** Create admin app workspace with database schema and deployment infrastructure.

**Requirements:**
- INFRA-01: Admin app exists as separate workspace (apps/admin)
- INFRA-02: Admin deployed to admin.alvarocortes.cl subdomain
- INFRA-03: Database schema created for posts, projects, timeline, tech_stacks

**Success Criteria:**
- [ ] apps/admin workspace created with Vite + React + Tailwind
- [ ] Turborepo builds admin app alongside web app
- [ ] Vercel configured for admin.alvarocortes.cl subdomain
- [ ] Supabase tables created: posts, projects, timeline_entries, tech_stacks, tech_categories
- [ ] Database migrations committed and applied

**Research:** Likely needed — Vercel subdomain configuration, Supabase schema design patterns

**Dependencies:** None (first phase)

---

### Phase 14: Authentication

**Goal:** Implement GitHub OAuth login with session persistence for single admin user.

**Requirements:**
- AUTH-01: Admin can login with GitHub OAuth
- AUTH-02: Session persists across browser refresh
- AUTH-03: Admin can logout
- AUTH-04: Only owner (single user) can access admin
- AUTH-05: Unauthenticated users redirected to login

**Success Criteria:**
- [ ] Supabase Auth configured with GitHub provider
- [ ] Login page with GitHub OAuth button
- [ ] Session stored in localStorage/cookies
- [ ] Auth context provides user state to components
- [ ] Protected routes redirect to login when unauthenticated
- [ ] Owner validation (GitHub user ID or email whitelist)
- [ ] Logout clears session and redirects to login

**Research:** Likely needed — Supabase Auth with GitHub OAuth, session management patterns

**Dependencies:** Phase 13 (admin app must exist)

---

### Phase 15: Blog CRUD

**Goal:** Full blog post management with rich text editor and media support.

**Requirements:**
- BLOG-01: Admin can create blog post (title, slug, content, excerpt)
- BLOG-02: Admin can view list of all posts
- BLOG-03: Admin can edit existing post
- BLOG-04: Admin can delete post
- BLOG-05: Admin can publish/unpublish post
- BLOG-06: Rich text editor for post content
- BLOG-07: Admin can upload images for post
- BLOG-08: Admin can assign tags to post
- BLOG-09: Admin can assign category to post

**Success Criteria:**
- [ ] Posts list page with title, status, date columns
- [ ] Create post form with all required fields
- [ ] Rich text editor (TipTap or similar) for content
- [ ] Slug auto-generated from title (editable)
- [ ] Image upload to Supabase Storage
- [ ] Tags multi-select with create-new option
- [ ] Category single-select dropdown
- [ ] Publish/unpublish toggle
- [ ] Edit post loads existing data
- [ ] Delete post with confirmation dialog
- [ ] Form validation and error handling

**Research:** Likely needed — Rich text editor options (TipTap, Lexical, etc.), Supabase Storage for images

**Dependencies:** Phase 14 (authentication required)

---

### Phase 16: Projects CRUD

**Goal:** Portfolio project management with thumbnail uploads and featured marking.

**Requirements:**
- PROJ-01: Admin can create project (title, description, tech stack, links)
- PROJ-02: Admin can view list of all projects
- PROJ-03: Admin can edit existing project
- PROJ-04: Admin can delete project
- PROJ-05: Admin can upload thumbnail image for project
- PROJ-06: Admin can mark project as featured

**Success Criteria:**
- [ ] Projects list page with title, status columns
- [ ] Create project form with all fields
- [ ] Tech stack multi-select (from existing tech)
- [ ] Links fields (GitHub, live demo, etc.)
- [ ] Thumbnail upload to Supabase Storage
- [ ] Featured checkbox/toggle
- [ ] Edit project loads existing data
- [ ] Delete project with confirmation
- [ ] Form validation

**Research:** Unlikely — patterns established in Phase 15

**Dependencies:** Phase 15 (CRUD patterns established, storage configured)

---

### Phase 17: Timeline & Tech Stacks CRUD

**Goal:** Manage work/studies timeline and technology categories.

**Requirements:**
- TIME-01: Admin can create timeline entry (date, title, description)
- TIME-02: Admin can view list of all timeline entries
- TIME-03: Admin can edit existing entry
- TIME-04: Admin can delete entry
- TIME-05: Admin can select entry type (Work/Studies)
- TECH-01: Admin can create tech category (name, technologies)
- TECH-02: Admin can view list of all categories
- TECH-03: Admin can edit existing category
- TECH-04: Admin can delete category
- TECH-05: Admin can add/remove technologies with icons

**Success Criteria:**
- [ ] Timeline list page with date, title, type columns
- [ ] Create timeline form with date picker, type selector
- [ ] Work/Studies type toggle
- [ ] Edit/delete timeline entries
- [ ] Tech categories list page
- [ ] Create category with name field
- [ ] Add technologies to category (name + icon slug)
- [ ] Icon preview using simple-icons CDN
- [ ] Edit/delete categories and technologies

**Research:** Unlikely — CRUD patterns established

**Dependencies:** Phase 16 (CRUD patterns refined)

---

### Phase 18: Site Integration

**Goal:** Main site fetches all content from Supabase instead of hardcoded data.

**Requirements:**
- SITE-01: Main site fetches blog posts from Supabase
- SITE-02: Main site fetches projects from Supabase
- SITE-03: Main site fetches timeline from Supabase
- SITE-04: Main site fetches tech stacks from Supabase
- SITE-05: Blog content sanitized before rendering

**Success Criteria:**
- [ ] Supabase client configured in web app
- [ ] Blog page fetches posts from database
- [ ] Portfolio page fetches projects from database
- [ ] Timeline fetches entries from database
- [ ] Tech stacks fetch categories from database
- [ ] DOMPurify sanitizes HTML content
- [ ] Loading states while fetching
- [ ] Error handling for failed fetches
- [ ] Empty states when no data

**Research:** Likely needed — DOMPurify integration, React data fetching patterns (SWR/React Query vs useEffect)

**Dependencies:** Phase 17 (all admin CRUD complete, data in database)

---

## Phase Summary

| Phase | Name | Requirements | Research | Dependencies |
|-------|------|--------------|----------|--------------|
| 13 | Admin Foundation | 3 | Likely | None |
| 14 | Authentication | 5 | Likely | 13 |
| 15 | Blog CRUD | 9 | Likely | 14 |
| 16 | Projects CRUD | 6 | Unlikely | 15 |
| 17 | Timeline & Tech CRUD | 10 | Unlikely | 16 |
| 18 | Site Integration | 5 | Likely | 17 |

**Total:** 38 requirements across 6 phases

## Execution Order

Phases must execute sequentially:
1. **Phase 13** — Infrastructure first (can't build on nothing)
2. **Phase 14** — Auth before any protected features
3. **Phase 15** — Blog CRUD establishes patterns
4. **Phase 16** — Projects CRUD reuses patterns
5. **Phase 17** — Remaining entities
6. **Phase 18** — Integration last (needs all data)

No parallelization possible due to dependencies.

---
*Created: 2026-01-26 by /gsd:create-roadmap*
