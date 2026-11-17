import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { ArrowUpRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { creatorsQuery, safePortfolio, type PublicCreator, latestCreators } from '@/lib/creators';
import { experienceLevels } from '@/config/forms';
import { Button } from '@/components/ui/button';
import { MissionButton } from '@/components/mission/MissionEntry';
import { Section, Label } from './ui';
import { getAvatar, avatarThumbnail } from '@/data/avatars';
export function CreatorAvatar({creator,large=false}:{creator:PublicCreator;large?:boolean}) {const avatar=getAvatar(creator.avatar_slug);return <img src={large?avatar.image:avatarThumbnail(avatar.slug)} alt={avatar.name} loading="lazy" width={512} height={512} className={`${large?'aspect-square w-full max-w-md':'aspect-square w-full'} rounded-md object-cover`}/>;}
export function CreatorCard({creator:c}:{creator:PublicCreator}) {
 const portfolio=safePortfolio(c.portfolio_link); const level=Math.max(1,experienceLevels.indexOf(c.experience_level??'')+1);
 return <article className="creator-card min-w-0 border border-border rounded-md bg-card p-6 transition-all hover:border-foreground hover:-translate-y-0.5">
 <div className="mt-5"><CreatorAvatar creator={c}/></div>
 <h3 className="mt-5 text-2xl font-semibold break-words">{c.avatar_name} · {c.public_id}</h3><p className="mt-2">{c.primary_speciality||'AI Creator'}</p><p className="text-sm text-muted-foreground">{c.city_country}</p>
 <div className="mt-4 flex items-center gap-1" aria-label={c.experience_level??'Experience not specified'}>{[1,2,3,4].map(n=><span key={n} className={`h-2 w-5 ${n<=level?'bg-brand-teal':'bg-muted'}`}/>)}<span className="ml-2 text-xs text-muted-foreground">{c.experience_level}</span></div>
 <div className="mt-5 flex min-h-16 flex-wrap content-start gap-2">{c.ai_tools.slice(0,4).map(t=><span key={t} className="rounded-sm bg-muted px-2 py-1 text-xs text-brand-teal-bright break-all">{t}</span>)}{c.ai_tools.length>4&&<span className="text-xs">+{c.ai_tools.length-4} more</span>}</div>
 <div className="cta-actions mt-5 flex flex-wrap gap-3">{portfolio&&<Button asChild variant="outline"><a href={portfolio} target="_blank" rel="noopener noreferrer">View Portfolio <ArrowUpRight/></a></Button>}<Button asChild><Link to="/creators/$publicId" params={{publicId:c.public_id}}>View Profile</Link></Button></div>
 </article>;
}
export function useCreators() {
 const client=useQueryClient();const query=useSuspenseQuery(creatorsQuery);
 useEffect(()=>{const channel=supabase.channel(`creators-${crypto.randomUUID()}`).on('postgres_changes',{event:'*',schema:'public',table:'public_creators'},()=>{void client.invalidateQueries({queryKey:creatorsQuery.queryKey});}).subscribe();return()=>{void supabase.removeChannel(channel);};},[client]);return query.data;
}
export function EmptyCreators(){return <div className="py-12"><p className="text-xl">Our first creators are joining now</p><MissionButton path="creator" className="mt-6">Join as Creator</MissionButton></div>;}
export function MeetCreators(){ const creators=useCreators();return <Section><Label>— CREATORS</Label><h2 className="type-section mt-6">Meet Our Creators</h2><p className="mt-6 text-muted-foreground">Discover AI filmmakers and creative talent ready for your next campaign.</p>{creators.length?<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{latestCreators(creators).map(c=><CreatorCard key={c.public_id} creator={c}/>)}</div>:<EmptyCreators/>}<Button asChild variant="outline" className="mt-8"><Link to="/discover">View All Creators</Link></Button></Section>;}