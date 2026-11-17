import type { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { AdminRow, AdminTable } from '@/lib/admin';
import { getAvatar } from '@/data/avatars';

export const fieldLabels: Record<string, string> = {
  public_id: 'ID', avatar_slug: 'Avatar', full_name: 'Real name', email: 'Email',
  business_email: 'Email', phone: 'Phone / WhatsApp', location: 'City', speciality: 'Speciality',
  experience: 'Experience', created_at: 'Joined', is_visible: 'Status', company: 'Brand',
  contact_person: 'Contact person', website: 'Website', industry: 'Industry',
  create_types: 'Content types', budget: 'Budget', brand_name: 'Brand',
  creator_public_id: 'Requested creator', project_details: 'Project details', status: 'Status',
  tools: 'Tools', portfolio_url: 'Portfolio link', mission_code: 'Mission code', source_page: 'Source',
  utm_params: 'Campaign attribution', avatar_url: 'Profile photo', creator_number: 'Creator number', id: 'Record reference',
};
export function displayText(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—';
  if (Array.isArray(value)) return value.length ? value.map(displayText).join(', ') : '—';
  if (value === true) return 'Visible';
  if (value === false) return 'Hidden';
  if (typeof value === 'object') return Object.entries(value).map(([key, item]) => `${friendlyLabel(key)}: ${displayText(item)}`).join(' · ') || '—';
  return String(value);
}
export function friendlyLabel(key: string) {
  return fieldLabels[key] ?? key.replace(/^utm_/, '').replaceAll('_', ' ').replace(/^./, c => c.toUpperCase());
}
export function joinedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const parts = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).formatToParts(date);
  const part = (type: string) => parts.find(p => p.type === type)?.value ?? '';
  return `${part('day')} ${part('month')} ${part('year')}, ${part('hour')}:${part('minute')} ${part('dayPeriod').toUpperCase()}`;
}
export function Truncated({ value, children }: { value: unknown; children?: ReactNode }) {
  const full = displayText(value);
  return <TooltipProvider delayDuration={300}><Tooltip><TooltipTrigger asChild><span tabIndex={full === '—' ? undefined : 0} className="admin-truncate" title={full}>{children ?? full}</span></TooltipTrigger><TooltipContent className="admin-tooltip">{full}</TooltipContent></Tooltip></TooltipProvider>;
}
export function StatusPill({ value }: { value: unknown }) {
  const label = displayText(value);
  const tone = label === 'Visible' || label === 'New' ? 'teal' : label === 'Contacted' ? 'blue' : label === 'In Progress' ? 'amber' : 'grey';
  return <span className={`admin-status admin-status-${tone}`}><span aria-hidden="true" />{label}</span>;
}
export function recordIdentity(table: AdminTable, row: AdminRow) {
  return table === 'creator_registrations' ? `${getAvatar(String(row['avatar_slug'])).name} · ${displayText(row['public_id'])}` : displayText(row['company'] ?? row['brand_name']);
}
export function confirmationId(row: AdminRow) {
  return String(row['public_id'] ?? row.id);
}