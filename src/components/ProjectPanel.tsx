"use client";

import { useEffect } from "react";
import Image from "next/image";

import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { CaseStudyDetailRow } from "@/components/CaseStudyDetailRow";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Project } from "@/lib/projects";
import {
  typeBody,
  typeLead,
  typeMeta,
  typeRole,
  typeSectionScroll,
  typeSubsection,
} from "@/lib/typography";

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

type ProjectPanelProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

const CASE_STUDY_SECTIONS = [
  { key: "challenge" as const, title: "Challenge" },
  { key: "approach" as const, title: "Approach" },
  { key: "solution" as const, title: "Solution" },
];

export function ProjectPanel({ project, isOpen, onClose }: ProjectPanelProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const transitionClass = prefersReducedMotion ? "" : "panel-slide-transition";

  return (
    <aside
      id="project-panel"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-labelledby={project ? "project-panel-title" : undefined}
      className={`project-panel fixed inset-y-0 right-0 z-50 flex h-[100svh] w-full flex-col bg-bg bg-noise bg-grid ${transitionClass} ${
        isOpen ? "is-open" : "pointer-events-none"
      }`}
    >
      {isOpen && <CursorSpotlight />}
      {project && (
        <>
          <header className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-white/10 bg-bg/95 px-6 py-4 backdrop-blur-sm md:px-10">
            <button
              type="button"
              onClick={onClose}
              className="focus-neon neon-action inline-flex items-center gap-2 px-3 py-2 text-sm font-medium uppercase tracking-widest text-neon-pink"
            >
              <span className="relative z-[1] inline-flex items-center gap-2">
                <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                Back
              </span>
            </button>
            <p className={`${typeMeta} text-text-muted`}>Project</p>
          </header>

          <div className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-6 py-10 md:px-10 md:py-12 lg:px-14 xl:px-20">
            <div className="project-panel-stack">
              <div className="grid w-full gap-8 md:grid-cols-2 md:items-start md:gap-10 lg:gap-12">
                <div className="relative aspect-[16/9] overflow-hidden border border-white/10 bg-surface-raised md:col-start-1 md:row-start-1">
                {project.images.heroMobile ? (
                  <>
                    <Image
                      src={project.images.heroMobile}
                      alt={`${project.title} hero`}
                      fill
                      className="object-cover object-top md:hidden"
                      sizes="100vw"
                      priority
                    />
                    <Image
                      src={project.images.hero}
                      alt={`${project.title} hero`}
                      fill
                      className="hidden object-cover object-top md:block"
                      sizes="50vw"
                      priority
                    />
                  </>
                ) : (
                  <Image
                    src={project.images.hero}
                    alt={`${project.title} hero`}
                    fill
                    className="object-cover object-top"
                    sizes="50vw"
                    priority
                  />
                )}
              </div>

              <div className="md:col-start-2 md:row-start-1">
                <h2 id="project-panel-title" className={`${typeSectionScroll} mb-3`}>
                  {project.title}
                </h2>
                <p className={`${typeMeta} mb-5 text-neon-pink`}>{project.tagline}</p>
                <ul className="mb-6 flex flex-wrap gap-2" aria-label="Skills">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <span className="neon-tag inline-block px-3 py-1.5">{tag}</span>
                    </li>
                  ))}
                </ul>
                <p className={`${typeLead} text-text-primary/90`}>
                  {project.description}
                </p>
              </div>
              </div>

              {CASE_STUDY_SECTIONS.map((section) => (
                <CaseStudyDetailRow
                  key={section.key}
                  label={`The ${section.title}`}
                  body={project[section.key]}
                />
              ))}

              <BeforeAfterSlider
                beforeSrc={project.images.before}
                afterSrc={project.images.after}
                beforeAlt={`${project.title} before`}
                afterAlt={`${project.title} after`}
              />

              <section aria-labelledby="design-build-heading">
                <h3 id="design-build-heading" className={`project-panel-section-heading ${typeSubsection}`}>
                  Design &amp; build
                </h3>
                <div className="project-panel-columns">
                  {project.designBuild.map((column) => (
                    <div key={column.title} className="min-w-0">
                      {column.illustration ? (
                        <div className="mb-6 flex h-40 w-40 items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={column.illustration}
                            alt=""
                            aria-hidden
                            className="block h-full w-full select-none object-contain"
                            draggable={false}
                          />
                        </div>
                      ) : null}
                      <h4 className={`${typeRole} mb-3`}>
                        {column.title}
                      </h4>
                      <p className={`${typeBody} text-text-primary/85`}>{column.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="focus-neon neon-action neon-cta relative inline-flex min-h-[44px] items-center px-6 py-3 text-sm font-medium uppercase tracking-[0.15em]"
                >
                  <span className="relative z-[1] inline-flex items-center gap-2">
                    <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                    Back to projects
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
