# Phase 01-03: User Setup Required

**Generated:** 2026-01-16
**Phase:** 01-monorepo-foundation
**Status:** Incomplete

Complete these items for the Supabase integration to function. Claude automated everything possible; these items require human access to external dashboards/accounts.

## Environment Variables

| Status | Variable | Source | Add to |
|--------|----------|--------|--------|
| [ ] | `SUPABASE_URL` | Supabase Dashboard -> Settings -> API -> Project URL | `.env.local` |
| [ ] | `SUPABASE_ANON_KEY` | Supabase Dashboard -> Settings -> API -> anon public key | `.env.local` |
| [ ] | `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard -> Settings -> API -> service_role key (keep secret!) | `.env.local` |

## Account Setup

- [ ] **Create Supabase project**
  - URL: https://supabase.com/dashboard/new
  - Choose a project name (e.g., 'alvarocortes-portfolio')
  - Select a region close to you
  - Set a database password (save this somewhere secure)
  - Skip if: Already have a Supabase project for this app

## Local Development Setup

After creating your Supabase project:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open Supabase Dashboard -> Settings -> API

3. Copy the values into `.env.local`:
   - **Project URL** -> `SUPABASE_URL`
   - **anon public** key -> `SUPABASE_ANON_KEY`
   - **service_role** key -> `SUPABASE_SERVICE_ROLE_KEY`

4. For frontend access (optional, same values):
   - `VITE_SUPABASE_URL` = same as `SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY` = same as `SUPABASE_ANON_KEY`

**Important:** Never commit `.env.local` to git. It's already in `.gitignore`.

## Verification

After completing setup, verify with:

```bash
# Start the API server
cd packages/api && bun dev

# In another terminal, test the health endpoint
curl http://localhost:3000/health
```

Expected results:
- Server starts without "Missing Supabase environment variables" error
- Health endpoint returns: `{"status":"ok","timestamp":"...","service":"alvarocortes-api"}`

## Notes

- The health endpoint works without Supabase credentials (for basic connectivity testing)
- Supabase client will only be created when actually needed (lazy initialization)
- Service role key should NEVER be exposed to the frontend

---

**Once all items complete:** Mark status as "Complete" at top of file.
