"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  FADE_IN_VIEWPORT,
  fadeInVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/motion";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

/** Single block that fades in when scrolled into view. */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  ...props
}: FadeInProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={FADE_IN_VIEWPORT}
      custom={delay}
      variants={fadeInVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type FadeInStaggerProps = {
  children: ReactNode;
  className?: string;
};

/** Staggers fade-in for direct children wrapped in FadeInItem. */
export function FadeInStagger({ children, className = "" }: FadeInStaggerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={FADE_IN_VIEWPORT}
      variants={staggerContainerVariants}
    >
      {children}
    </motion.div>
  );
}

type FadeInItemProps = {
  children: ReactNode;
  className?: string;
};

export function FadeInItem({ children, className = "" }: FadeInItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

type FadeInOnLoadProps = {
  children: ReactNode;
  className?: string;
};

/** Staggered fade-in on first paint (e.g. hero above the fold). */
export function FadeInOnLoad({ children, className = "" }: FadeInOnLoadProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
    >
      {children}
    </motion.div>
  );
}
