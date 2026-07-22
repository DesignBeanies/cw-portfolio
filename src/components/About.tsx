import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import {
  typeDisplay,
  typeLead,
  typeMeta,
} from "@/lib/typography";

export function About() {
  return (
    <Section id="about" className="flex min-h-[85vh] items-center pt-8 md:min-h-screen md:pt-0">
      <div>
        <FadeIn>
          <div className="hero-clip mb-8 inline-block">
            <p className={`${typeMeta} mb-3 text-text-muted`}>
              Senior UX &amp; Product Designer
            </p>
            <h1 id="about-heading" className={`${typeDisplay} text-balance`}>
              Chaela Watkins
            </h1>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p className={`${typeLead} max-ch-prose mb-10 text-text-primary/90`}>
            I design strategic, creative experiences that reduce friction and impact
            those numbers people stare at in meetings.
          </p>
        </FadeIn>

        <FadeIn delay={0.16}>
          <a
            href="#projects"
            className="focus-neon neon-action neon-cta relative inline-flex min-h-[44px] items-center px-6 py-3 text-sm font-medium uppercase tracking-[0.15em]"
          >
            <span className="relative z-[1]">View projects</span>
          </a>
        </FadeIn>
      </div>
    </Section>
  );
}
