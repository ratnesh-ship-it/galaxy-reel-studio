import { createFileRoute } from "@tanstack/react-router";
import fashion from "@/assets/tile-fashion.jpg";
import { PageHero, Section, CheckList } from "@/components/site/Layout";
import { RegForm } from "@/components/site/RegForm";
import { specialities } from "@/lib/content";

export const Route = createFileRoute("/join-creator")({
  head: () => ({ meta: [{ title: "For AI Creators — Get Discovered | JOMOVERSE" }, { name: "description", content: "Build your AI portfolio, get discovered by global brands and get hired for AI films and ads." }, { property: "og:title", content: "For AI Creators — Get Discovered | JOMOVERSE" }, { property: "og:description", content: "Build your AI portfolio, get discovered by global brands and get hired for AI films and ads." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={fashion} eyebrow="For AI Creators" title={<>Your Talent. Your Portfolio. <span className="text-cosmic">Your Next Big Opportunity.</span></>} sub="You have the skills. You have the imagination. Now find the brands and opportunities that need your talent." />
      <Section className="grid gap-12 pt-4 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold">What Creators Can Do</h2>
          <p className="mt-3 text-muted-foreground">JOMOVERSE gives AI creators a platform to showcase their work, build their professional identity and connect with brands worldwide.</p>
          <div className="mt-8 text-lg"><CheckList items={["Create a professional creator profile.", "Showcase films, ads and creative projects.", "Get discovered by brands.", "Receive project invitations.", "Connect with fellow creators.", "Get hired and monetize creative skills."]} /></div>
        </div>
        <RegForm title="Join as an AI Creator" cta="Create Your Creator Profile" fields={[
          { name: "name", label: "Full Name" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "phone", label: "Phone / WhatsApp", type: "tel" },
          { name: "city", label: "City / Country" },
          { name: "portfolio", label: "Portfolio / Showreel Link", type: "url" },
          { name: "tools", label: "AI Tools You Use" },
          { name: "speciality", label: "Primary Speciality", options: [...specialities, "Other"] },
          { name: "level", label: "Experience Level", options: ["Beginner", "Intermediate", "Professional", "Expert / Studio"] },
        ]} />
      </Section>
    </>
  );
}
