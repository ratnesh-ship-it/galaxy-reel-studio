import { createFileRoute } from '@tanstack/react-router';
import { AdminRecords } from '@/components/admin/AdminRecords';
import { adminHead } from '@/components/admin/AdminShell';
export const Route=createFileRoute('/_authenticated/_admin/admin_/creators')({head:()=>adminHead('Creators'),component:()=><AdminRecords table="creator_registrations"/>});
