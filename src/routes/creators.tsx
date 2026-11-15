import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import nebula from "@/assets/nebula.jpg";
import { PageHero, Section } from "@/components/site/Layout";
import { creators, specialities } from "@/lib/content";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/creators")({
  head: () => ({ meta: [{ title: "Discover AI Creators — JOMOVERSE" }, { name: "description", content: "Browse AI filmmakers, ad creators, animators and visual artists ready for your next campaign." }, { property: "og:title", content: "Discover AI Creators — JOMOVERSE" }, { property: "og:description", content: "Browse AI filmmakers, ad creators, animators and visual artists ready for your next campaign." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  const [f, setF] = useState("All");
  const list = f === "All" ? creators : creators.filter((c) => c.spec === f);
  return (
    <>
      <PageHero image={nebula} eyebrow="Discover Creators" title={<>Explore a Universe of <span className="text-cosmic">AI Talent.</span></>} sub="Browse portfolios and showreels from the next generation of AI-powered creative talent." />
      <Section className="pt-4">
        <div className="flex flex-wrap gap-2">
          {["All", ...specialities].map((s) => (
            <button key={s} onClick={() => setF(s)} className={`rounded-full px-4 py-2 text-sm transition-colors ${f === s ? "bg-cosmic text-accent-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>{s}</button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <div key={c.name} className="group overflow-hidden rounded-2xl glass transition-shadow hover:shadow-glow">
              <div className="aspect-[4/3] overflow-hidden"><img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-cyan">{c.spec}</p>
                <h3 className="mt-1 text-xl font-bold">{c.name}</h3>
                <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{c.city}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
