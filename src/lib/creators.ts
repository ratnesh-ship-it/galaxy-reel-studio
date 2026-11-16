import { queryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
export const publicCreatorFields = 'public_id,creator_number,full_name,city_country,primary_speciality,ai_tools,experience_level,portfolio_link,avatar_url,created_at' as const;
export type PublicCreator = { public_id:string; creator_number:number; full_name:string; city_country:string|null; primary_speciality:string|null; ai_tools:string[]; experience_level:string|null; portfolio_link:string|null; avatar_url:string|null; created_at:string };
export const creatorsQuery = queryOptions({ queryKey:['public-creators'], refetchInterval:15000, refetchOnWindowFocus:true, queryFn:async():Promise<PublicCreator[]> => {
 const {data,error}=await supabase.from('public_creators').select(publicCreatorFields).order('creator_number');
 if(error) throw new Error('The creators could not load. Please try again.');
 return data ?? [];
}});
export function safePortfolio(value:string|null) { try { const url=new URL(value??''); return ['https:','http:'].includes(url.protocol)?url.href:null; } catch {return null;} }
export function portfolioEmbed(value:string|null) { const safe=safePortfolio(value); if(!safe)return null; const u=new URL(safe); let id:string|null=null;
 if(['youtube.com','www.youtube.com'].includes(u.hostname)) id=u.searchParams.get('v') ?? (u.pathname.startsWith('/shorts/')?u.pathname.split('/')[2]??null:null);
 if(u.hostname==='youtu.be') id=u.pathname.slice(1);
 if(id&&/^[\w-]{11}$/.test(id))return `https://www.youtube-nocookie.com/embed/${id}`;
 if(['vimeo.com','www.vimeo.com'].includes(u.hostname)&&/^\/\d+$/.test(u.pathname))return `https://player.vimeo.com/video${u.pathname}`;
 return null;
}
export function latestCreators(creators:PublicCreator[]) { return [...creators].sort((a,b)=>b.creator_number-a.creator_number).slice(0,8); }
