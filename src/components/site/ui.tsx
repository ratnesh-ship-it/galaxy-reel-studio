import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const btn = (v: "primary" | "outline" = "primary") =>
  v === "primary"
    ? "inline-flex items-center justify-center gap-2 rounded-[3px] bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-px hover:bg-primary-hover hover:glow-teal"
    : "inline-flex items-center justify-center gap-2 rounded-[3px] border border-foreground px-6 py-3.5 text-base font-semibold text-foreground transition-all duration-300 hover:-translate-y-px hover:border-brand-teal-bright hover:text-brand-teal-bright";

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow text-brand-teal-bright ${className}`}>{children}</p>;
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Headline revealed line-by-line behind a mask. Pass each line as a node. */
export function Lines({ lines, as: Tag = "h2", className = "" }: { lines: ReactNode[]; as?: "h1" | "h2"; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <Tag className={`font-display ${className}`}>
      {lines.map((l, i) => (
        <motion.span key={i} className="block overflow-hidden pb-[0.08em]" initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true }}>
          <motion.span
            className="block"
            variants={{ hidden: { y: "105%" }, show: { y: 0 } }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
          >
            {l}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-6 md:px-10 ${className}`}>{children}</div>;
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative py-24 md:py-40 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-hairline py-6" aria-hidden>
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-sans text-lg font-normal text-foreground/80">
            {t}<span className="h-1.5 w-1.5 rounded-full bg-brand-teal-bright" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function List({ items, numbered = false, cols = 1 }: { items: string[]; numbered?: boolean; cols?: 1 | 2 }) {
  return (
    <ul className={`grid border-t border-hairline ${cols === 2 ? "sm:grid-cols-2 sm:gap-x-10" : ""}`}>
      {items.map((it, i) => (
        <li key={it} className="flex items-baseline gap-4 border-b border-hairline py-4 text-lg">
          {numbered ? <span className="w-6 text-xs font-medium text-brand-teal-bright">{String(i + 1).padStart(2, "0")}</span> : <span className="h-px w-3 shrink-0 translate-y-[-4px] bg-muted-foreground" />}
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
