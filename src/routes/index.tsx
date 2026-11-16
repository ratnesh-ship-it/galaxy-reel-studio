import { createFileRoute } from "@tanstack/react-router";
import { Hero, CategoryMarquee, JoinSection, UniverseSection, ProcessSection, BrandsSection, CreatorsSection, CommunitySection, ShowcaseSection, FinalCTA } from "@/components/site/Sections";

import { MeetCreators } from "@/components/site/CreatorDirectory";
import { creatorsQuery } from "@/lib/creators";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "JOMOVERSE — Launch Your First AI Film. Today." }, { name: "description", content: "Where Brands Meet AI Creators. Discover AI Filmmakers, AI Creators and visual storytellers for brand films, ads and campaigns." }, { property: "og:title", content: "JOMOVERSE — Launch Your First AI Film. Today." }, { property: "og:description", content: "Where Brands Meet AI Creators. Discover AI Filmmakers, AI Creators and visual storytellers for brand films, ads and campaigns." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  loader: ({context}) => context.queryClient.ensureQueryData(creatorsQuery),
  component: () => (<><Hero /><CategoryMarquee /><JoinSection /><UniverseSection /><ProcessSection /><BrandsSection /><CreatorsSection /><MeetCreators /><CommunitySection /><ShowcaseSection /><FinalCTA /></>),
});
