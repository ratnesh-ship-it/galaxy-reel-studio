import { createFileRoute } from '@tanstack/react-router';
import { AdminDetail } from '@/components/admin/AdminDetail';
import { adminHead } from '@/components/admin/AdminShell';
export const Route=createFileRoute('/_authenticated/admin_/brands_/$id')({head:()=>adminHead('Brands detail'),component:Detail});
function Detail(){const {id}=Route.useParams();return <AdminDetail table="brand_registrations" id={id}/>;}
