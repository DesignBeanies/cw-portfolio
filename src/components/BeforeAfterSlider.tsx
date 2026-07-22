"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { typeMeta, typeSubsection } from "@/lib/typography";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
};

const FRAME_HEIGHT_PX = 920;
const DRAG_THRESHOLD_PX = 8;

function snapPosition(position: number) {
  const clamped = Math.min(100, Math.max(0, position));
  if (clamped <= 1) return 0;
  if (clamped >= 99) return 100;
  return clamped;
}

/** Before on top — left of the handle shows before; right reveals after underneath. */
function beforeClipPath(position: number) {
  const p = snapPosition(position);
  if (p <= 0) return "inset(0 100% 0 0)";
  if (p >= 100) return "none";
  return `polygon(0% 0%, ${p}% 0%, ${p}% 100%, 0% 100%)`;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className = "",
}: BeforeAfterSliderProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragCleanupRef = useRef<(() => void) | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number; pointerId: number } | null>(
    null,
  );
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const split = snapPosition(position);
  const clip = beforeClipPath(position);

  useEffect(() => {
    setPosition(50);
  }, [beforeSrc, afterSrc]);

  useEffect(() => {
    return () => dragCleanupRef.current?.();
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    const element = frameRef.current;
    if (!element) return;

    const { left, width } = element.getBoundingClientRect();
    if (width <= 0) return;

    const x = Math.min(Math.max(clientX - left, 0), width);
    setPosition(snapPosition((x / width) * 100));
  }, []);

  const endDrag = useCallback(() => {
    pointerStartRef.current = null;
    if (!isDraggingRef.current) {
      dragCleanupRef.current?.();
      dragCleanupRef.current = null;
      return;
    }
    isDraggingRef.current = false;
    setIsDragging(false);
    dragCleanupRef.current?.();
    dragCleanupRef.current = null;
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    dragCleanupRef.current?.();
    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    };

    const onMove = (moveEvent: PointerEvent) => {
      if (pointerStartRef.current?.pointerId !== moveEvent.pointerId) return;

      if (!isDraggingRef.current) {
        const dx = moveEvent.clientX - pointerStartRef.current.x;
        const dy = moveEvent.clientY - pointerStartRef.current.y;

        if (
          Math.abs(dx) < DRAG_THRESHOLD_PX &&
          Math.abs(dy) < DRAG_THRESHOLD_PX
        ) {
          return;
        }

        if (Math.abs(dy) > Math.abs(dx)) {
          pointerStartRef.current = null;
          endDrag();
          return;
        }

        isDraggingRef.current = true;
        setIsDragging(true);
        frameRef.current?.setPointerCapture(moveEvent.pointerId);
        moveEvent.preventDefault();
        updatePosition(moveEvent.clientX);
        return;
      }

      moveEvent.preventDefault();
      updatePosition(moveEvent.clientX);
    };

    const onEnd = (endEvent: PointerEvent) => {
      if (pointerStartRef.current?.pointerId !== endEvent.pointerId) return;
      if (
        frameRef.current?.hasPointerCapture(endEvent.pointerId) &&
        isDraggingRef.current
      ) {
        frameRef.current.releasePointerCapture(endEvent.pointerId);
      }
      endDrag();
    };

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);

    dragCleanupRef.current = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
    };
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartRef.current?.pointerId !== event.pointerId) return;
    if (
      frameRef.current?.hasPointerCapture(event.pointerId) &&
      isDraggingRef.current
    ) {
      frameRef.current.releasePointerCapture(event.pointerId);
    }
    endDrag();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => snapPosition(Math.max(0, value - 5)));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => snapPosition(Math.min(100, value + 5)));
    }
  };

  return (
    <figure className={className} aria-labelledby="compare-heading">
      <div className="mb-4 flex items-center justify-between gap-3 md:mb-6 md:gap-4">
        <span className={`${typeMeta} shrink-0 text-neon-pink`}>Before</span>
        <h3
          id="compare-heading"
          className={`${typeSubsection} min-w-0 flex-1 text-center text-balance`}
        >
          Drag to compare
        </h3>
        <span className={`${typeMeta} shrink-0 text-neon-pink`}>After</span>
      </div>

      <div
        ref={frameRef}
        role="slider"
        tabIndex={0}
        aria-label="Compare before and after design"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        className={`focus-neon relative w-full cursor-ew-resize overflow-hidden border border-white/10 bg-surface-raised ${
          isDragging ? "cursor-grabbing touch-none" : "touch-pan-y"
        }`}
        style={{
          touchAction: isDragging ? "none" : "pan-y",
          height: FRAME_HEIGHT_PX,
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        {/* After — full frame; revealed on the right of the handle */}
        <div className="absolute inset-0 bg-surface-raised">
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes="100vw"
            className="pointer-events-none select-none object-contain"
            draggable={false}
            priority
            unoptimized
          />
        </div>

        {/* Before — same full frame; clip-path masks by handle position */}
        <div
          className="absolute inset-0 bg-surface-raised"
          style={{
            clipPath: clip,
            WebkitClipPath: clip,
          }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="100vw"
            className="pointer-events-none select-none object-contain"
            draggable={false}
            priority
            unoptimized
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-neon-pink shadow-[0_0_12px_rgba(255,19,240,0.65)]"
          style={{ left: `${split}%` }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neon-pink bg-bg shadow-[0_0_16px_rgba(255,19,240,0.35)]"
          style={{ left: `${split}%` }}
          aria-hidden
        >
          <span className="flex items-center gap-1 text-neon-pink">
            <span className="text-[14.4px] leading-none">‹</span>
            <span className="text-[14.4px] leading-none">›</span>
          </span>
        </div>
      </div>

      <figcaption className="sr-only">
        {beforeAlt}. {afterAlt}. Drag horizontally or use arrow keys to reveal the
        after design.
      </figcaption>
    </figure>
  );
}
