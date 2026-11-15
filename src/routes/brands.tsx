import { createFileRoute } from "@tanstack/react-router";
import product from "@/assets/tile-product.jpg";
import { PageHero, Section, CheckList } from "@/components/site/Layout";
import { RegForm } from "@/components/site/RegForm";

export const Route = createFileRoute("/brands")({
  head: () => ({ meta: [{ title: "For Brands — Hire AI Filmmakers | JOMOVERSE" }, { name: "description", content: "Discover and hire talented AI creators and filmmakers for brand films, ads and campaigns." }, { property: "og:title", content: "For Brands — Hire AI Filmmakers | JOMOVERSE" }, { property: "og:description", content: "Discover and hire talented AI creators and filmmakers for brand films, ads and campaigns." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={product} eyebrow="For Brands" title={<>Your Next Big Campaign Could Be <span className="text-cosmic">AI-Powered.</span></>} sub="Why spend weeks searching for creative talent when the right AI creator could be just one click away?" />
      <Section className="grid gap-12 pt-4 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold">What Brands Can Do</h2>
          <p className="mt-3 text-muted-foreground">JOMOVERSE helps brands discover and hire talented AI creators and filmmakers to produce high-quality creative content.</p>
          <div className="mt-8 text-lg"><CheckList items={["Discover verified creative talent.", "Browse portfolios and showreels.", "Post projects and creative briefs.", "Hire AI filmmakers and specialists.", "Collaborate directly with creators.", "Build long-term creative partnerships."]} /></div>
        </div>
        <RegForm title="Register Your Brand" cta="Find Your AI Creator" fields={[
          { name: "company", label: "Company / Brand Name" },
          { name: "contact", label: "Contact Person" },
          { name: "email", label: "Business Email", type: "email" },
          { name: "phone", label: "Phone / WhatsApp", type: "tel" },
          { name: "website", label: "Website / Social Media" },
          { name: "industry", label: "Industry" },
          { name: "create", label: "What do you want to create?", options: ["AI Films", "AI Ads", "Product Commercials", "AI Influencer Campaigns", "Animation", "Other"] },
          { name: "budget", label: "Estimated Project Budget", options: ["Under $1,000", "$1,000 – $5,000", "$5,000 – $20,000", "$20,000+"] },
        ]} />
      </Section>
    </>
  );
}
