import { createFileRoute } from "@tanstack/react-router";
import { CommunitySection, FinalCTA } from "@/components/site/Sections";
import { Section, Label, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "The JOMOVERSE Community" }, { name: "description", content: "More Than a Marketplace. A Creative Movement. A global community where AI creators learn, share, collaborate and grow." }, { property: "og:title", content: "The JOMOVERSE Community" }, { property: "og:description", content: "More Than a Marketplace. A Creative Movement. A global community where AI creators learn, share, collaborate and grow." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (
    <>
      <div className="pt-20" />
      <CommunitySection showCta={false} />
      <Section className="!pt-0">
        <div className="grid border-t border-hairline md:grid-cols-2">
          {["AI filmmaking challenges.", "Learning and masterclasses."].map((t, i) => (
            <Reveal key={t} delay={i * 0.1} className={`py-14 ${i === 0 ? "md:border-r md:border-hairline md:pr-14" : "border-t border-hairline md:border-t-0 md:pl-14"}`}>
              <Label>Coming soon</Label>
              <h3 className="font-display mt-6 text-5xl">{t}</h3>
            </Reveal>
          ))}
        </div>
      </Section>
      <FinalCTA />
    </>
  ),
});
