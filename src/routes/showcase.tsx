import { createFileRoute } from "@tanstack/react-router";
import { ShowcaseSection, CategoryMarquee, FinalCTA } from "@/components/site/Sections";

export const Route = createFileRoute("/showcase")({
  head: () => ({ meta: [{ title: "AI Films & Ads — Creative Showcase | JOMOVERSE" }, { name: "description", content: "Creativity Without Limits. Discover inspiring work from emerging AI creators and filmmakers." }, { property: "og:title", content: "AI Films & Ads — Creative Showcase | JOMOVERSE" }, { property: "og:description", content: "Creativity Without Limits. Discover inspiring work from emerging AI creators and filmmakers." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (<><div className="pt-20" /><ShowcaseSection showCta={false} /><CategoryMarquee /><FinalCTA /></>),
});
