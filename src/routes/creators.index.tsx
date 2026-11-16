import { createFileRoute } from "@tanstack/react-router";
import { CreatorsSection, PageIntro, ProcessSection } from "@/components/site/Sections";
import { CreatorForm } from "@/components/site/Forms";
import { Section, Label, Lines } from "@/components/site/ui";

export const Route = createFileRoute("/creators/")({
  head: () => ({ meta: [{ title: "For AI Creators — Join and Get Hired | JOMOVERSE" }, { name: "description", content: "Your Creativity Deserves a Global Stage. Build your AI portfolio, get discovered by brands and get hired." }, { property: "og:title", content: "For AI Creators — Join and Get Hired | JOMOVERSE" }, { property: "og:description", content: "Your Creativity Deserves a Global Stage. Build your AI portfolio, get discovered by brands and get hired." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro label="For AI Creators" lines={["Your Creativity Deserves", <span key="i">a Global Stage.</span>]} sub="Showcase your talent, connect with brands and turn your creativity into professional opportunities." />
      <CreatorsSection n="01" showCta={false} />
      <ProcessSection />
      <Section id="register">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4"><Label>— Creator Registration</Label><Lines className="mt-8 type-section" lines={["Join as an", <span key="i">AI Creator.</span>]} /></div>
          <div className="md:col-span-8"><CreatorForm /></div>
        </div>
      </Section>
    </>
  );
}
