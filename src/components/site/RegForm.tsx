import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

export type Field = { name: string; label: string; type?: string; options?: string[]; required?: boolean };

export function RegForm({ title, fields, cta }: { title: string; fields: Field[]; cta: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const shape: Record<string, z.ZodTypeAny> = {};
    for (const f of fields) {
      let s = z.string().trim().max(300);
      if (f.type === "email") s = s.email("Enter a valid email");
      shape[f.name] = f.required === false ? s.optional().or(z.literal("")) : s.min(1, "Required");
    }
    const r = z.object(shape).safeParse(data);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    e.currentTarget.reset();
    toast.success("Welcome to JOMOVERSE! We'll be in touch soon.");
  };
  const cls = "mt-1.5 w-full rounded-xl border border-input bg-background/50 px-4 py-3 outline-none transition-colors focus:border-ring";
  return (
    <form onSubmit={onSubmit} className="rounded-3xl glass p-8 shadow-glow" noValidate>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.name} className={`text-sm text-muted-foreground ${f.options && f.options.length > 5 ? "sm:col-span-2" : ""}`}>
            {f.label}
            {f.options ? (
              <select name={f.name} defaultValue="" className={cls}>
                <option value="" disabled>Select…</option>
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <input name={f.name} type={f.type ?? "text"} className={cls} />
            )}
            {errors[f.name] && <span className="mt-1 block text-xs text-destructive">{errors[f.name]}</span>}
          </label>
        ))}
      </div>
      <button className="mt-8 w-full rounded-xl bg-gold py-4 font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-[1.01]">{cta}</button>
    </form>
  );
}
