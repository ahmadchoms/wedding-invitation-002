import { createClient } from "@supabase/supabase-js";

// Ambil Environment Variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Pengecekan Ketersediaan Variable
 * Menggunakan URL dummy sebagai fallback agar `createClient` tidak melempar
 * runtime error saat .env.local belum diisi.
 */
const isConfigured = Boolean(supabaseUrl && supabaseKey);

const fallbackUrl = "https://placeholder-project.supabase.co";
const fallbackKey = "placeholder-anon-key";


// Inisialisasi Supabase Client
export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseKey || fallbackKey
);

/**
 * Export flag penanda konfigurasi (opsional)
 * Bisa dipakai untuk conditional logic di komponen jika diperlukan.
 */
export const isSupabaseReady = isConfigured;