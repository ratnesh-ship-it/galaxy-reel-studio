import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, type ReactNode, type InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { budgetRanges, createOptions, specialities, experienceLevels } from "@/config/forms";
import { OrbitMark } from "./Layout";
import { btn, EASE } from "./ui";
import { X } from "lucide-react";

const opt = z.string().trim().max(300).optional().or(z.literal(""));
const req = (m = "Required") => z.string().trim().min(1, m).max(200);

export const brandSchema = z.object({
  company: req(), contact_person: req(), email: z.string().trim().email("Enter a valid email").max(255), phone: z.string().trim().min(5, "Enter a valid phone").max(50),
  website: opt, industry: opt, create_types: z.array(z.string()).default([]), budget: opt,
});
export const creatorSchema = z.object({
  full_name: req(), email: z.string().trim().email("Enter a valid email").max(255), phone: z.string().trim().min(5, "Enter a valid phone").max(50),
  location: opt, portfolio_url: z.string().trim().url("Enter a full URL, e.g. https://…").max(500).optional().or(z.literal("")),
  speciality: opt, tools: z.array(z.string().max(40)).max(20).default([]), experience: opt,
});

function Field({ label, error, full, ...p }: { label: string; error?: string | undefined; full?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`group relative block pt-5 ${full ? "md:col-span-2" : ""}`}>
      <input {...p} placeholder=" " className="peer w-full border-0 border-b border-input bg-transparent pb-2 pt-1 text-[17px] outline-none transition-colors focus:border-primary" />
      <span className="pointer-events-none absolute left-0 top-6 text-[15px] text-muted-foreground transition-all duration-300 peer-focus:top-0 peer-focus:text-[11px] peer-focus:tracking-[0.15em] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:tracking-[0.15em]">{label}</span>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Group({ label, children, full = true }: { label: string; children: ReactNode; full?: boolean }) {
  return <div className={`pt-5 ${full ? "md:col-span-2" : ""}`}><p className="eyebrow mb-3">{label}</p>{children}</div>;
}

const chip = (on: boolean) => `rounded-[3px] border px-3.5 py-2 text-sm transition-colors ${on ? "border-primary text-primary" : "border-input text-muted-foreground hover:text-foreground"}`;

function Select({ value, onChange, options, label }: { value?: string | undefined; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <label className="block pt-5">
      <span className="eyebrow">{label}</span>
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full border-0 border-b border-input bg-transparent pb-2 text-[17px] outline-none focus:border-primary [&>option]:bg-card">
        <option value="">Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

export function Success({ onReset }: { onReset: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="flex flex-col items-start gap-6 py-16">
      <OrbitMark className="h-12 w-12 text-foreground" />
      <h3 className="font-display text-5xl md:text-6xl">Welcome to the <em>JOMOVERSE.</em></h3>
      <p className="max-w-md text-muted-foreground">We've received your registration and will be in touch.</p>
      <button onClick={onReset} className={btn("outline")}>Submit another</button>
    </motion.div>
  );
}

export function BrandForm() {
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const f = useForm({ resolver: zodResolver(brandSchema), defaultValues: { create_types: [] as string[] } });
  const e = f.formState.errors;
  const submit = f.handleSubmit(async (v) => {
    setErr(null);
    const { error } = await supabase.from("brand_registrations").insert({ ...v, website: v.website || null, industry: v.industry || null, budget: v.budget || null });
    if (error) return setErr("Something went wrong. Please try again.");
    f.reset(); setDone(true);
  });
  if (done) return <Success onReset={() => setDone(false)} />;
  return (
    <form onSubmit={submit} noValidate className="grid gap-x-10 gap-y-4 md:grid-cols-2">
      <Field label="Company / Brand Name *" {...f.register("company")} error={e.company?.message} />
      <Field label="Contact Person *" {...f.register("contact_person")} error={e.contact_person?.message} />
      <Field label="Business Email *" type="email" {...f.register("email")} error={e.email?.message} />
      <Field label="Phone / WhatsApp *" type="tel" {...f.register("phone")} error={e.phone?.message} />
      <Field label="Website / Social Media" {...f.register("website")} />
      <Field label="Industry" {...f.register("industry")} />
      <Controller control={f.control} name="create_types" render={({ field }) => (
        <Group label="What do you want to create?">
          <div className="flex flex-wrap gap-2">
            {createOptions.map((o) => { const on = field.value?.includes(o); return <button type="button" key={o} aria-pressed={on} className={chip(!!on)} onClick={() => field.onChange(on ? (field.value ?? []).filter((x: string) => x !== o) : [...(field.value ?? []), o])}>{o}</button>; })}
          </div>
        </Group>
      )} />
      <Controller control={f.control} name="budget" render={({ field }) => <Select label="Estimated Project Budget" value={field.value} onChange={field.onChange} options={budgetRanges} />} />
      <div className="pt-8 md:col-span-2">
        {err && <p className="mb-4 text-sm text-destructive">{err}</p>}
        <button disabled={f.formState.isSubmitting} className={btn()}>{f.formState.isSubmitting ? "Sending…" : "Register Your Brand"}</button>
      </div>
    </form>
  );
}

function TagInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [t, setT] = useState("");
  const add = () => { const v = t.trim(); if (v && !value.includes(v) && value.length < 20) onChange([...value, v]); setT(""); };
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-input pb-2 focus-within:border-primary">
      {value.map((v) => (
        <span key={v} className="inline-flex items-center gap-1 rounded-[3px] border border-input px-2 py-1 text-sm">{v}<button type="button" aria-label={`Remove ${v}`} onClick={() => onChange(value.filter((x) => x !== v))}><X className="h-3 w-3" /></button></span>
      ))}
      <input value={t} maxLength={40} onChange={(e) => setT(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } }} onBlur={add} placeholder="Type a tool and press Enter" className="min-w-[180px] flex-1 bg-transparent py-1 text-[17px] outline-none placeholder:text-muted-foreground/60" />
    </div>
  );
}

export function CreatorForm() {
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const f = useForm({ resolver: zodResolver(creatorSchema), defaultValues: { tools: [] as string[] } });
  const e = f.formState.errors;
  const submit = f.handleSubmit(async (v) => {
    setErr(null);
    const { error } = await supabase.from("creator_registrations").insert({ ...v, location: v.location || null, portfolio_url: v.portfolio_url || null, speciality: v.speciality || null, experience: v.experience || null });
    if (error) return setErr("Something went wrong. Please try again.");
    f.reset(); setDone(true);
  });
  if (done) return <Success onReset={() => setDone(false)} />;
  return (
    <form onSubmit={submit} noValidate className="grid gap-x-10 gap-y-4 md:grid-cols-2">
      <Field label="Full Name *" {...f.register("full_name")} error={e.full_name?.message} />
      <Field label="Email Address *" type="email" {...f.register("email")} error={e.email?.message} />
      <Field label="Phone / WhatsApp *" type="tel" {...f.register("phone")} error={e.phone?.message} />
      <Field label="City / Country" {...f.register("location")} />
      <Field label="Portfolio / Showreel Link" type="url" full {...f.register("portfolio_url")} error={e.portfolio_url?.message} />
      <Controller control={f.control} name="speciality" render={({ field }) => <Select label="Primary Speciality" value={field.value} onChange={field.onChange} options={specialities} />} />
      <Controller control={f.control} name="tools" render={({ field }) => <Group label="AI Tools You Use" full={false}><TagInput value={field.value ?? []} onChange={field.onChange} /></Group>} />
      <Controller control={f.control} name="experience" render={({ field }) => (
        <Group label="Experience Level">
          <div role="radiogroup" className="grid grid-cols-2 border border-input sm:grid-cols-4">
            {experienceLevels.map((o) => <button type="button" role="radio" aria-checked={field.value === o} key={o} onClick={() => field.onChange(o)} className={`border-input px-3 py-3 text-sm transition-colors [&:not(:last-child)]:border-r ${field.value === o ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{o}</button>)}
          </div>
        </Group>
      )} />
      <div className="pt-8 md:col-span-2">
        {err && <p className="mb-4 text-sm text-destructive">{err}</p>}
        <button disabled={f.formState.isSubmitting} className={btn()}>{f.formState.isSubmitting ? "Sending…" : "Join as an AI Creator"}</button>
      </div>
    </form>
  );
}
