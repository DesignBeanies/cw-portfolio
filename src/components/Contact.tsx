import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { typeMeta, typeSectionScroll } from "@/lib/typography";

const LINKS = [
  {
    label: "Email",
    href: "mailto:designbeanies@gmail.com",
    external: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chaelawatkins",
    external: true,
  },
] as const;

export function Contact() {
  return (
    <Section
      id="contact"
      className="flex min-h-screen flex-col justify-center pb-32 md:pb-40"
    >
      <FadeIn>
        <h2 id="contact-heading" className={`${typeSectionScroll} mb-10`}>
          Let&apos;s chat IRL
        </h2>
      </FadeIn>

      <FadeIn>
        <div className="flex flex-row gap-4">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="focus-neon neon-action neon-action-fill group relative flex min-h-[44px] flex-1 items-center justify-center border border-white/10 bg-surface px-6 py-4"
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className={`${typeMeta} relative z-[1] text-text-muted transition-colors group-hover:text-neon-pink`}>
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
