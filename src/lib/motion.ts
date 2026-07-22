export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const FADE_IN_VIEWPORT = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
} as const;

export const fadeInTransition = (delay = 0) => ({
  duration: 0.7,
  ease: MOTION_EASE,
  delay,
});

export const fadeInVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: fadeInTransition(delay),
  }),
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: fadeInTransition(),
  },
};

/** Keep in sync with --panel-duration in globals.css */
export const PANEL_TRANSITION_MS = 850;
