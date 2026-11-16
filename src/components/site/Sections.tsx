import { Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { ArrowRight, Play, X } from "lucide-react";
import astronautCut from "@/assets/astronaut-teal.png";
import filmFrame from "@/assets/tile-film.jpg";
import { universe, showcase, showcaseCategories, type ShowcaseItem } from "@/data/showcase";
import { Container, Label, Lines, Reveal, Section, btn, List, Marquee, EASE } from "./ui";

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
        <div className="max-w-[760px] lg:max-w-[62%]">
          <Label className="mb-8">Where Brands Meet AI Creators.</Label>
          <Lines as="h1" className="type-hero" lines={[
            <>Launch Your First <span>AI Film.</span></>,
            <>Your First <span>AI Ad.</span></>,
            <span className="text-brand-teal-bright">Today.</span>,
          ]} />
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-[56ch] text-[18px] leading-relaxed text-muted-foreground">Discover talented AI Filmmakers, AI Creators and visual storytellers. Turn your ideas into extraordinary brand films, advertisements and creative campaigns.</p>
            <div className="cta-actions mt-10 flex flex-wrap gap-3">
              <MissionButton path="brand" className={btn()}>Register as a Brand <ArrowRight className="h-4 w-4" strokeWidth={1.5} /></MissionButton>
              <MissionButton path="creator" variant="outline" className={btn("outline")}>Join as an AI Creator</MissionButton>
            </div>
            <p className="eyebrow mt-10 flex flex-wrap items-center gap-3">{["Create.", "Collaborate.", "Get Discovered.", "Get Hired."].map((t, i) => <span key={t} className="flex items-center gap-3">{i > 0 && <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground" />}{t}</span>)}</p>
          </Reveal>
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
    { t: "For Brands & Businesses", h: "Your Next Big Campaign Starts Here.", p: "Discover, connect and hire the next generation of AI-powered creative talent.", items: ["Discover AI Creators and Filmmakers.", "Post creative projects and briefs.", "Hire talent for AI films and advertisements.", "Build long-term creative partnerships.", "Bring your brand vision to life."], to: "/brands" as const, cta: "Register Your Brand", v: "primary" as const },
    { t: "For AI Creators & Filmmakers", h: "Your Creativity Deserves a Global Stage.", p: "Showcase your talent, connect with brands and turn your creativity into professional opportunities.", items: ["Build your professional AI portfolio.", "Showcase films, advertisements and creative projects.", "Get discovered by global brands.", "Receive project opportunities.", "Collaborate with other creators.", "Monetize your creative skills."], to: "/creators" as const, cta: "Join as an AI Creator", v: "outline" as const },
  ];
  return (
    <Section>
      <SectionHead n="01" label="Join" lines={["One Platform. Two Creative Worlds.", <span key="i">Infinite Possibilities.</span>]} intro="Whether you're a brand looking for creative talent or an AI creator looking for exciting opportunities, there's a place for you in JOMOVERSE." />
      <div className="mt-20 grid border-t border-hairline md:grid-cols-2">
        {panels.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.1} className={`py-12 md:py-16 ${i === 0 ? "md:pr-14 md:border-r md:border-hairline" : "md:pl-14 border-t border-hairline md:border-t-0"}`}>
            <Label>{p.t}</Label>
            <h3 className="font-display mt-6 text-4xl md:text-5xl">{p.h}</h3>
            <p className="mt-5 max-w-[46ch] text-muted-foreground">{p.p}</p>
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
      <SectionHead n="02" label="Universe" lines={["One Universe.", <span key="i">Infinite Creative Possibilities.</span>]} intro="Explore the different forms of AI-powered creativity." />
      <div className="mt-20 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {universe.map((u, i) => (
          <Reveal key={u.n} delay={(i % 3) * 0.08} className="bg-background">
            <article className="group relative aspect-[3/4] overflow-hidden">
              <img src={u.image} alt={`${u.title} — cinematic still`} loading="lazy" width={768} height={1024} className="film-still h-full w-full object-cover transition-all duration-700 ease-cine group-hover:scale-[1.03] group-hover:brightness-110 group-hover:saturate-[0.8]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              <span className="absolute left-6 top-6 text-xs font-medium text-brand-teal-bright">{u.n}</span>
              <div className="absolute inset-x-6 bottom-6">
                <h3 className="font-display text-3xl">{u.title}</h3>
                <p className="mt-2 text-[15px] text-muted-foreground">{u.desc}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-12"><Link to="/showcase" className={btn("outline")}>Explore Creative Work <ArrowRight className="h-4 w-4" strokeWidth={1.5} /></Link></div>
    </Section>
  );
}

export function ProcessSection() {
  const steps = [
    ["01", "Discover", "Explore a universe of AI Creators, Filmmakers and creative specialists."],
    ["02", "Connect", "Share your ideas, post projects and connect with the right creative talent."],
    ["03", "Collaborate", "Work together to transform concepts into extraordinary creative experiences."],
    ["04", "Create & Grow", "Launch campaigns, build portfolios, secure projects and grow your creative journey."],
  ];
  return (
    <Section>
      <SectionHead n="03" label="Process" lines={["From Imagination", <span key="i">to Creation.</span>]} />
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
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{d}</p>
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

export function BrandsSection({ n = "04", showCta = true }: { n?: string; showCta?: boolean }) {
  return (
    <Section>
      <div className="grid items-center gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-6"><FilmFrame /></Reveal>
        <div className="md:col-span-6">
          <Label>— {n} / For Brands</Label>
          <Lines className="mt-8 type-section" lines={["Your Next Big Campaign", <>Could Be <span>AI-Powered.</span></>]} />
          <Reveal delay={0.2}>
            <p className="mt-8 text-[18px] leading-relaxed">Why spend weeks searching for creative talent when the right AI creator could be just one click away?</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">JOMOVERSE helps brands discover and hire talented AI creators and filmmakers to produce high-quality creative content.</p>
            <p className="eyebrow mb-4 mt-10">What Brands Can Do</p>
            <List cols={2} items={["Discover verified creative talent.", "Browse portfolios and showreels.", "Post projects and creative briefs.", "Hire AI filmmakers and specialists.", "Collaborate directly with creators.", "Build long-term creative partnerships."]} />
            {showCta && <MissionButton path="brand" className={`${btn()} mt-10`}>Find Your AI Creator</MissionButton>}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function ProfileCard() {
  return (
    <div className="border border-hairline bg-card p-6 md:p-8 overflow-hidden">
      <div className="flex flex-wrap items-center gap-4">
        <div className="h-14 w-14 rounded-full border border-hairline bg-background" />
        <div><p className="type-card-name">Your Name</p><p className="text-sm text-muted-foreground">AI Filmmaker</p></div>
        <span className="ml-auto flex items-center gap-2 rounded-[3px] border border-brand-teal-bright/50 bg-brand-teal-deep/25 px-2.5 py-1 text-[11px] tracking-[0.1em] text-brand-teal-bright"><span className="h-1.5 w-1.5 rounded-full bg-brand-teal-bright" />Open to projects</span>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3">
        {showcase.filter((s) => s.ratio === "9:16").slice(0, 3).map((s) => (
          <div key={s.id} className="group relative aspect-[9/16] overflow-hidden border border-hairline">
            <img src={s.image} alt="Showreel thumbnail" loading="lazy" className="film-still h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <Play className="absolute bottom-3 left-3 h-4 w-4" strokeWidth={1.5} />
          </div>
        ))}
      </div>
      <p className="eyebrow mt-6">Showreel · 3 films</p>
    </div>
  );
}

export function CreatorsSection({ n = "05", showCta = true }: { n?: string; showCta?: boolean }) {
  return (
    <Section>
      <div className="grid items-center gap-16 md:grid-cols-12">
        <div className="order-2 md:order-1 md:col-span-6">
          <Label>— {n} / For Creators</Label>
          <Lines className="mt-8 type-section" lines={["Your Talent. Your Portfolio.", <span key="i">Your Next Big Opportunity.</span>]} />
          <Reveal delay={0.2}>
            <p className="mt-8 text-[18px] leading-relaxed">You have the skills. You have the imagination. Now find the brands and opportunities that need your talent.</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">JOMOVERSE gives AI creators a platform to showcase their work, build their professional identity and connect with brands worldwide.</p>
            <p className="eyebrow mb-4 mt-10">What Creators Can Do</p>
            <List cols={2} items={["Create a professional creator profile.", "Showcase films, ads and creative projects.", "Get discovered by brands.", "Receive project invitations.", "Connect with fellow creators.", "Get hired and monetize creative skills."]} />
            {showCta && <MissionButton path="creator" className={`${btn()} mt-10`}>Create Your Creator Profile</MissionButton>}
          </Reveal>
        </div>
        <Reveal className="order-1 md:order-2 md:col-span-6"><ProfileCard /></Reveal>
      </div>
    </Section>
  );
}

export function CommunitySection({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="space-dark relative overflow-hidden py-24 md:py-40"><div className="space-stars" aria-hidden /><div className="grain absolute inset-0 pointer-events-none" aria-hidden />
      <div className="community-globe pointer-events-none absolute z-[1] right-[-20%] top-1/2 h-[700px] w-[700px] -translate-y-1/2 opacity-70 md:right-[-8%]" aria-hidden>
        <ClientOnly fallback={null}><Suspense fallback={null}><Globe /></Suspense></ClientOnly>
      </div>
      <Container className="relative z-10">
        <div className="max-w-[720px]">
          <Label>— 06 / Community</Label>
          <Lines className="mt-8 type-section" lines={["More Than a Marketplace.", <span key="i">A Creative Movement.</span>]} />
          <Reveal delay={0.2}>
            <p className="mt-8 text-[18px] leading-relaxed">The future of filmmaking and advertising won't be built by technology alone. It will be built by people who know how to use it creatively.</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">JOMOVERSE is building a global community where AI creators learn, share, collaborate, experiment and grow together.</p>
            <p className="eyebrow mb-4 mt-10">Community Features</p>
            <List numbered items={["Global creator networking.", "AI filmmaking challenges.", "Creative collaborations.", "Featured creator showcases.", "Industry trends and inspiration.", "Learning and masterclasses."]} />
            {showCta && <Link to="/community" className={`${btn("outline")} mt-10`}>Explore the Community</Link>}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function ShowcaseSection({ showCta = true }: { showCta?: boolean }) {
  const [cat, setCat] = useState<string>("All");
  const [open, setOpen] = useState<ShowcaseItem | null>(null);
  const items = cat === "All" ? showcase : showcase.filter((s) => s.category === cat);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
  return (
    <Section>
      <SectionHead n="07" label="Showcase" lines={["Creativity", <span key="i">Without Limits.</span>]} intro="Explore what happens when imagination meets AI." intro2="Discover inspiring work from emerging AI creators and filmmakers." />
      <div className="mt-16 flex flex-wrap gap-x-6 gap-y-3 border-b border-hairline pb-4" role="tablist">
        {["All", ...showcaseCategories].map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`relative pb-2 text-[14px] transition-colors ${cat === c ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {c}{cat === c && <motion.span layoutId="tab" className="absolute -bottom-[17px] left-0 right-0 h-px bg-primary" />}
          </button>
        ))}
      </div>
      <motion.div layout className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {items.map((s) => (
            <motion.button layout key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} onClick={() => setOpen(s)} className={`group relative mb-4 block w-full overflow-hidden border border-hairline text-left transition-colors hover:border-foreground/30 ${s.ratio === "16:9" ? "aspect-video" : "aspect-[9/16]"}`}>
              <img src={s.image} alt={`${s.category} by ${s.creator}`} loading="lazy" className="film-still h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/50 opacity-70 transition-opacity group-hover:opacity-100"><Play className="h-5 w-5" strokeWidth={1.5} /></span>
              <div className="absolute inset-x-5 bottom-5"><p className="eyebrow">{s.category}</p><p className="mt-1 text-[15px]">{s.creator}</p></div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      {showCta && <div className="mt-12"><Link to="/showcase" className={btn("outline")}>Explore the Creative Universe</Link></div>}
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal aria-label={open.category} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-6" onClick={() => setOpen(null)}>
            <button className="absolute right-6 top-6" onClick={() => setOpen(null)} aria-label="Close"><X className="h-7 w-7" strokeWidth={1.5} /></button>
            <div className="max-h-[85dvh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              {open.video ? <video src={open.video} controls autoPlay className="max-h-[80dvh]" /> : <img src={open.image} alt={open.category} className="max-h-[80dvh] w-auto" />}
              <p className="eyebrow mt-4">{open.category} · {open.creator}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export function FinalCTA() {
  return (
    <section className="space-dark relative flex min-h-[800px] items-center overflow-hidden py-32"><div className="space-stars" aria-hidden /><div className="grain absolute inset-0 pointer-events-none" aria-hidden />
      <div className="pointer-events-none absolute -bottom-[150vw] left-1/2 h-[180vw] w-[180vw] -translate-x-1/2 rounded-full bg-background horizon-glow md:-bottom-[160vw]" aria-hidden />
      <motion.img src={astronautCut} alt="" aria-hidden loading="lazy" width={1024} height={1024} className="pointer-events-none absolute left-1/2 top-[5%] w-24 -translate-x-1/2 opacity-80 md:w-32" animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
      <Container className="relative z-10 text-center">
        <Lines className="mx-auto max-w-[1100px] type-section" lines={["The Future of Creativity Is", "Being Created Right Now.", <span key="i" className="text-brand-teal-bright">Be Part of It.</span>]} />
        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-[56ch] text-[18px]">Join the brands shaping tomorrow and the creators making it possible.</p>
          <p className="mx-auto mt-3 max-w-[60ch] text-muted-foreground">Whether you're looking to hire exceptional creative talent or showcase your AI filmmaking skills, your universe starts here.</p>
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
