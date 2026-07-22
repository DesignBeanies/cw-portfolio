import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import {
  typeLead,
  typeMeta,
  typeSectionScroll,
} from "@/lib/typography";

const LINKS = [
  {
    label: "Email",
    href: "mailto:designbeanies@gmail.com",
    display: "designbeanies@gmail.com",
    external: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chaelawatkins",
    display: "linkedin.com/in/chaelawatkins",
    external: true,
  },
];

export function Contact() {
  return (
    <Section
      id="contact"
      className="flex min-h-screen flex-col justify-center pb-32 md:pb-40"
    >
      <FadeIn>
        <h2 id="contact-heading" className={`${typeSectionScroll} mb-4`}>
          Let&apos;s chat IRL
        </h2>
        <p className={`${typeLead} max-ch-prose mb-10 text-text-primary/85`}>
          If you&apos;ve made it this far, I&apos;m getting the feeling we might
          work well together, and I&apos;d love to know what brought you here.
        </p>
      </FadeIn>

      <FadeIn>
        <ul className="space-y-4">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="focus-neon neon-action neon-action-fill group relative flex min-h-[44px] items-center gap-4 border border-white/10 bg-surface px-6 py-4"
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className={`${typeMeta} relative z-[1] w-20 shrink-0 text-neon-pink`}>
                  {link.label}
                </span>
                <span className="relative z-[1] text-text-primary/90 transition-colors group-hover:text-neon-pink">
                  {link.display}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>
    </Section>
  );
}
