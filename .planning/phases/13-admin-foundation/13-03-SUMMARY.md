# Plan 13-03 Summary: Vercel Subdomain Deployment

## Result: SUCCESS

## What Was Built

Deployed admin app to admin.alvarocortes.cl as a separate Vercel project.

## Files Created

| File | Purpose |
|------|---------|
| apps/admin/vercel.json | Vercel deployment config with SPA routing |

## Deployment Configuration

```json
{
  "framework": "vite",
  "buildCommand": "cd ../.. && bun run build --filter=@alvarocortes/admin",
  "outputDirectory": "dist",
  "installCommand": "cd ../.. && bun install",
  "rewrites": [
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ]
}
```

## Verification

- https://admin.alvarocortes.cl returns HTTP 200
- HTTPS certificate valid
- SPA routing works (refresh on any route serves index.html)

## Infrastructure Setup

| Component | Configuration |
|-----------|--------------|
| Vercel Project | Root Directory: apps/admin |
| Domain | admin.alvarocortes.cl |
| DNS | CNAME: admin -> cname.vercel-dns.com |
| Auto-deploy | On push to main branch |

## Next Steps

Phase 14 will add environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) for authentication.
