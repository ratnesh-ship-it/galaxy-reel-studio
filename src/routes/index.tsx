import { createFileRoute } from "@tanstack/react-router";
import { Hero, CategoryMarquee, JoinSection, UniverseSection, ProcessSection, BrandsSection, CreatorsSection, CommunitySection, ShowcaseSection, FinalCTA } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "JOMOVERSE — Launch Your First AI Film. Today." }, { name: "description", content: "Where Brands Meet AI Creators. Discover AI Filmmakers, AI Creators and visual storytellers for brand films, ads and campaigns." }, { property: "og:title", content: "JOMOVERSE — Launch Your First AI Film. Today." }, { property: "og:description", content: "Where Brands Meet AI Creators. Discover AI Filmmakers, AI Creators and visual storytellers for brand films, ads and campaigns." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (<><Hero /><CategoryMarquee /><JoinSection /><UniverseSection /><ProcessSection /><BrandsSection /><CreatorsSection /><CommunitySection /><ShowcaseSection /><FinalCTA /></>),
});
