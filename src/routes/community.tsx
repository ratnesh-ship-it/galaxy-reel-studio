import { createFileRoute } from "@tanstack/react-router";
import { CommunitySection } from "@/components/site/Sections";
export const Route = createFileRoute("/community")({head:()=>({meta:[{title:"Community | JOMOVERSE"},{name:"description",content:"Connect, collaborate and learn with AI creators."},{property:"og:title",content:"Community | JOMOVERSE"},{property:"og:description",content:"Connect, collaborate and learn with AI creators."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:()=> <CommunitySection/>});
