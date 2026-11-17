import { createFileRoute } from '@tanstack/react-router';
import { AdminRecords } from '@/components/admin/AdminRecords';
import { adminHead } from '@/components/admin/AdminShell';
export const Route=createFileRoute('/_authenticated/admin_/hire-requests')({head:()=>adminHead('Hire Requests'),component:()=><AdminRecords table="hire_requests"/>});
