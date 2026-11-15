import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { OrbitMark } from "@/components/site/Layout";
import { btn } from "@/components/site/ui";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { mode?: "signup" } => (s["mode"] === "signup" ? { mode: "signup" } : {}),
  head: () => ({ meta: [{ title: "Login / Sign Up — JOMOVERSE" }, { name: "description", content: "Access your JOMOVERSE dashboard as a brand or AI creator." }, { property: "og:title", content: "Login / Sign Up — JOMOVERSE" }, { property: "og:description", content: "Access your JOMOVERSE dashboard as a brand or AI creator." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

const schema = z.object({ email: z.string().trim().email("Enter a valid email").max(255), password: z.string().min(8, "At least 8 characters").max(72) });

function Page() {
  const { mode } = Route.useSearch();
  const nav = useNavigate();
  const [signup, setSignup] = useState(mode === "signup");
  const [role, setRole] = useState<"brand" | "creator">("brand");
  const [email, setEmail] = useState(""), [pw, setPw] = useState("");
  const [msg, setMsg] = useState<{ t: "err" | "ok"; m: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setMsg(null);
    const r = schema.safeParse({ email, password: pw });
    if (!r.success) return setMsg({ t: "err", m: r.error.issues[0]?.message ?? "Invalid input" });
    setBusy(true);
    if (signup) {
      const { error } = await supabase.auth.signUp({ email, password: pw, options: { emailRedirectTo: window.location.origin, data: { role } } });
      setMsg(error ? { t: "err", m: error.message } : { t: "ok", m: "Check your email to confirm your account." });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) setMsg({ t: "err", m: error.message }); else nav({ to: "/" });
    }
    setBusy(false);
  };
  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) setMsg({ t: "err", m: "Google sign-in failed. Please try again." });
    else if (!r.redirected) nav({ to: "/" });
  };
  const input = "w-full border-0 border-b border-input bg-transparent pb-2 pt-1 text-[17px] outline-none placeholder:text-muted-foreground focus:border-primary";

  return (
    <section className="flex min-h-[100svh] items-center justify-center px-6 pb-16 pt-28">
      <div className="w-full max-w-[440px] border border-hairline bg-card/80 p-8 backdrop-blur-md md:p-10">
        <OrbitMark className="h-8 w-8" />
        <h1 className="font-display mt-6 text-5xl">{signup ? <>Join the <em>JOMOVERSE.</em></> : <>Welcome <em>back.</em></>}</h1>
        {signup && (
          <div role="radiogroup" aria-label="I am" className="mt-8 grid grid-cols-2 border border-input">
            {(["brand", "creator"] as const).map((r) => <button key={r} type="button" role="radio" aria-checked={role === r} onClick={() => setRole(r)} className={`py-3 text-sm ${role === r ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{r === "brand" ? "I'm a Brand" : "I'm an AI Creator"}</button>)}
          </div>
        )}
        <button type="button" onClick={google} className="mt-8 flex h-11 w-full items-center justify-center gap-2.5 rounded-[3px] border border-[#8E918F] bg-[#131314] px-3 text-sm font-medium text-[#E3E3E3]">
          <svg aria-hidden="true" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
          Continue with Google
        </button>
        <div className="my-8 flex items-center gap-4"><span className="h-px flex-1 bg-hairline" /><span className="eyebrow">or</span><span className="h-px flex-1 bg-hairline" /></div>
        <form onSubmit={submit} noValidate className="space-y-6">
          <input type="email" autoComplete="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
          <input type="password" autoComplete={signup ? "new-password" : "current-password"} placeholder="Password" aria-label="Password" value={pw} onChange={(e) => setPw(e.target.value)} className={input} />
          {msg && <p className={`text-sm ${msg.t === "err" ? "text-destructive" : "text-primary"}`}>{msg.m}</p>}
          <button disabled={busy} className={`${btn()} w-full`}>{busy ? "Please wait…" : signup ? "Sign Up" : "Login"}</button>
        </form>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {signup ? "Already have an account?" : "New to JOMOVERSE?"}{" "}
          <button type="button" onClick={() => { setSignup(!signup); setMsg(null); }} className="text-foreground underline underline-offset-4">{signup ? "Login" : "Sign Up"}</button>
        </p>
      </div>
    </section>
  );
}
