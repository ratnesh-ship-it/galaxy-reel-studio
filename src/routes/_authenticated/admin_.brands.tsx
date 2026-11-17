import { createFileRoute } from '@tanstack/react-router';
import { AdminRecords } from '@/components/admin/AdminRecords';
import { adminHead } from '@/components/admin/AdminShell';
export const Route=createFileRoute('/_authenticated/admin_/brands')({head:()=>adminHead('Brands'),component:()=><AdminRecords table="brand_registrations"/>});
