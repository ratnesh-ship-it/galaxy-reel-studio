import { Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { ArrowRight, Play, X } from "lucide-react";
import astronautCut from "@/assets/astronaut-teal.png";
import filmFrame from "@/assets/tile-film.jpg";
import { universe, showcase, showcaseCategories, type ShowcaseItem } from "@/data/showcase";
import { Container, Label, Lines, Reveal, Section, btn, List, Marquee, EASE } from "./ui";

import { Button } from "@/components/ui/button";
import { MissionButton } from "@/components/mission/MissionEntry";

const Astronaut3D = lazy(() => import("@/components/three/Astronaut"));
const Globe = lazy(() => import("@/components/three/Globe"));

function useIsDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => { const m = window.matchMedia("(min-width: 1024px)"); setD(m.matches); const on = () => setD(m.matches); m.addEventListener("change", on); return () => m.removeEventListener("change", on); }, []);
  return d;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => { progress.current = v; });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const desktop = useIsDesktop();
  return (
    <section ref={ref} className="hero-light relative flex flex-col min-h-[700px] overflow-hidden lg:justify-center">
      <div className="space-stars" aria-hidden />
      {/* Planet */}
      <div className="hero-planet pointer-events-none absolute z-[1] -bottom-[45vw] -right-[25vw] h-[80vw] w-[80vw] rounded-full bg-background planet-glow md:-bottom-[38vw] md:h-[60vw] md:w-[60vw]" aria-hidden />
      {/* Astronaut */}
      <div className="hero-astronaut pointer-events-none absolute z-[1] inset-y-0 right-0 w-full lg:w-[42%]" aria-hidden>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <path d="M55 48 C 70 60, 85 40, 110 70" stroke="var(--brand-teal-bright)" strokeOpacity="0.25" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
        </svg>
        {desktop ? (
          <ClientOnly fallback={null}><Suspense fallback={null}><Astronaut3D scrollRef={progress} /></Suspense></ClientOnly>
        ) : (
          <motion.img style={{ y: imgY }} src={astronautCut} alt="" width={1024} height={1024} className="absolute right-[-15%] top-[8%] w-[85%] opacity-40 sm:opacity-60" />
        )}
      </div>
      <Container className="hero-text relative z-10">
        <div className="hero-copy max-w-[900px] lg:max-w-[70%]">
          <h1 className="hero-headline"><span>Launch Your First AI Film</span><span>Your First AI Ad</span><span className="text-brand-teal-bright">Today</span></h1>
          <p className="mt-8 text-muted-foreground">Where Brands Meet AI Creators</p>
          <div className="cta-actions mt-10 flex flex-wrap gap-3"><MissionButton path="brand" className={btn()}>I'm a Brand</MissionButton><MissionButton path="creator" variant="outline" className={btn("outline")}>I'm an AI Creator</MissionButton></div>
        </div>
      </Container>
      <div className="hero-scroll absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3" aria-hidden>
        <span className="eyebrow">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-hairline"><span className="absolute inset-0 animate-scrollline bg-foreground" /></span>
      </div>
    </section>
  );
}

export const CategoryMarquee = () => <Marquee items={["AI Films", "AI Advertisements", "AI Visual Art", "AI Animation", "AI Influencer Content", "AI Product Commercials"]} />;

function SectionHead({ n, label, lines, intro, intro2 }: { n: string; label: string; lines: React.ReactNode[]; intro?: string; intro2?: string }) {
  return (
    <div className="grid gap-8 md:grid-cols-12">
      <Label className="md:col-span-3">— {n} / {label}</Label>
      <div className="md:col-span-9">
        <Lines className="type-section" lines={lines} />
        {intro && <Reveal delay={0.2}><p className="mt-8 max-w-[60ch] text-[18px] leading-relaxed text-muted-foreground">{intro}</p>{intro2 && <p className="mt-3 max-w-[60ch] text-lg text-muted-foreground">{intro2}</p>}</Reveal>}
      </div>
    </div>
  );
}

export function JoinSection() {
  const panels = [
    {t:"Brands", h:"Find and hire AI creators", items:["Discover creators","Post briefs","Hire for films & ads","Build partnerships"],cta:"I'm a Brand",v:"primary" as const},
    {t:"Creators",h:"Get discovered by brands",items:["Build your portfolio","Showcase your work","Get project invites","Get paid"],cta:"I'm an AI Creator",v:"outline" as const},
  ];
  return (
    <Section>
      <SectionHead n="01" label="Join" lines={["Choose Your Orbit"]} intro="Hire AI talent for your brand, or get hired as an AI creator" />
      <div className="mt-20 grid border-t border-hairline md:grid-cols-2">
        {panels.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.1} className={`py-12 md:py-16 ${i === 0 ? "md:pr-14 md:border-r md:border-hairline" : "md:pl-14 border-t border-hairline md:border-t-0"}`}>
            <Label>{p.t}</Label>
            <h3 className="font-display mt-6 text-4xl md:text-5xl">{p.h}</h3>
            <div className="mt-10"><List items={p.items} /></div>
            <MissionButton path={i === 0 ? "brand" : "creator"} variant={p.v} className="mt-10">{p.cta}</MissionButton>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function UniverseSection() {
  return (
    <Section>
      <SectionHead n="02" label="Universe" lines={["Creative Universe"]} />
      <div className="mt-20 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {universe.map((u, i) => (
          <Reveal key={u.n} delay={(i % 3) * 0.08} className="bg-background">
            <article className="group relative aspect-[3/4] overflow-hidden">
              <img src={u.image} alt={`${u.title} — cinematic still`} loading="lazy" width={768} height={1024} className="film-still h-full w-full object-cover transition-all duration-700 ease-cine group-hover:scale-[1.03] group-hover:brightness-110 group-hover:saturate-[0.8]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              <span className="absolute left-6 top-6 text-xs font-medium text-brand-teal-bright">{u.n}</span>
              <div className="absolute inset-x-6 bottom-6">
                <h3 className="font-display text-3xl">{u.title}</h3>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function ProcessSection() {
  const steps = [
    ["01", "Discover", "Explore AI filmmakers, creators and creative specialists"],
    ["02", "Connect", "Share your idea or brief and match with the right talent"],
    ["03", "Collaborate", "Work together to turn concepts into cinematic content"],
    ["04", "Create & Grow", "Launch campaigns, build portfolios and grow together"],
  ];
  return (
    <Section>
      <SectionHead n="03" label="Process" lines={["How It Works"]} />
      <div className="relative mt-24">
        <svg className="absolute left-0 top-12 hidden h-24 w-full md:block" viewBox="0 0 1000 100" preserveAspectRatio="none" fill="none" aria-hidden>
          <defs><linearGradient id="process-teal"><stop stopColor="var(--brand-teal)" /><stop offset="1" stopColor="var(--brand-teal-bright)" /></linearGradient></defs>
          <motion.path d="M0 60 C 250 -10, 500 120, 750 30 S 1000 50, 1000 50" stroke="url(#process-teal)" strokeOpacity="0.6" strokeWidth="1" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, ease: EASE }} />
        </svg>
        <div className="absolute bottom-0 left-[22px] top-0 w-px bg-hairline md:hidden" aria-hidden />
        <ol className="relative grid gap-14 md:grid-cols-4 md:gap-8">
          {steps.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 0.12}>
              <li className="pl-14 md:pl-0">
                <svg viewBox="0 0 180 125" className="h-[72px] w-[104px] md:h-[120px] md:w-[173px]" role="img" aria-label={n}><defs><linearGradient id={`step-teal-${n}`}><stop stopColor="var(--brand-teal)" /><stop offset="1" stopColor="var(--brand-teal-bright)" /></linearGradient></defs><text x="0" y="110" fill="none" stroke={`url(#step-teal-${n})`} strokeWidth="1" className="font-display" fontSize="120">{n}</text></svg>
                <h3 className="font-display mt-6 text-3xl">{t}</h3>
                <p className="mt-3 max-w-[280px] font-sans text-[17px] font-normal text-muted-foreground">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function FilmFrame() {
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => { let f = 0; const id = setInterval(() => { f++; const s = Math.floor(f / 24); setTc(`00:${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}:${String(f % 24).padStart(2, "0")}`); }, 1000 / 24); return () => clearInterval(id); }, []);
  const mark = "absolute h-5 w-5 border-foreground/60";
  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-hairline md:aspect-[4/5]">
      <img src={filmFrame} alt="Film still of an astronaut on an alien desert" loading="lazy" className="film-still h-full w-full object-cover" />
      <div className="absolute inset-[8%_6%]">
        <span className={`${mark} left-0 top-0 border-l border-t`} /><span className={`${mark} right-0 top-0 border-r border-t`} />
        <span className={`${mark} bottom-0 left-0 border-b border-l`} /><span className={`${mark} bottom-0 right-0 border-b border-r`} />
      </div>
      <div className="absolute left-[9%] top-[11%] flex items-center gap-2 eyebrow"><span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />REC</div>
      <div className="absolute right-[9%] top-[11%] eyebrow text-foreground/80">2.39 : 1</div>
      <div className="absolute bottom-[11%] left-[9%] font-sans text-sm tabular-nums text-foreground/80">{tc}</div>
      <div className="absolute bottom-[11%] right-[9%] eyebrow text-foreground/80">4K · 24FPS</div>
    </div>
  );
}

const brandBenefits = ["Discover creators", "Post briefs", "Hire for films & ads", "Build partnerships"];
const creatorBenefits = ["Build your portfolio", "Showcase your work", "Get project invites", "Get paid"];
export function BrandsSection({n="04",showCta=true}:{n?:string;showCta?:boolean}) { return <Section><Label>For Brands</Label><h2 className="type-section mt-6">Find and hire AI creators</h2><div className="mt-10"><List items={brandBenefits} cols={2}/></div>{showCta&&<MissionButton path="brand" className="mt-8">I'm a Brand</MissionButton>}</Section>; }
export function CreatorsSection({n="05",showCta=true}:{n?:string;showCta?:boolean}) { return <Section><Label>For Creators</Label><h2 className="type-section mt-6">Get discovered by brands</h2><div className="mt-10"><List items={creatorBenefits} cols={2}/></div>{showCta&&<MissionButton path="creator" className="mt-8">I'm an AI Creator</MissionButton>}</Section>; }
export function CommunitySection({showCta=true}:{showCta?:boolean}) { return <Section><Label>Community</Label><h1 className="type-section mt-6">A Creative Movement</h1><div className="mt-10 flex flex-wrap gap-4">{["Creator networking","Filmmaking challenges","Creative collaborations","Learning & masterclasses"].map(t=><span key={t} className="border-b border-brand-teal-bright py-3 text-brand-teal-bright">{t}</span>)}</div><MissionButton path="creator" className="mt-10">Join the Community</MissionButton></Section>; }

export function ShowcaseSection({ showCta = true }: { showCta?: boolean }) {
  const [cat, setCat] = useState<string>("All");
  const [open, setOpen] = useState<ShowcaseItem | null>(null);
  const items = cat === "All" ? showcase : showcase.filter((s) => s.category === cat);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
  return (
    <Section>
      <SectionHead n="07" label="Showcase" lines={["Showcase"]} />
      <div className="mt-16 flex flex-wrap gap-x-6 gap-y-3 border-b border-hairline pb-4" role="tablist">
        {["All", ...showcaseCategories].map((c) => (
          <Button variant="ghost" key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`relative pb-2 text-[14px] transition-colors ${cat === c ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {c}{cat === c && <motion.span layoutId="tab" className="absolute -bottom-[17px] left-0 right-0 h-px bg-primary" />}
          </Button>
        ))}
      </div>
      <motion.div layout className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {items.map((s) => (
            <motion.div layout key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className={`group relative mb-4 block w-full overflow-hidden border border-hairline text-left transition-colors hover:border-foreground/30 ${s.ratio === "16:9" ? "aspect-video" : "aspect-[9/16]"}`}>
              <Button variant="ghost" aria-label={`Open ${s.category}`} onClick={() => setOpen(s)} className="absolute inset-0 h-full w-full p-0"><img src={s.image} alt={`${s.category} by ${s.creator}`} loading="lazy" className="film-still h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/50 opacity-70 transition-opacity group-hover:opacity-100"><Play className="h-5 w-5" strokeWidth={1.5} /></span>
              <div className="absolute inset-x-5 bottom-5"><p className="eyebrow">{s.category}</p></div>
            </Button></motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {showCta && <div className="mt-12"><Link to="/showcase" className={btn("outline")}>View All Work</Link></div>}
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal aria-label={open.category} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-6" onClick={() => setOpen(null)}>
            <Button variant="ghost" size="icon" className="absolute right-6 top-6" onClick={() => setOpen(null)} aria-label="Close"><X className="h-7 w-7" strokeWidth={1.5} /></Button>
            <div className="max-h-[85dvh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              {open.video ? <video src={open.video} controls autoPlay className="max-h-[80dvh]" /> : <img src={open.image} alt={open.category} className="max-h-[80dvh] w-auto" />}
              <p className="eyebrow mt-4">{open.category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export function FinalCTA() {
  return (
    <section className="space-dark relative flex min-h-[800px] items-center overflow-hidden py-32"><div className="space-stars" aria-hidden />
      <div className="pointer-events-none absolute -bottom-[150vw] left-1/2 h-[180vw] w-[180vw] -translate-x-1/2 rounded-full bg-background horizon-glow md:-bottom-[160vw]" aria-hidden />
      <motion.img src={astronautCut} alt="" aria-hidden loading="lazy" width={1024} height={1024} className="pointer-events-none absolute left-1/2 top-[5%] w-24 -translate-x-1/2 opacity-80 md:w-32" animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
      <Container className="relative z-10 text-center">
        <Lines className="mx-auto max-w-[1100px] type-section" lines={["The Future of Creativity", "Is Being Created Now"]} />
        <Reveal delay={0.3}>
          <div className="cta-actions mt-12 flex flex-wrap justify-center gap-3">
            <MissionButton path="brand" className={btn()}>I'm a Brand</MissionButton>
            <MissionButton path="creator" variant="outline" className={btn("outline")}>I'm an AI Creator</MissionButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function PageIntro({ label, lines, sub }: { label: string; lines: React.ReactNode[]; sub?: string }) {
  return (
    <section className="pb-16 pt-16 md:pt-24">
      <Container>
        <Label>{label}</Label>
        <Lines as="h1" className="mt-8 max-w-[1100px] type-hero" lines={lines} />
        {sub && <Reveal delay={0.25}><p className="mt-8 max-w-[60ch] text-[18px] leading-relaxed text-muted-foreground">{sub}</p></Reveal>}
      </Container>
    </section>
  );
}
