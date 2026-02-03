---
phase: 18-site-integration
plan: 02
subsystem: web-frontend
tags: [tanstack-query, react-hooks, typescript, supabase]

# Dependency graph
requires:
  - phase: 18-site-integration
    plan: 01
    provides: TanStack Query infrastructure and Supabase client
  - phase: 17-timeline-tech-crud
    provides: Database schema with all content tables
provides:
  - Custom React Query hooks for all content types
  - Type-safe data fetching with loading/error states
  - Automatic caching and retry logic via TanStack Query
  - Published content filtering at query level
affects: [18-03-blog-integration, 18-04-portfolio-integration, web-components]

# Tech tracking
tech-stack:
  patterns:
    - Custom React Query hooks per content type
    - Published content filtered at database query level
    - Client-side joins for nested data (tech categories + technologies)
    - Enabled guards for conditional queries (single post by slug)
    - Typed interfaces matching database Row types

key-files:
  created:
    - apps/web/src/hooks/usePosts.ts
    - apps/web/src/hooks/usePost.ts
    - apps/web/src/hooks/useProjects.ts
    - apps/web/src/hooks/useTimelines.ts
    - apps/web/src/hooks/useTechCategories.ts

key-decisions:
  - "One hook per content type pattern for separation of concerns"
  - "Published posts filtering at database level for security"
  - "Client-side join for tech categories (simpler than Supabase join syntax)"
  - "Enabled guard on usePost prevents unnecessary queries on empty slug"

patterns-established:
  - "React Query hook exports: interface for data type + query function"
  - "Published content filter: .eq('status', 'published')"
  - "Display order sorting: .order('display_order', { ascending: true })"
  - "Slug-based single item fetch with enabled guard"
  - "Client-side filtering for parent-child relationships"

# Metrics
duration: 2min
completed: 2026-02-03
---

# Phase 18 Plan 02: Content Query Hooks Summary

**Five typed React Query hooks providing cached, auto-retrying data fetching for all content types (posts, projects, timelines, tech categories)**

## Performance

- **Duration:** 2 min 9 sec
- **Started:** 2026-02-03T18:51:03Z
- **Completed:** 2026-02-03T18:53:14Z
- **Tasks:** 2
- **Files created:** 5
- **Commits:** 3 (2 tasks + 1 bug fix)

## Accomplishments

- Created usePosts.ts hook for blog listing (published posts ordered by date)
- Created usePost.ts hook for single post by slug with enabled guard
- Created useProjects.ts hook for projects ordered by display_order
- Created useTimelines.ts hook for timeline entries ordered by display_order
- Created useTechCategories.ts hook with client-side join of categories and technologies
- Fixed type mismatches between hook interfaces and database schema
- All hooks return useQuery results with data, isLoading, and error states
- TypeScript compiles successfully

## Task Commits

Each task was committed atomically:

1. **Task 1: Create blog post query hooks** - `55a3313` (feat)
   - usePosts.ts: Published posts ordered by published_at descending
   - usePost.ts: Single post by slug with enabled guard

2. **Task 2: Create portfolio query hooks** - `2dd5954` (feat)
   - useProjects.ts: Projects ordered by display_order
   - useTimelines.ts: Timeline entries ordered by display_order
   - useTechCategories.ts: Categories with nested technologies (client-side join)

3. **Deviation: Align hook interfaces with database schema** - `5967092` (fix)

## Files Created

All in `apps/web/src/hooks/`:

- **usePosts.ts** - Fetches published posts ordered by published_at (descending)
- **usePost.ts** - Fetches single post by slug with published filter and enabled guard
- **useProjects.ts** - Fetches all projects ordered by display_order (ascending)
- **useTimelines.ts** - Fetches timeline_entries ordered by display_order (ascending)
- **useTechCategories.ts** - Fetches tech_categories and joins technologies client-side

## Decisions Made

**1. Published content filtering at query level**
- usePosts and usePost both filter `.eq('status', 'published')` for security
- Web app never receives draft/archived content from database
- Prevents accidental exposure of unpublished content

**2. Client-side join for tech categories**
- Fetches categories and technologies in separate queries
- Joins data with `filter()` on category_id
- Simpler than Supabase nested select syntax
- Acceptable for small datasets (tech stack is typically <50 items)

**3. Enabled guard on usePost**
- `enabled: !!slug` prevents query when slug is empty/undefined
- Avoids unnecessary API calls during component mounting
- Common pattern for parameterized queries

**4. Interface definitions in hook files**
- Each hook exports its data interface (Post, Project, etc.)
- Matches database Row types from shared package
- Allows components to import types alongside hooks

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed type mismatches with database schema**

- **Found during:** TypeScript verification after Task 2
- **Issue:** Hook interfaces didn't match actual database Row types
  - Projects: Used `thumbnail_url` instead of `image_url`, missing `details` and `updated_at`
  - Technologies: Filter used `tech_category_id` instead of `category_id`
  - Posts: Missing `author`, `publish_at`, and `updated_at` fields
  - TimelineEntry: Missing `updated_at` field
  - TechCategory: Missing `created_at` and `updated_at` fields
  - Technology: Missing `category_id`, `created_at`, `updated_at` fields
- **Fix:** Updated all interfaces to match database.types.ts Row types exactly
- **Files modified:** All 5 hook files
- **Verification:** TypeScript compiles without errors
- **Committed in:** `5967092` (separate fix commit)

---

**Total deviations:** 1 auto-fixed (1 bug - type mismatch)
**Impact on plan:** Essential for type safety and runtime correctness. No scope creep.

## Issues Encountered

None - all tasks completed as planned after fixing type mismatches.

## Next Phase Readiness

**Ready for component integration:**
- All 5 query hooks created and type-safe
- Hooks encapsulate Supabase data fetching logic
- Published content filtering ensures security
- Loading and error states ready for UI feedback
- TypeScript compilation passes

**Next steps:**
- Replace static blog data with usePosts/usePost in BlogListing and PostDetail
- Replace static portfolio data with useProjects in ProjectsBento
- Replace static timeline data with useTimelines in Timeline component
- Replace static tech data with useTechCategories in TechStacks component

**No blockers.** Component integration can begin immediately.

---
*Phase: 18-site-integration*
*Completed: 2026-02-03*
