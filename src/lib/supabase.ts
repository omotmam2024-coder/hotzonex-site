import { createClient } from "@supabase/supabase-js";

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

  return {
    url,
    anonKey,
    configured: Boolean(url && anonKey),
  };
}

export function getSupabaseBrowserClient() {
  const { url, anonKey, configured } = getSupabaseConfig();

  if (!configured) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getSupabaseServerClient() {
  const { url, anonKey, configured } = getSupabaseConfig();

  if (!configured) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
