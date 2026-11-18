import { createFileRoute, Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { creatorsQuery } from '@/lib/creators';
import { CreatorAvatar } from '@/components/site/CreatorDirectory';
import { HireCreator } from '@/components/site/HireCreator';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/site/ui';
export const Route=createFileRoute('/creators/$publicId')({
 loader:async({context,params})=>{const creators=await context.queryClient.ensureQueryData(creatorsQuery);return {creator:creators.find(c=>c.public_id===params.publicId)??null};},
 head:({loaderData})=>{const c=loaderData?.creator;const title=c?`${`${c.avatar_name} · ${c.public_id}`}, AI Filmmaker | JOMOVERSE`:'Creator not found | JOMOVERSE';const description=c?`Discover ${`${c.avatar_name} · ${c.public_id}`}, ${c.primary_speciality||'AI Creator'}${c.city_country?` based in ${c.city_country}`:''}. Hire creative talent through JOMOVERSE.`:"This creator isn't in orbit yet.";return {meta:[{title},{name:'description',content:description},{property:'og:title',content:title},{property:'og:description',content:description},{property:'og:type',content:'profile'},{name:'twitter:card',content:'summary_large_image'}]};},component:Profile
});
function Profile(){const {publicId}=Route.useParams();const {data}=useSuspenseQuery(creatorsQuery);const c=data.find(v=>v.public_id===publicId);if(!c)return <Container className="py-24"><h1 className="type-section">This creator isn't in orbit yet</h1><Button asChild variant="outline" className="mt-8"><Link to="/discover">Back to creators</Link></Button></Container>;
 return <Container className="py-16 md:py-24"><Link to="/discover" className="text-brand-teal-bright">← All Creators</Link>
 <div className="mt-10 grid items-center gap-12 md:grid-cols-[2fr_3fr]">
  <CreatorAvatar creator={c} large/>
  <div>
   <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Creator ID</p>
   <p className="mt-2 text-xl font-semibold text-brand-teal-bright">{c.public_id}</p>
   <h1 className="type-question mt-6">{c.avatar_name}</h1>
   <dl className="mt-8 grid gap-6 sm:grid-cols-2">
    <div><dt className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Location</dt><dd className="mt-2 text-xl">{c.city_country||'—'}</dd></div>
    <div><dt className="text-sm uppercase tracking-[0.16em] text-muted-foreground">Experience</dt><dd className="mt-2 text-xl">{c.experience_level||'—'}</dd></div>
   </dl>
   <div className="cta-actions mt-10 flex flex-col items-start gap-3"><HireCreator publicId={c.public_id} name={`${c.avatar_name} · ${c.public_id}`}/></div>
  </div>
 </div></Container>;}
