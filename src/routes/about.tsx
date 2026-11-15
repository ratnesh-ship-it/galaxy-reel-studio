import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-astronaut.jpg";
import { PageHero, Section } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About JOMOVERSE — Our Vision" }, { name: "description", content: "Connecting brands with the next generation of AI-powered creative talent." }, { property: "og:title", content: "About JOMOVERSE — Our Vision" }, { property: "og:description", content: "Connecting brands with the next generation of AI-powered creative talent." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  const items = [["Our Promise", "Connecting brands with the next generation of AI-powered creative talent."], ["Our Positioning", "The global creative marketplace and community for the AI Creator Economy."], ["Our Personality", "Futuristic, cinematic, innovative, collaborative and global."]];
  return (
    <>
      <PageHero image={hero} eyebrow="About Us" title={<>Where Brands Meet <span className="text-cosmic">AI Creators.</span></>} sub="We believe the next era of film and advertising belongs to creators who pair imagination with AI." />
      <Section className="pt-4">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(([t, d]) => (
            <div key={t} className="rounded-2xl glass p-8"><p className="text-sm uppercase tracking-widest text-cyan">{t}</p><p className="mt-4 font-display text-2xl font-bold">{d}</p></div>
          ))}
        </div>
      </Section>
    </>
  );
}
