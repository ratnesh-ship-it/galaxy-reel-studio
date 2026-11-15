import { createFileRoute, Link } from "@tanstack/react-router";
import nebula from "@/assets/nebula.jpg";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login / Sign Up — JOMOVERSE" }, { name: "description", content: "Access your JOMOVERSE dashboard as a brand or AI creator." }, { property: "og:title", content: "Login / Sign Up — JOMOVERSE" }, { property: "og:description", content: "Access your JOMOVERSE dashboard as a brand or AI creator." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

function Page() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-24">
      <img src={nebula} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
      <form onSubmit={(e) => { e.preventDefault(); toast("Accounts are coming soon to JOMOVERSE."); }} className="w-full max-w-md rounded-3xl glass p-8 shadow-glow">
        <h1 className="text-3xl font-extrabold">Welcome back, <span className="text-cosmic">explorer.</span></h1>
        <input type="email" required placeholder="Email" className="mt-8 w-full rounded-xl border border-input bg-background/50 px-4 py-3 outline-none focus:border-ring" />
        <input type="password" required placeholder="Password" className="mt-3 w-full rounded-xl border border-input bg-background/50 px-4 py-3 outline-none focus:border-ring" />
        <button className="mt-6 w-full rounded-xl bg-gold py-3 font-semibold text-primary-foreground shadow-gold">Login</button>
        <p className="mt-6 text-center text-sm text-muted-foreground">New here? <Link to="/join-creator" className="text-primary">Join as a Creator</Link> or <Link to="/brands" className="text-primary">Register a Brand</Link></p>
      </form>
    </section>
  );
}
