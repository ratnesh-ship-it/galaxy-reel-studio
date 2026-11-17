import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
export const manageAdmin = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator((input: unknown) => z.discriminatedUnion('action', [z.object({ action: z.literal('invite'), email: z.string().email(), origin: z.string().url() }),z.object({ action: z.literal('remove'), userId: z.string().uuid() })]).parse(input)).handler(async ({ data, context }) => {
 const { data: allowed, error: roleError } = await context.supabase.rpc('is_admin');
 if(roleError || !allowed) throw new Error('Access denied');
 const { data: caller, error: callerError } = await context.supabase.from('admin_users').select('email').eq('user_id', context.userId).single();
 if(callerError || !caller) throw new Error('Access denied');
 const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
 if(data.action==='remove') {
  if(data.userId===context.userId) throw new Error('You cannot remove yourself');
  const { error } = await supabaseAdmin.from('admin_users').delete().eq('user_id',data.userId); if(error) throw error;
  const { error: auditError } = await context.supabase.from('admin_activity').insert({admin_email:caller.email,action:'remove admin',target_type:'admin_users',target_id:data.userId}); if(auditError) throw auditError;
  return { message:'Admin access removed' };
 }
 const { getRequest } = await import('@tanstack/react-start/server');
 const requestOrigin = new URL(getRequest().url).origin;
 if(new URL(data.origin).origin!==requestOrigin) throw new Error('Invalid invitation destination');
 const { data: invited,error }=await supabaseAdmin.auth.admin.inviteUserByEmail(data.email,{redirectTo:`${data.origin}/admin/reset-password`});
 if(error || !invited.user) throw new Error(error?.message ?? 'Invitation failed');
 const {error: memberError}=await supabaseAdmin.from('admin_users').insert({user_id:invited.user.id,email:data.email.toLowerCase()});
 if(memberError) { await supabaseAdmin.auth.admin.deleteUser(invited.user.id); throw memberError; }
 const {error: auditError}=await context.supabase.from('admin_activity').insert({admin_email:caller.email,action:'invite admin',target_type:'admin_users',target_id:invited.user.id}); if(auditError) throw auditError;
 return {message:'Invitation sent'};
});
