import { createFileRoute, Link } from "@tanstack/react-router";
import music from "@/assets/tile-music.jpg";
import { PageHero, Section } from "@/components/site/Layout";
import { Globe, Trophy, Users, Star, TrendingUp, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "The JOMOVERSE Community" }, { name: "description", content: "A global creative movement where AI creators learn, share, collaborate and grow together." }, { property: "og:title", content: "The JOMOVERSE Community" }, { property: "og:description", content: "A global creative movement where AI creators learn, share, collaborate and grow together." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Page,
});

const f = [[Globe, "Global creator networking"], [Trophy, "AI filmmaking challenges"], [Users, "Creative collaborations"], [Star, "Featured creator showcases"], [TrendingUp, "Industry trends and inspiration"], [GraduationCap, "Learning and masterclasses"]] as const;

function Page() {
  return (
    <>
      <PageHero image={music} eyebrow="The JOMOVERSE Community" title={<>More Than a Marketplace. <span className="text-cosmic">A Creative Movement.</span></>} sub="The future of filmmaking and advertising won't be built by technology alone. It will be built by people who know how to use it creatively." />
      <Section className="pt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {f.map(([I, t]) => (
            <div key={t} className="rounded-2xl glass p-8 transition-shadow hover:shadow-glow">
              <I className="h-8 w-8 text-cyan" />
              <h3 className="mt-5 text-xl font-bold">{t}</h3>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center"><Link to="/join-creator" className="rounded-full bg-gold px-8 py-4 font-semibold text-primary-foreground shadow-gold">Join the Community</Link></div>
      </Section>
    </>
  );
}
