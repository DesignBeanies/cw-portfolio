"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { Experience } from "@/components/Experience";
import { ProjectPanel } from "@/components/ProjectPanel";
import { SideNav } from "@/components/SideNav";
import { Work } from "@/components/Work";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollLock } from "@/hooks/useScrollLock";
import { PANEL_TRANSITION_MS } from "@/lib/motion";
import type { Project } from "@/lib/projects";

export function PortfolioShell() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const isPanelMounted = activeProject !== null;

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current === null) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const openProject = useCallback(
    (project: Project) => {
      clearCloseTimer();
      setActiveProject(project);
      setIsPanelVisible(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsPanelVisible(true));
      });
    },
    [clearCloseTimer],
  );

  const closePanel = useCallback(() => {
    clearCloseTimer();
    setIsPanelVisible(false);

    const delay = prefersReducedMotion ? 0 : PANEL_TRANSITION_MS;
    closeTimerRef.current = window.setTimeout(() => {
      setActiveProject(null);
      closeTimerRef.current = null;
    }, delay);
  }, [clearCloseTimer, prefersReducedMotion]);

  useScrollLock(isPanelMounted);

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }

    scrollToTop();
    requestAnimationFrame(() => {
      scrollToTop();
      requestAnimationFrame(scrollToTop);
    });
  }, []);

  const pushTransition = prefersReducedMotion ? "" : "panel-slide-transition";

  return (
    <div className="relative overflow-x-clip">
      <SideNav />

      <div
        className={`portfolio-stage bg-noise bg-grid relative ${pushTransition} ${
          isPanelVisible ? "is-pushed" : ""
        } ${isPanelMounted ? "pointer-events-none" : ""}`}
        aria-hidden={isPanelVisible}
      >
        {!isPanelMounted && <CursorSpotlight />}

        <main
          id="main"
          className="relative z-10 ml-0 min-h-[100svh] pt-mobile-nav md:ml-nav md:pt-0"
        >
          <div
            className={`page-container ${isPanelVisible ? "!max-w-none" : ""}`}
          >
            <About />
            <Experience />
            <Work onProjectSelect={openProject} />
            <Contact />
          </div>
        </main>
      </div>

      <ProjectPanel
        project={activeProject}
        isOpen={isPanelVisible}
        onClose={closePanel}
      />
    </div>
  );
}
