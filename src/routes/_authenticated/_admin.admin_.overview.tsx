import { createFileRoute } from '@tanstack/react-router';
import { AdminOverview } from '@/components/admin/AdminOverview';
import { adminHead } from '@/components/admin/AdminShell';
export const Route=createFileRoute('/_authenticated/_admin/admin_/overview')({head:()=>adminHead('Overview'),component:()=><AdminOverview/>});
