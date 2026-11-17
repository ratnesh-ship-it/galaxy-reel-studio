import { createFileRoute } from '@tanstack/react-router';
import { AdminReset } from '@/components/admin/AdminLogin';
import { adminHead } from '@/components/admin/AdminShell';
export const Route=createFileRoute('/admin_/reset-password')({head:()=>adminHead('Set password'),component:AdminReset});
