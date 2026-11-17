import { queryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
export const publicCreatorFields = 'public_id,creator_number,avatar_slug,avatar_name,avatar_category,city_country,primary_speciality,ai_tools,experience_level,portfolio_link,created_at' as const;
export type PublicCreator = { public_id:string; creator_number:number; avatar_slug:string; avatar_name:string; avatar_category:string; city_country:string|null; primary_speciality:string|null; ai_tools:string[]; experience_level:string|null; portfolio_link:string|null; created_at:string };
export const creatorsQuery = queryOptions({ queryKey:['public-creators'], refetchInterval:15000, refetchOnWindowFocus:true, queryFn:async():Promise<PublicCreator[]> => {
 const isServer = typeof window === 'undefined';
 try {
  const {data,error}=await supabase.from('public_creators').select(publicCreatorFields).order('creator_number');
  if(error) throw error;
  return data ?? [];
 } catch (err) {
  // Some hosts (e.g. Vercel) can't reach the backend from the server. Never crash the page:
  // render with an empty list on the server and let the browser load the real creators on mount.
  if (isServer) { console.error('[JOMOVERSE] Creators could not load during server render; the browser will retry.', err); return []; }
  throw new Error('The creators could not load. Please try again.');
 }
}});
export function safePortfolio(value:string|null) {
 if(!value) return null;
 if(/^https?:\/\//i.test(value)) { try { const url=new URL(value); return url.hostname?value:null; } catch{return null;} }
 if(value.startsWith('@')) return `https://instagram.com/${value.slice(1)}`;
 if(value.includes('.')&&!/[\s:]/.test(value)) { try {const url=new URL(`https://${value}`); return url.hostname?`https://${value}`:null;}catch{return null;} }
 return null;
}
export function portfolioEmbed(value:string|null) { const safe=safePortfolio(value); if(!safe)return null; const u=new URL(safe); let id:string|null=null;
 if(['youtube.com','www.youtube.com'].includes(u.hostname)) id=u.searchParams.get('v') ?? (u.pathname.startsWith('/shorts/')?u.pathname.split('/')[2]??null:null);
 if(u.hostname==='youtu.be') id=u.pathname.slice(1);
 if(id&&/^[\w-]{11}$/.test(id))return `https://www.youtube-nocookie.com/embed/${id}`;
 if(['vimeo.com','www.vimeo.com'].includes(u.hostname)&&/^\/\d+$/.test(u.pathname))return `https://player.vimeo.com/video${u.pathname}`;
 return null;
}
export function latestCreators(creators:PublicCreator[]) { return [...creators].sort((a,b)=>b.creator_number-a.creator_number).slice(0,8); }
