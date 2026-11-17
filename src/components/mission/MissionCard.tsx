import { forwardRef } from 'react';
import { Fingerprint, Film, Pencil, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormLabel } from './FormTypography';
import { getAvatar, avatarThumbnail } from '@/data/avatars';
import { domain, steps, type Answers, type MissionPath } from '@/lib/mission';
export const MissionCard = forwardRef<HTMLDivElement, {path: MissionPath; answers: Answers; code: string; onEdit?: ((i:number)=>void) | undefined}>(function MissionCard({path,answers,code,onEdit},ref) {
 return <div ref={ref} className="mission-card relative overflow-hidden rounded-md border border-brand-teal-bright/40 bg-card p-6 md:p-8" onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--light-x',`${e.clientX-r.left}px`);e.currentTarget.style.setProperty('--light-y',`${e.clientY-r.top}px`);}}>
 <div className="pointer-events-none absolute inset-0 mission-shimmer" />
 <div className="relative"><div className="flex items-center justify-between border-b border-input pb-5"><FormLabel className="text-brand-teal-bright">{path==='brand'?'Mission Brief':'Creator ID / JOMO Badge'}</FormLabel>{path==='brand'?<Film className="h-7 w-7 text-brand-teal-bright"/>:<Fingerprint className="h-9 w-9 text-brand-teal-bright"/>}</div>
 {path==='creator'&&<img src={avatarThumbnail(String(answers['avatar_slug']))} alt={getAvatar(String(answers['avatar_slug'])).name} width={512} height={512} className="mt-6 aspect-square w-full max-w-64 rounded-md object-cover"/>}
 <h2 className="type-card-name mt-7 break-words">{path==='brand'?String(answers['company']||'Your Brand'):`${getAvatar(String(answers['avatar_slug'])).name} · ${code.startsWith('JV-CRT')?'ID pending':code}`}</h2>
 <p className="mt-3 font-sans text-sm text-brand-teal-bright">{code}</p>
 <dl className="mt-7 space-y-4">{steps[path].map((s,i)=><div key={s.key} className="border-b border-hairline pb-3"><dt className="flex items-center justify-between eyebrow gap-3 text-muted-foreground">{s.label}{onEdit&&<Button variant="ghost" size="icon" aria-label={`Edit ${s.label}`} title={`Edit ${s.label}`} onClick={()=>onEdit(i)}><Pencil/></Button>}</dt><dd className="mt-1 break-words text-sm">{Array.isArray(answers[s.key])?<div className="flex flex-wrap gap-1">{(answers[s.key] as string[]).map(v=><span key={v} className="rounded-sm border border-brand-teal-bright/30 bg-brand-teal-deep/25 px-2 py-1 text-brand-teal-bright">{v}</span>)}</div>:s.key==='experience'&&answers[s.key]?<div className="flex flex-wrap items-center gap-1">{Array.from({length:(s.options?.indexOf(String(answers[s.key]))??0)+1},(_,j)=><Star key={j} className="h-3 w-3 fill-brand-teal-bright text-brand-teal-bright"/>)}<span className="ml-1">{answers[s.key]}</span></div>:s.kind==='url'?domain(String(answers[s.key]??''))||'—':s.key==='avatar_slug'?getAvatar(String(answers[s.key])).name:String(answers[s.key]||'—')}</dd></div>)}</dl>
 <div className="mt-6 flex items-center justify-between"><img src="/brand/jomoverse-logo-white.png" alt="JOMOVERSE" className="h-3 w-auto"/><span className="h-2 w-2 rounded-full bg-brand-teal-bright glow-teal"/></div></div></div>;
});
