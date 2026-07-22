import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { EXPERIENCE, SKILLS, TEAM_STRENGTHS } from "@/lib/about";
import {
  typeCardDetail,
  typeCardTitle,
  typeMeta,
  typePill,
  typeRole,
  typeSectionScroll,
  typeSubsection,
} from "@/lib/typography";

export function Experience() {
  return (
    <Section id="experience" className="min-h-screen pt-24 md:pt-32 lg:pt-40">
      <FadeIn>
        <div className="mb-12 flex flex-col gap-10 lg:grid lg:grid-cols-[3fr_2fr] lg:items-stretch lg:gap-x-12">
          <div className="min-w-0">
            <h2 id="experience-heading" className={`${typeSectionScroll} mb-10`}>
              Experience
            </h2>
            <ul className="space-y-10">
              {EXPERIENCE.map((role) => (
                <li key={`${role.company}-${role.title}`}>
                  <p className={typeRole}>{role.title}</p>
                  <p className={`${typeMeta} mt-1 normal-case tracking-wide text-text-muted`}>
                    {role.company} · {role.dates}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <aside
            aria-label="What I bring to a team"
            className="border border-white/10 bg-surface p-5 lg:flex lg:min-h-full lg:w-full lg:flex-col lg:p-8"
          >
            <p className={`${typeMeta} mb-6 text-text-muted lg:mb-8`}>
              What I bring to a team
            </p>
            <dl className="flex flex-col gap-6 lg:flex-1 lg:justify-between lg:gap-0">
              {TEAM_STRENGTHS.map((strength) => (
                <div key={strength.title}>
                  <dt className={`${typeCardTitle} text-neon-pink`}>
                    {strength.title}
                  </dt>
                  <dd className={`${typeCardDetail} mt-1.5 lg:mt-2`}>
                    {strength.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </FadeIn>

      <FadeIn>
        <h3 className={`${typeSubsection} mb-5`}>Core skills</h3>
        <ul className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <li key={skill}>
              <span className={`${typePill} neon-tag inline-block px-3 py-2`}>
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </Section>
  );
}
