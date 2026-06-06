import { createClient } from '@supabase/supabase-js'

export function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  )
}

// Lazy singletons
let _supabase: ReturnType<typeof getSupabase> | null = null
let _admin: ReturnType<typeof getSupabaseAdmin> | null = null

export const supabase = new Proxy({} as ReturnType<typeof getSupabase>, {
  get(_, prop) { return (_supabase ??= getSupabase())[prop as any] }
})

export const supabaseAdmin = new Proxy({} as ReturnType<typeof getSupabaseAdmin>, {
  get(_, prop) { return (_admin ??= getSupabaseAdmin())[prop as any] }
})
