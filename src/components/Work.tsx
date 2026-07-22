"use client";

import { FadeIn } from "@/components/FadeIn";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import type { Project } from "@/lib/projects";
import { PROJECTS } from "@/lib/projects";
import {
  typeSectionScroll,
} from "@/lib/typography";

type WorkProps = {
  onProjectSelect: (project: Project) => void;
};

export function Work({ onProjectSelect }: WorkProps) {
  return (
    <Section id="projects" className="py-16 md:py-20 lg:py-24">
      <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
        <FadeIn>
          <h2 id="projects-heading" className={`${typeSectionScroll} mb-2 md:mb-4`}>
            Projects
          </h2>
        </FadeIn>

        {PROJECTS.map((project) => (
          <FadeIn key={project.id}>
            <ProjectCard
              title={project.title}
              tagline={project.tagline}
              description={project.description}
              tags={project.tags}
              image={project.images.hero}
              imageAlt={`${project.title} preview`}
              onSelect={() => onProjectSelect(project)}
            />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
