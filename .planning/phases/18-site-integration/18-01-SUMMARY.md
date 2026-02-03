---
phase: 18-site-integration
plan: 01
subsystem: infra
tags: [tanstack-query, dompurify, supabase-js, react, vite]

# Dependency graph
requires:
  - phase: 17-timeline-tech-crud
    provides: Database schema with all content tables ready
  - phase: 13-admin-foundation
    provides: Shared package with Database types
provides:
  - TanStack Query infrastructure for server state management
  - DOMPurify sanitization for safe HTML rendering
  - Typed Supabase client for web app database access
  - Data fetching foundation for all web app components
affects: [19-*, web-components, blog-integration, portfolio-integration]

# Tech tracking
tech-stack:
  added:
    - @tanstack/react-query ^5.90.20
    - dompurify ^3.3.1
    - @types/dompurify ^3.2.0
    - @supabase/supabase-js ^2.94.0
  patterns:
    - QueryClientProvider at app root with locked config
    - 5-minute staleTime for optimal cache/freshness balance
    - 2 retries with exponential backoff for network resilience
    - Centralized Supabase client with env validation
    - HTML sanitization utility with whitelist approach

key-files:
  created:
    - apps/web/src/lib/supabase.ts
    - apps/web/src/lib/sanitize.ts
  modified:
    - apps/web/package.json
    - apps/web/src/main.tsx

key-decisions:
  - "Use TanStack Query v5 for server state management"
  - "5-minute staleTime and 2 retries (locked from CONTEXT.md)"
  - "DOMPurify with img/iframe whitelisted for blog content"
  - "Supabase client typed with Database from @alvarocortes/shared"

patterns-established:
  - "QueryClient config: staleTime 5min, gcTime 30min, retry 2, exponential backoff"
  - "Utility files in apps/web/src/lib/ directory"
  - "sanitizeHtml function for rich text content rendering"
  - "Supabase client pattern: env validation + typed createClient"

# Metrics
duration: 2min
completed: 2026-02-03
---

# Phase 18 Plan 01: Data Fetching Infrastructure Summary

**TanStack Query v5 with 5-minute staleTime, DOMPurify sanitization, and typed Supabase client ready for web app component integration**

## Performance

- **Duration:** 2 min 14 sec
- **Started:** 2026-02-03T18:45:46Z
- **Completed:** 2026-02-03T18:48:01Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments
- Installed TanStack Query v5 and DOMPurify for data fetching and sanitization
- Configured QueryClientProvider with locked settings (5min staleTime, 2 retries, exponential backoff)
- Created typed Supabase client with environment validation
- Created sanitizeHtml utility with img/iframe whitelisted for blog content
- Web app build succeeds with all new dependencies

## Task Commits

Each task was committed atomically:

1. **Task 1: Install data fetching dependencies** - `a73e27e` (chore)
2. **Task 2: Configure QueryClientProvider in main.tsx** - `08c5ee9` (feat)
3. **Task 3: Create Supabase client and sanitization utilities** - `fdd978f` (feat)
4. **Deviation fix: Add missing @supabase/supabase-js dependency** - `6b46358` (fix)

## Files Created/Modified
- `apps/web/package.json` - Added @tanstack/react-query, dompurify, @types/dompurify, @supabase/supabase-js
- `apps/web/src/main.tsx` - Wrapped app with QueryClientProvider, configured with locked settings
- `apps/web/src/lib/supabase.ts` - Exported typed Supabase client with env validation
- `apps/web/src/lib/sanitize.ts` - Exported sanitizeHtml function with DOMPurify configuration
- `bun.lock` - Updated with new dependencies

## Decisions Made

**1. TanStack Query configuration locked per CONTEXT.md**
- staleTime: 5 minutes (balance between freshness and performance)
- gcTime: 30 minutes (extended garbage collection)
- retry: 2 (network resilience without excessive delays)
- retryDelay: exponential backoff capped at 30 seconds

**2. DOMPurify whitelist approach**
- Allowed img and iframe tags for blog content embedding
- Allowed ARIA attributes for accessibility
- Disabled data attributes for security
- Whitelisted safe HTML tags and attributes only

**3. Supabase client pattern**
- Environment variable validation on initialization
- Typed with Database from @alvarocortes/shared
- Single exported client instance for entire app

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added missing @supabase/supabase-js dependency**
- **Found during:** Task 3 verification (build check)
- **Issue:** Build failed with "Cannot find module '@supabase/supabase-js'" error
- **Fix:** Installed @supabase/supabase-js ^2.94.0 via bun
- **Files modified:** apps/web/package.json, bun.lock
- **Verification:** Build succeeds after installation
- **Committed in:** `6b46358` (separate fix commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential dependency for Supabase client to function. No scope creep.

## Issues Encountered

None - all tasks completed as planned after fixing missing dependency.

## User Setup Required

None - no external service configuration required. Environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) will be needed when deploying web app, but are already configured in admin app and can be copied.

## Next Phase Readiness

**Ready for component integration:**
- QueryClientProvider wraps app - components can use useQuery/useMutation
- sanitizeHtml ready for blog post content rendering
- Supabase client available for data fetching
- All builds pass successfully

**Next steps:**
- Integrate blog data fetching in web app (replace static data)
- Integrate portfolio/projects data fetching
- Integrate timeline data fetching
- Connect all pages to Supabase via TanStack Query

**No blockers.** Web app infrastructure ready for Phase 18 Plan 02+.

---
*Phase: 18-site-integration*
*Completed: 2026-02-03*
