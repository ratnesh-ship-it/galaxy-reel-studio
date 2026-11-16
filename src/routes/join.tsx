import { createFileRoute } from '@tanstack/react-router';
import { MissionFlow } from '@/components/mission/MissionFlow';
import { Container } from '@/components/site/ui';
export const Route=createFileRoute('/join')({
 head:()=>({meta:[{title:'Join JOMOVERSE — Mission Launch'},{name:'description',content:'Launch your brand mission or create your AI creator identity with JOMOVERSE.'},{property:'og:title',content:'Join JOMOVERSE — Mission Launch'},{property:'og:description',content:'Launch your brand mission or create your AI creator identity with JOMOVERSE.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:()=> <section className="min-h-[100dvh] pb-20 pt-8"><Container><MissionFlow/></Container></section>
});
