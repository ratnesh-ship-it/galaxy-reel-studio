import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { Menu, X, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { Container, btn, EASE } from "./ui";

const Starfield = lazy(() => import("@/components/three/Starfield"));

export const nav = [
  { to: "/discover", label: "Discover Creators" },
  { to: "/showcase", label: "AI Films & Ads" },
  { to: "/brands", label: "For Brands" },
  { to: "/creators", label: "For Creators" },
  { to: "/community", label: "Community" },
] as const;

export function BrandLogo({ className = "h-[18px] w-auto md:h-[22px]" }: { className?: string }) {
  return <img src="/brand/jomoverse-logo-white.png" width={1513} height={193} alt="JOMOVERSE" className={className} />;
}

export function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="JOMOVERSE home" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}>
      <span className="nav-logo relative block"><BrandLogo /><span className="nav-logo-teal absolute inset-0" aria-hidden /></span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => { if (!open) return; const html = document.documentElement.style.overflow, body = document.body.style.overflow; document.documentElement.style.overflow = "hidden"; document.body.style.overflow = "hidden"; const escape = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); }; window.addEventListener("keydown", escape); return () => { document.documentElement.style.overflow = html; document.body.style.overflow = body; window.removeEventListener("keydown", escape); }; }, [open]);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-[90] bg-background transition-colors duration-500 ${scrolled ? "border-b border-hairline bg-background" : "border-b border-transparent"}`}>
      <Container className="flex h-16 md:h-[72px] items-center justify-between">
        <Wordmark />
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="border-b border-transparent pb-1 text-[13px] text-muted-foreground transition-colors hover:text-brand-teal-bright" activeOptions={{ exact: true }} activeProps={{ className: "!border-primary !text-foreground" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-6 xl:flex">
          <Button asChild className={`${btn()} h-auto !px-4 !py-2 !text-base`}><Link to="/join">Join JOMOVERSE</Link></Button>
        </div>
        <Button variant="ghost" size="icon" className="xl:hidden min-h-12 min-w-12" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-6 w-6" strokeWidth={1.5} /></Button>
      </Container>
        {open && createPortal(
          <div role="dialog" aria-modal="true" aria-label="Navigation menu" className="fixed inset-0 z-[100] flex h-[100dvh] flex-col overflow-y-auto bg-background">
            <Container className="flex h-16 md:h-[72px] items-center justify-between">
              <div onClick={() => setOpen(false)}><Wordmark /></div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-6 w-6" strokeWidth={1.5} /></Button>
            </Container>
            <Container className="flex flex-1 flex-col justify-center gap-3 py-6">
              {[...nav, { to: "/join" as const, label: "Join JOMOVERSE" }].map((n, i) => (
                <motion.div key={n.to + n.label} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i, duration: 0.6, ease: EASE }}>
                  <Link to={n.to} onClick={() => setOpen(false)} className="font-sans text-2xl font-medium">{n.label}</Link>
                </motion.div>
              ))}
            </Container>
          </div>, document.body
        )}
    </header>
  );
}

export function SiteFooter() {
  const cols = [
    { h: "Platform", l: [["/discover", "Discover Creators"], ["/showcase", "AI Films & Ads"], ["/community", "Community"]] },
    { h: "Join", l: [["/brands", "For Brands"], ["/creators", "For Creators"]] },
  ] as const;
  return (
    <footer className="space-dark relative z-10 border-t border-hairline pt-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-6"><Wordmark /></div>
            <p className="font-display text-3xl">Where Brands Meet <span>AI Creators</span></p>
          </div>
          {cols.map((c) => (
            <div key={c.h} className="md:col-span-2">
              <p className="eyebrow mb-5">{c.h}</p>
              <ul className="space-y-3 text-[15px]">
                {c.l.map(([to, label]) => <li key={label}><Link to={to} className="text-foreground/80 hover:text-foreground">{label}</Link></li>)}
              </ul>
            </div>
          ))}
          <div className="flex gap-4 md:col-span-1 md:justify-end">
            {[Instagram, Linkedin, Youtube].map((I, i) => <a key={i} href="#" aria-label="Social link" className="text-muted-foreground hover:text-foreground"><I className="h-5 w-5" strokeWidth={1.5} /></a>)}
            <a href="#" aria-label="X" className="text-muted-foreground hover:text-foreground"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l16 16M20 4L4 20" /></svg></a>
          </div>
        </div>
      </Container>
      <Container className="mt-16"><Watermark /></Container>
      <Container className="flex flex-col gap-2 border-t border-hairline py-6 text-sm text-muted-foreground md:flex-row md:justify-between">
        <span>© 2026 JOMOVERSE. All rights reserved.</span>
        <a href="mailto:" className="hover:text-brand-teal-bright">Contact</a>
        <span>Astronaut 3D model by Poly by Google, licensed CC-BY 3.0.</span>
      </Container>
    </footer>
  );
}

function Watermark() {
  return <div className="logo-watermark relative" onPointerMove={e => { const r=e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--spot-x", `${e.clientX-r.left}px`); e.currentTarget.style.setProperty("--spot-y", `${e.clientY-r.top}px`); }}><img src="/brand/jomoverse-logo-white.png" width={1513} height={193} alt="JOMOVERSE" className="w-full select-none opacity-[0.07]"/><span className="watermark-art absolute inset-0" aria-hidden><span className="watermark-light absolute inset-0" /></span></div>;
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0, moved = false;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; if (!moved) { rx=x; ry=y; moved=true; } setVisible(true); if (dot.current) dot.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`; };
    const loop = () => { rx += (x - rx) * 0.15; ry += (y - ry) * 0.15; if (ring.current) ring.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`; raf = requestAnimationFrame(loop); };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move); document.addEventListener("mouseleave", leave); loop();
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); cancelAnimationFrame(raf); document.documentElement.classList.remove("has-cursor"); };
  }, []);
  return (
    <div className={`pointer-events-none fixed left-0 top-0 z-50 custom-cursor hidden [@media(pointer:fine)]:block ${visible ? "opacity-100" : "opacity-0"}`} aria-hidden>
      <div ref={dot} className="absolute h-1.5 w-1.5 rounded-full bg-brand-teal-bright" />
      <div ref={ring} className="absolute h-8 w-8 rounded-full border border-brand-teal-bright/50" />
    </div>
  );
}

function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0; let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.1 });
      const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    });
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); };
  }, []);
  return null;
}

export function SpaceBackdrop() {
 return null;
}
