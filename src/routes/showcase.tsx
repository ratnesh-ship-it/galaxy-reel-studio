import { createFileRoute } from "@tanstack/react-router";
import film from "@/assets/tile-film.jpg";
import { PageHero, Section } from "@/components/site/Layout";
import { showcase } from "@/lib/content";
import { Play } from "lucide-react";

export const Route = createFileRoute("/showcase")({
  head: () => ({ meta: [{ title: "AI Films & Ads Showcase — JOMOVERSE" }, { name: "description", content: "Brand films, product commercials, fashion films, music videos and short films made with AI." }, { property: "og:title", content: "AI Films & Ads Showcase — JOMOVERSE" }, { property: "og:description", content: "Brand films, product commercials, fashion films, music videos and short films made with AI." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={film} eyebrow="AI Films & Creative Showcase" title={<>Creativity <span className="text-cosmic">Without Limits.</span></>} sub="Discover inspiring work from emerging AI creators and filmmakers." />
      <Section className="pt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((s) => (
            <div key={s.title} className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
              <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <span className="absolute right-4 top-4 rounded-full glass p-3"><Play className="h-4 w-4" /></span>
              <div className="absolute bottom-0 p-6"><p className="text-xs uppercase tracking-widest text-cyan">{s.cat}</p><h3 className="mt-1 text-2xl font-bold">{s.title}</h3></div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
