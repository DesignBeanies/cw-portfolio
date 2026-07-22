"use client";

import { useCallback } from "react";

import { useActiveSection } from "@/hooks/useActiveSection";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SECTION_IDS, SECTIONS, type SectionId } from "@/lib/sections";
import { typeMeta, typeNav } from "@/lib/typography";

function scrollToSection(id: SectionId, smooth: boolean) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
    block: "start",
  });
}

function NavLink({
  id,
  number,
  label,
  isActive,
  onNavigate,
  variant,
}: {
  id: SectionId;
  number: string;
  label: string;
  isActive: boolean;
  onNavigate: (id: SectionId) => void;
  variant: "sidebar" | "mobile";
}) {
  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={() => onNavigate(id)}
        aria-label={isActive ? undefined : `${number}, ${label}`}
        aria-current={isActive ? "true" : undefined}
        className={`focus-neon neon-action flex h-11 shrink-0 items-center justify-center border ${
          isActive
            ? "gap-1.5 border-neon-pink px-2.5 text-neon-pink nav-active-glow"
            : "w-11 border-white/15 text-text-muted"
        }`}
      >
        <span className={`${typeMeta} relative z-[1]`}>{number}</span>
        {isActive ? (
          <span className={`${typeNav} relative z-[1] whitespace-nowrap`}>
            {label}
          </span>
        ) : null}
      </button>
    );
  }

  return (
    <li className="w-full">
      <button
        type="button"
        onClick={() => onNavigate(id)}
        aria-current={isActive ? "true" : undefined}
        className={`focus-neon neon-action group relative flex w-full min-h-[44px] items-center gap-3 py-2 pl-6 pr-4 text-left ${
          isActive
            ? "text-neon-pink"
            : "text-text-muted hover:text-text-primary"
        }`}
      >
        {isActive && (
          <span
            className="absolute left-0 top-1/2 z-[1] h-6 w-0.5 -translate-y-1/2 animate-neon-pulse bg-neon-pink"
            style={{ boxShadow: "var(--glow-pink)" }}
            aria-hidden
          />
        )}
        <span
          className={`${typeMeta} relative z-[1] w-6 shrink-0 ${isActive ? "nav-active-glow" : ""}`}
        >
          {number}
        </span>
        <span className={`${typeNav} relative z-[1] ${isActive ? "nav-active-glow" : ""}`}>
          {label}
        </span>
      </button>
    </li>
  );
}

export function SideNav() {
  const activeId = useActiveSection({ sectionIds: SECTION_IDS });
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleNavigate = useCallback(
    (id: SectionId) => {
      scrollToSection(id, !prefersReducedMotion);
    },
    [prefersReducedMotion],
  );

  return (
    <>
      {/* Desktop sidebar */}
      <nav
        aria-label="Portfolio sections"
        className="fixed left-0 top-0 z-50 hidden h-screen w-nav flex-col border-r border-white/10 bg-surface/95 backdrop-blur-sm md:flex"
      >
        <div className="border-b border-white/10 px-6 py-8">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate("about");
            }}
            className="focus-neon font-display text-xs font-bold uppercase tracking-[0.18em] text-neon-pink"
          >
            Chaela Watkins
          </a>
        </div>

        <div className="flex flex-1 flex-col py-8">
          <ul className="flex w-full flex-col gap-1">
            {SECTIONS.map((section) => (
              <NavLink
                key={section.id}
                id={section.id}
                number={section.number}
                label={section.label}
                isActive={activeId === section.id}
                onNavigate={handleNavigate}
                variant="sidebar"
              />
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile top bar */}
      <nav
        aria-label="Portfolio sections"
        className="fixed left-0 right-0 top-0 z-50 flex h-mobile-nav items-center justify-between border-b border-white/10 bg-surface/95 px-4 backdrop-blur-sm md:hidden"
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("about");
          }}
          className="focus-neon font-display text-[10px] font-bold uppercase leading-tight tracking-[0.14em] text-neon-pink"
        >
          Chaela Watkins
        </a>

        <div className="flex gap-2">
          {SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              id={section.id}
              number={section.number}
              label={section.label}
              isActive={activeId === section.id}
              onNavigate={handleNavigate}
              variant="mobile"
            />
          ))}
        </div>
      </nav>
    </>
  );
}
