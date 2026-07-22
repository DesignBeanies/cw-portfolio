"use client";

import { useEffect, useRef, useState } from "react";

import type { SectionId } from "@/lib/sections";

type Options = {
  sectionIds: readonly SectionId[];
  rootMargin?: string;
};

function isNearPageBottom() {
  const scrollBottom = window.scrollY + window.innerHeight;
  return scrollBottom >= document.documentElement.scrollHeight - 48;
}

/**
 * Tracks which section is in view via IntersectionObserver.
 * Scroll listener is rAF-throttled for the bottom-of-page Contact edge case.
 */
export function useActiveSection({
  sectionIds,
  rootMargin = "-18% 0px -50% 0px",
}: Options): SectionId {
  const [activeId, setActiveId] = useState<SectionId>(sectionIds[0]);
  const activeIdRef = useRef<SectionId>(sectionIds[0]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const setActive = (nextId: SectionId) => {
      if (activeIdRef.current === nextId) return;
      activeIdRef.current = nextId;
      setActiveId(nextId);
    };

    const pickActive = () => {
      if (isNearPageBottom()) {
        setActive(sectionIds[sectionIds.length - 1]);
        return;
      }

      if (visible.size === 0) return;

      let bestId = sectionIds[0];
      let bestRatio = -1;

      for (const id of sectionIds) {
        const ratio = visible.get(id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      setActive(bestId);
    };

    const schedulePickActive = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        pickActive();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        schedulePickActive();
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    window.addEventListener("scroll", schedulePickActive, { passive: true });
    pickActive();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedulePickActive);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sectionIds, rootMargin]);

  return activeId;
}
