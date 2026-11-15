import { createFileRoute } from "@tanstack/react-router";
import { MissionButton } from "@/components/mission/MissionEntry";
import { useState } from "react";
import { PageIntro } from "@/components/site/Sections";
import { Container, btn } from "@/components/site/ui";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { specialities, experienceLevels } from "@/config/forms";

export const Route = createFileRoute("/discover")({
  head: () => ({ meta: [{ title: "Discover AI Creators — JOMOVERSE" }, { name: "description", content: "Explore a universe of AI Creators, Filmmakers and creative specialists." }, { property: "og:title", content: "Discover AI Creators — JOMOVERSE" }, { property: "og:description", content: "Explore a universe of AI Creators, Filmmakers and creative specialists." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Filter({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="block">
      <span className="eyebrow">{label}</span>
      <Select value={value || 'all'} onValueChange={v=>onChange(v==='all'?'':v)}>
        <SelectTrigger aria-label={label} className="type-answer mt-2 h-auto rounded-none border-0 border-b border-input px-0 py-2 shadow-none"><SelectValue /></SelectTrigger>
        <SelectContent className="font-sans"><SelectItem value="all" className="type-answer">All</SelectItem>{options.map(o=><SelectItem key={o} value={o} className="type-answer">{o}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );
}

function Page() {
  const [s, setS] = useState(""), [e, setE] = useState(""), [t, setT] = useState("");
  return (
    <>
      <PageIntro label="Discover Creators" lines={["Explore a Universe", <em key="i">of AI Talent.</em>]} sub="Explore a universe of AI Creators, Filmmakers and creative specialists." />
      <Container className="pb-32">
        <div className="grid gap-8 border-y border-hairline py-8 md:grid-cols-3">
          <Filter label="Speciality" options={specialities} value={s} onChange={setS} />
          <Filter label="Experience" options={experienceLevels} value={e} onChange={setE} />
          <label className="block"><span className="eyebrow">Tools</span><input value={t} onChange={(ev) => setT(ev.target.value)} placeholder="e.g. Runway, Sora…" className="type-answer mt-2 w-full border-0 border-b border-input bg-transparent pb-2 outline-none placeholder:text-foreground/40 focus:border-brand-teal-bright" /></label>
        </div>
        <div className="mt-12 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-background p-6">
              <div className="aspect-[4/5] border border-dashed border-hairline" />
              <div className="mt-5 h-3 w-2/3 bg-card" /><div className="mt-3 h-2 w-1/3 bg-card" />
            </div>
          ))}
        </div>
        <div className="mt-16 max-w-xl">
          <h2 className="type-section">The directory opens soon.</h2>
          <p className="mt-4 text-muted-foreground">Creator profiles will appear here as AI creators join JOMOVERSE.</p>
          <MissionButton path="creator" className="mt-8">Create Your Creator Profile</MissionButton>
        </div>
      </Container>
    </>
  );
}
