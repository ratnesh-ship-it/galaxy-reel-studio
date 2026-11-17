import { createFileRoute, redirect } from '@tanstack/react-router';
import { AdminShell, adminHead } from '@/components/admin/AdminShell';
import { adminUser } from '@/lib/admin';
import { supabase } from '@/integrations/supabase/client';
export const Route=createFileRoute('/_authenticated/_admin')({head:()=>adminHead('Team workspace'),beforeLoad:async()=>{if(!await adminUser()){await supabase.auth.signOut();throw redirect({to:'/admin'});}},component:AdminShell});
