import { createFileRoute } from "@tanstack/react-router";
import { BrandsSection, PageIntro, ProcessSection } from "@/components/site/Sections";
import { BrandForm } from "@/components/site/Forms";
import { Section, Label, Lines } from "@/components/site/ui";

export const Route = createFileRoute("/brands")({
  head: () => ({ meta: [{ title: "For Brands — Hire AI Filmmakers & Creators | JOMOVERSE" }, { name: "description", content: "Your Next Big Campaign Could Be AI-Powered. Discover and hire talented AI creators and filmmakers." }, { property: "og:title", content: "For Brands — Hire AI Filmmakers & Creators | JOMOVERSE" }, { property: "og:description", content: "Your Next Big Campaign Could Be AI-Powered. Discover and hire talented AI creators and filmmakers." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro label="For Brands" lines={["Your Next Big Campaign", <span key="i">Starts Here.</span>]} sub="Discover, connect and hire the next generation of AI-powered creative talent." />
      <BrandsSection n="01" showCta={false} />
      <ProcessSection />
      <Section id="register">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4"><Label>— Brand Registration</Label><Lines className="mt-8 type-section" lines={["Register", <span key="i">Your Brand.</span>]} /></div>
          <div className="md:col-span-8"><BrandForm /></div>
        </div>
      </Section>
    </>
  );
}
