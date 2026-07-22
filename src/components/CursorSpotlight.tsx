"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Lower = more lag; higher = snappier follow */
const FOLLOW_EASE = 0.09;

/**
 * Pink spotlight that eases toward the pointer. Disabled for reduced motion
 * and touch-only devices.
 */
export function CursorSpotlight() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -9999, y: -9999 });
  const currentRef = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef<number | null>(null);
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => {
      setEnabled(finePointer.matches && !prefersReducedMotion);
    };
    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);
    return () => finePointer.removeEventListener("change", updateEnabled);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const el = spotlightRef.current;
    if (!el) return;

    let running = true;
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      if (!running) return;

      if (!isScrolling) {
        const target = targetRef.current;
        const current = currentRef.current;

        if (!hasEnteredRef.current && target.x > -9000) {
          current.x = target.x;
          current.y = target.y;
          hasEnteredRef.current = true;
        } else {
          current.x += (target.x - current.x) * FOLLOW_EASE;
          current.y += (target.y - current.y) * FOLLOW_EASE;
        }

        el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    const onScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 120);
    };

    const onMove = (event: PointerEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
    };

    const onLeave = () => {
      targetRef.current = { x: -9999, y: -9999 };
      hasEnteredRef.current = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      running = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={spotlightRef}
      aria-hidden
      className="cursor-spotlight pointer-events-none fixed left-0 top-0 z-[20]"
    />
  );
}
