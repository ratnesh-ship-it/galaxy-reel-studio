import { createFileRoute } from "@tanstack/react-router";
import { CreatorCard, EmptyCreators, useCreators } from "@/components/site/CreatorDirectory";
import { creatorsQuery } from "@/lib/creators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PageIntro } from "@/components/site/Sections";
import { Container, btn } from "@/components/site/ui";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { avatarCategories } from "@/data/avatars";
import { specialities, experienceLevels } from "@/config/forms";

export const Route = createFileRoute("/discover")({
  head: () => ({ meta: [{ title: "Discover AI Creators — JOMOVERSE" }, { name: "description", content: "Explore a universe of AI Creators, Filmmakers and creative specialists." }, { property: "og:title", content: "Discover AI Creators — JOMOVERSE" }, { property: "og:description", content: "Explore a universe of AI Creators, Filmmakers and creative specialists." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  loader: ({context}) => context.queryClient.ensureQueryData(creatorsQuery),
  component: Page,
});

function Filter({label,options,value,onChange}:{label:string;options:string[];value:string;onChange:(v:string)=>void}) {return <div><span className="eyebrow">{label}</span><Select value={value||'all'} onValueChange={v=>onChange(v==='all'?'':v)}><SelectTrigger aria-label={label} className="mt-2"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem>{options.map(o=><SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>;}
function Page(){const creators=useCreators();const [name,setName]=useState(''),[s,setS]=useState(''),[e,setE]=useState(''),[t,setT]=useState(''),[sort,setSort]=useState('id'),[limit,setLimit]=useState(24),[category,setCategory]=useState('');
const filtered=creators.filter(c=>`${c.avatar_name} ${c.public_id}`.toLowerCase().includes(name.toLowerCase())&&(!category||c.avatar_category===category)&&(!s||c.primary_speciality===s)&&(!e||c.experience_level===e)&&(!t||c.ai_tools.includes(t))).sort((a,b)=>sort==='newest'?b.creator_number-a.creator_number:a.creator_number-b.creator_number);
return <><PageIntro label="Discover Creators" lines={["Discover AI Creators"]}/><Container className="pb-24"><div className="grid gap-6 border-y border-border py-8 sm:grid-cols-2 lg:grid-cols-3"><label><span className="eyebrow">Search avatars</span><Input className="mt-2" value={name} onChange={ev=>{setName(ev.target.value);setLimit(24);}} placeholder="Avatar or ID"/></label><Filter label="Avatar category" options={[...avatarCategories]} value={category} onChange={v=>{setCategory(v);setLimit(24);}}/><Filter label="Speciality" options={specialities} value={s} onChange={v=>{setS(v);setLimit(24);}}/><Filter label="Experience" options={experienceLevels} value={e} onChange={v=>{setE(v);setLimit(24);}}/><Filter label="AI Tools" options={[...new Set(creators.flatMap(c=>c.ai_tools))].sort()} value={t} onChange={v=>{setT(v);setLimit(24);}}/><div><span className="eyebrow">Sort</span><Select value={sort} onValueChange={setSort}><SelectTrigger className="mt-2" aria-label="Sort"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="id">ID</SelectItem><SelectItem value="newest">Newest</SelectItem></SelectContent></Select></div></div><p className="mt-8 text-muted-foreground">{filtered.length} creators</p>{!creators.length?<EmptyCreators/>:!filtered.length?<p className="py-12">No creators match your search.</p>:<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.slice(0,limit).map(c=><CreatorCard key={c.public_id} creator={c}/>)}</div>}{filtered.length>limit&&<Button variant="outline" className="mt-8" onClick={()=>setLimit(n=>n+24)}>Load more</Button>}</Container></>;
}
