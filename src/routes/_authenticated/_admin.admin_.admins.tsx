import { createFileRoute } from '@tanstack/react-router';
import { AdminTeam } from '@/components/admin/AdminTeam';
import { adminHead } from '@/components/admin/AdminShell';
export const Route=createFileRoute('/_authenticated/_admin/admin_/admins')({head:()=>adminHead('Admins'),component:()=><AdminTeam/>});
