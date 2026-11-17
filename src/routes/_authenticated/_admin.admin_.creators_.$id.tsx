import { createFileRoute } from '@tanstack/react-router';
import { AdminDetail } from '@/components/admin/AdminDetail';
import { adminHead } from '@/components/admin/AdminShell';
export const Route=createFileRoute('/_authenticated/_admin/admin_/creators_/$id')({head:()=>adminHead('Creators detail'),component:Detail});
function Detail(){const {id}=Route.useParams();return <AdminDetail table="creator_registrations" id={id}/>;}
