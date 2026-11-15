import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-astronaut.jpg";
import nebula from "@/assets/nebula.jpg";
import { Section, CheckList } from "@/components/site/Layout";
import { universe, showcase } from "@/lib/content";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "JOMOVERSE — Launch Your First AI Film Today" }, { name: "description", content: "Where brands meet AI creators. Discover AI filmmakers and turn ideas into extraordinary brand films and ads." }, { property: "og:title", content: "JOMOVERSE — Launch Your First AI Film Today" }, { property: "og:description", content: "Where brands meet AI creators. Discover AI filmmakers and turn ideas into extraordinary brand films and ads." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Home,
});

const steps = [
  ["01", "Discover", "Explore a universe of AI Creators, Filmmakers and creative specialists."],
  ["02", "Connect", "Share your ideas, post projects and connect with the right creative talent."],
  ["03", "Collaborate", "Work together to transform concepts into extraordinary creative experiences."],
  ["04", "Create & Grow", "Launch campaigns, build portfolios, secure projects and grow your creative journey."],
];

function Home() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-28">
        <img src={hero} alt="Astronaut floating before a spiral galaxy" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover animate-drift" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-background to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan"><Sparkles className="h-3.5 w-3.5" /> Where Brands Meet AI Creators</span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[0.98] md:text-7xl">Launch Your First <span className="text-cosmic">AI Film.</span><br />Your First AI Ad. Today.</h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">Discover talented AI Filmmakers, AI Creators and visual storytellers. Turn your ideas into extraordinary brand films, advertisements and creative campaigns.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/brands" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-105">Register as a Brand <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/join-creator" className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 font-semibold transition-colors hover:border-cyan">Join as an AI Creator</Link>
            </div>
            <p className="mt-8 font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">Create · Collaborate · Get Discovered · Get Hired</p>
          </div>
        </div>
      </section>

      <Section>
        <h2 className="text-center text-4xl font-extrabold md:text-6xl">One Platform. Two Creative Worlds.<br /><span className="text-cosmic">Infinite Possibilities.</span></h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">Whether you're a brand looking for creative talent or an AI creator looking for exciting opportunities, there's a place for you in JOMOVERSE.</p>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            { t: "For Brands & Businesses", h: "Your Next Big Campaign Starts Here.", items: ["Discover AI Creators and Filmmakers.", "Post creative projects and briefs.", "Hire talent for AI films and advertisements.", "Build long-term creative partnerships.", "Bring your brand vision to life."], to: "/brands" as const, cta: "Register Your Brand" },
            { t: "For AI Creators & Filmmakers", h: "Your Creativity Deserves a Global Stage.", items: ["Build your professional AI portfolio.", "Showcase films, ads and creative projects.", "Get discovered by global brands.", "Receive project opportunities.", "Collaborate and monetize your skills."], to: "/join-creator" as const, cta: "Join as an AI Creator" },
          ].map((c) => (
            <div key={c.t} className="group relative overflow-hidden rounded-3xl glass p-10 transition-shadow hover:shadow-glow">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cosmic opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan">{c.t}</p>
              <h3 className="mt-3 text-3xl font-bold">{c.h}</h3>
              <div className="mt-6 text-muted-foreground"><CheckList items={c.items} /></div>
              <Link to={c.to} className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">{c.cta} <ArrowRight className="h-4 w-4" /></Link>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan">Discover the Creative Universe</p>
            <h2 className="mt-3 text-4xl font-extrabold md:text-6xl">One Universe. Infinite Creative Possibilities.</h2>
          </div>
          <Link to="/showcase" className="rounded-full glass px-6 py-3 font-semibold hover:border-cyan">Explore Creative Work</Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {universe.map((u) => (
            <div key={u.title} className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
              <img src={u.img} alt={u.title} loading="lazy" width={768} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"><span className="rounded-full glass p-4"><Play className="h-6 w-6" /></span></div>
              <div className="absolute bottom-0 p-5">
                <h3 className="text-xl font-bold">{u.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden py-24">
        <img src={nebula} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-cyan">How JOMOVERSE Works</p>
          <h2 className="mt-3 text-center text-4xl font-extrabold md:text-6xl">From Imagination to Creation.</h2>
          <div className="relative mt-16 grid gap-6 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-cosmic md:block" />
            {steps.map(([n, t, d]) => (
              <div key={n} className="relative">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-background font-display text-xl font-bold shadow-glow ring-1 ring-accent">{n}</div>
                <h3 className="mt-6 text-2xl font-bold">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <h2 className="text-4xl font-extrabold md:text-6xl">Creativity <span className="text-cosmic">Without Limits.</span></h2>
        <p className="mt-3 text-muted-foreground">Explore what happens when imagination meets AI.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-4 md:grid-rows-2">
          {showcase.slice(0, 5).map((s, i) => (
            <div key={s.title} className={`group relative overflow-hidden rounded-2xl border border-border ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3]"}`}>
              <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-0 p-4"><p className="text-xs uppercase tracking-widest text-cyan">{s.cat}</p><p className="font-display text-lg font-bold">{s.title}</p></div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-[2rem] glass p-10 text-center md:p-20">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-violet opacity-30 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-cyan opacity-20 blur-3xl" />
          <h2 className="relative text-4xl font-extrabold md:text-6xl">The Future of Creativity Is Being Created Right Now. <span className="text-cosmic">Be Part of It.</span></h2>
          <p className="relative mx-auto mt-6 max-w-2xl text-muted-foreground">Join the brands shaping tomorrow and the creators making it possible. Your universe starts here.</p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/brands" className="rounded-full bg-gold px-8 py-4 font-semibold text-primary-foreground shadow-gold">I'm a Brand</Link>
            <Link to="/join-creator" className="rounded-full glass px-8 py-4 font-semibold">I'm an AI Creator</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
