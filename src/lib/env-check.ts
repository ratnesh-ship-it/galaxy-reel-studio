// Logs a clear message naming any missing setting so a host without them never fails silently.
const REQUIRED_SERVER = ['SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY'] as const;
const REQUIRED_CLIENT = {
  VITE_SUPABASE_URL: import.meta.env['VITE_SUPABASE_URL'],
  VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'],
} as const;
let checked = false;
export function checkServerEnv() {
  if (checked) return;
  checked = true;
  for (const [name, value] of Object.entries(REQUIRED_CLIENT)) {
    if (!value) console.error(`[JOMOVERSE] Missing environment variable ${name} (must be set at build time).`);
  }
  for (const name of REQUIRED_SERVER) {
    if (!process.env[name]) console.error(`[JOMOVERSE] Missing environment variable ${name} (server runtime).`);
  }
}
