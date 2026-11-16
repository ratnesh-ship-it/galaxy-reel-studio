import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { ArrowUpRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { creatorsQuery, safePortfolio, type PublicCreator } from '@/lib/creators';
import { experienceLevels } from '@/config/forms';
import { Button } from '@/components/ui/button';
import { MissionButton } from '@/components/mission/MissionEntry';
import { Section, Label } from './ui';
export function CreatorAvatar({creator,large=false}:{creator:PublicCreator;large?:boolean}) {
 const [url,setUrl]=useState<string|null>(null);
 useEffect(()=>{ let active=true; if(!creator.avatar_url)return; void supabase.storage.from('creator-avatars').createSignedUrl(creator.avatar_url,3600).then(({data})=>{if(active)setUrl(data?.signedUrl??null);});return()=>{active=false;}; },[creator.avatar_url]);
 return <div className={`${large?'h-40 w-40 text-4xl':'h-20 w-20 text-2xl'} shrink-0 overflow-hidden rounded-full bg-muted text-brand-teal flex items-center justify-center font-semibold`}>{url?<img src={url} alt={creator.full_name} className="size-full object-cover" onError={()=>setUrl(null)}/>:creator.full_name.split(/\s+/).slice(0,2).map(n=>n[0]).join('').toUpperCase()}</div>;
}
export function CreatorCard({creator:c}:{creator:PublicCreator}) {
 const portfolio=safePortfolio(c.portfolio_link); const level=Math.max(1,experienceLevels.indexOf(c.experience_level??'')+1);
 return <article className="creator-card min-w-0 border border-border rounded-md bg-card p-6 transition-all hover:border-foreground hover:-translate-y-0.5">
 <p className="text-sm font-semibold text-brand-teal">{c.public_id}</p><div className="mt-5"><CreatorAvatar creator={c}/></div>
 <h3 className="mt-5 text-2xl font-semibold break-words">{c.full_name}</h3><p className="mt-2">{c.primary_speciality||'AI Creator'}</p><p className="text-sm text-muted-foreground">{c.city_country}</p>
 <div className="mt-4 flex items-center gap-1" aria-label={c.experience_level??'Experience not specified'}>{[1,2,3,4].map(n=><span key={n} className={`h-2 w-5 ${n<=level?'bg-brand-teal':'bg-muted'}`}/>)}<span className="ml-2 text-xs text-muted-foreground">{c.experience_level}</span></div>
 <div className="mt-5 flex min-h-16 flex-wrap content-start gap-2">{c.ai_tools.slice(0,4).map(t=><span key={t} className="rounded-sm bg-muted px-2 py-1 text-xs text-brand-teal break-all">{t}</span>)}{c.ai_tools.length>4&&<span className="text-xs">+{c.ai_tools.length-4} more</span>}</div>
 <div className="cta-actions mt-5 flex flex-wrap gap-3">{portfolio&&<Button asChild variant="outline"><a href={portfolio} target="_blank" rel="noopener noreferrer">View Portfolio <ArrowUpRight/></a></Button>}<Button asChild><Link to="/creators/$publicId" params={{publicId:c.public_id}}>View Profile</Link></Button></div>
 </article>;
}
export function useCreators() {
 const client=useQueryClient();const query=useSuspenseQuery(creatorsQuery);
 useEffect(()=>{const channel=supabase.channel(`creators-${crypto.randomUUID()}`).on('postgres_changes',{event:'*',schema:'public',table:'public_creators'},()=>{void client.invalidateQueries({queryKey:creatorsQuery.queryKey});}).subscribe();return()=>{void supabase.removeChannel(channel);};},[client]);return query.data;
}
export function EmptyCreators(){return <div className="py-12"><p className="text-xl">Our first creators are joining now. Be one of them.</p><MissionButton path="creator" className="mt-6">Join as an AI Creator</MissionButton></div>;}
export function MeetCreators(){ const creators=useCreators();return <Section><Label>— CREATORS</Label><h2 className="type-section mt-6">The Creators of the JOMOVERSE</h2><p className="mt-6 text-muted-foreground">Discover AI filmmakers and creative talent ready for your next campaign.</p><p className="mt-4 text-brand-teal">{creators.length} creators and growing</p>{creators.length?<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{creators.slice(-8).map(c=><CreatorCard key={c.public_id} creator={c}/>)}</div>:<EmptyCreators/>}<Button asChild variant="outline" className="mt-8"><Link to="/discover">View All Creators</Link></Button></Section>;}