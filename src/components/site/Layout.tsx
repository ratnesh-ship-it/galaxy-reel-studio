import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Orbit } from "lucide-react";

const nav = [
  { to: "/creators", label: "Discover Creators" },
  { to: "/showcase", label: "AI Films & Ads" },
  { to: "/brands", label: "For Brands" },
  { to: "/join-creator", label: "For Creators" },
  { to: "/community", label: "Community" },
  { to: "/about", label: "About" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight">
      <Orbit className="h-6 w-6 text-cyan" />
      <span>JOMO<span className="text-cosmic">VERSE</span></span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-full glass px-5 py-3 mx-3 md:mx-auto">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Login</Link>
          <Link to="/join-creator" className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-primary-foreground shadow-gold">Start Creating</Link>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="mx-3 mt-2 flex flex-col gap-3 rounded-2xl glass p-5 lg:hidden">
          {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>)}
          <Link to="/login" onClick={() => setOpen(false)}>Login / Sign Up</Link>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">Where Brands Meet AI Creators. The global creative marketplace for the AI creator economy.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          {nav.map((n) => <Link key={n.to} to={n.to} className="hover:text-foreground">{n.label}</Link>)}
        </div>
        <p className="text-sm text-muted-foreground md:text-right">© {new Date().getFullYear()} JOMOVERSE. Create. Collaborate. Get Discovered. Get Hired.</p>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, sub, image }: { eyebrow: string; title: React.ReactNode; sub: string; image: string }) {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden pb-16 pt-36">
      <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60 animate-drift" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-extrabold leading-[1.02] md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{sub}</p>
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-6 py-20 ${className}`}>{children}</section>;
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cosmic shadow-glow" />{i}</li>
      ))}
    </ul>
  );
}
