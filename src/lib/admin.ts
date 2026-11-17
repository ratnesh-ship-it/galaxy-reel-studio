import { supabase } from '@/integrations/supabase/client';
export const ADMIN_IDLE_MS = 30 * 60 * 1000;
export const ADMIN_PAGE_SIZE = 25;
export const hireStatuses = ['New', 'Contacted', 'In Progress', 'Closed'] as const;
export type AdminTable = 'creator_registrations' | 'brand_registrations' | 'hire_requests';
export type AdminRow = Record<string, unknown> & { id: string; created_at: string };
export function deletionConfirmed(ids: string[], typed: string) { return ids.length > 0 && typed.trim() === ids.join(', '); }
export function idleExpired(last: number, now: number) { return now - last >= ADMIN_IDLE_MS; }
export function csvValue(value: unknown) { let text = Array.isArray(value) ? value.join(' | ') : typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value ?? ''); if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`; return `"${text.replace(/"/g, '""')}"`; }
export function csvRows(rows: AdminRow[]) { if (!rows.length) return ''; const keys = Object.keys(rows[0] ?? {}); return [keys.map(csvValue).join(','), ...rows.map(row => keys.map(k => csvValue(row[k])).join(','))].join('\r\n'); }
// Admin check is cached per signed-in user so every page click doesn't wait for several slow
// network round trips. The database itself still enforces admin-only access on every request.
let adminCache: { userId: string; ok: boolean; at: number } | null = null;
const ADMIN_CACHE_MS = 5 * 60 * 1000;
export function clearAdminCache() { adminCache = null; }
export async function adminUser() {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) { adminCache = null; return null; }
  if (adminCache && adminCache.userId === user.id && Date.now() - adminCache.at < ADMIN_CACHE_MS) return adminCache.ok ? user : null;
  const { data, error } = await supabase.rpc('is_admin');
  const ok = !error && !!data;
  adminCache = { userId: user.id, ok, at: Date.now() };
  return ok ? user : null;
}
export async function logActivity(action: string, target_type: string, details: Record<string, string | number> = {}) { const user = await adminUser(); if (!user?.email) throw new Error('Access denied'); const { error } = await supabase.from('admin_activity').insert({ admin_email: user.email, action, target_type, details }); if (error) throw error; }
export async function loadAdminRows(table: AdminTable): Promise<AdminRow[]> { const rows: AdminRow[] = []; for (let start=0; ; start+=1000) { const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false }).range(start,start+999); if(error) throw error; rows.push(...data as AdminRow[]); if(data.length<1000) break; } return rows; }
