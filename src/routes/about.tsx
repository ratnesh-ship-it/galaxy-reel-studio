import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, FinalCTA } from "@/components/site/Sections";
import { Section, Label, Lines, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About JOMOVERSE — Our Vision" }, { name: "description", content: "The global creative marketplace and community for the AI Creator Economy." }, { property: "og:title", content: "About JOMOVERSE — Our Vision" }, { property: "og:description", content: "The global creative marketplace and community for the AI Creator Economy." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (
    <>
      <PageIntro label="About Us" lines={["Where Brands Meet", <em key="i">AI Creators.</em>]} sub="Connecting brands with the next generation of AI-powered creative talent." />
      <Section className="border-t border-hairline">
        <div className="grid gap-10 md:grid-cols-12">
          <Label className="md:col-span-3">— Brand Personality</Label>
          <Lines className="text-5xl md:col-span-9 md:text-7xl" lines={[<><em>Futuristic,</em> cinematic,</>, <>innovative, <em>collaborative</em></>, "and global."]} />
        </div>
      </Section>
      <Section className="border-t border-hairline">
        <div className="grid gap-10 md:grid-cols-12">
          <Label className="md:col-span-3">— Core Positioning</Label>
          <Reveal className="md:col-span-9"><p className="font-display text-4xl md:text-6xl">The global creative marketplace and community for the <em>AI Creator Economy.</em></p></Reveal>
        </div>
      </Section>
      <FinalCTA />
    </>
  ),
});
