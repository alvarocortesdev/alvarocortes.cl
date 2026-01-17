import { createClient, SupabaseClient } from "@supabase/supabase-js"

// Type for database schema (will be generated from Supabase later)
export type Database = Record<string, unknown>

/**
 * Create Supabase client for public operations (uses anon key)
 * Use this for unauthenticated/public data fetching
 */
export function createSupabaseClient(): SupabaseClient<Database> {
  const url = process.env.SUPABASE_URL
  const anonKey = process.env.SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables. See .env.example for required variables."
    )
  }

  return createClient<Database>(url, anonKey)
}

/**
 * Create Supabase admin client for privileged operations (uses service role key)
 * Use this ONLY for admin operations that bypass RLS
 * NEVER expose this client to the frontend
 */
export function createSupabaseAdmin(): SupabaseClient<Database> {
  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase admin environment variables. See .env.example for required variables."
    )
  }

  return createClient<Database>(url, serviceRoleKey)
}
