/** Typography scale: single source for hierarchy across the portfolio. */

/** h1–h4 outline stroke + transparent fill are set in globals.css base styles. */
export const typeDisplay =
  "font-display text-[48px] font-bold uppercase leading-[0.95] tracking-tight md:text-[88px]";

export const typeSection =
  "font-display text-[32px] font-semibold uppercase leading-[1.1] tracking-wide md:text-[48px]";

export const typeSubsection =
  "font-display text-[20px] font-medium uppercase leading-[1.15] tracking-wide md:text-[28px]";

/** Item titles within a section — below h3, above body (roles, h4). */
export const typeRole =
  "font-display text-[18px] font-medium uppercase leading-[1.15] tracking-wide md:text-[20px]";

/** Accent titles in callout / sidebar cards. */
export const typeCardTitle =
  "font-display text-[16px] font-medium leading-[1.25] tracking-wide md:text-[17px]";

/** Supporting copy in cards — body scale, muted. */
export const typeCardDetail =
  "font-body text-[16px] leading-snug text-text-muted md:leading-relaxed";

export const typeLead =
  "font-body text-[16px] font-normal leading-snug text-text-primary";

export const typeBody =
  "font-body text-[16px] font-normal leading-[1.76] text-text-primary";

export const typeMeta =
  "font-body text-[16px] font-bold uppercase tracking-[0.2em] text-text-muted";

export const typeNav =
  "font-body text-[16px] font-medium leading-none";

export const typePill =
  "font-body text-[16px] font-medium leading-none tracking-wide text-text-primary";

export const typeSectionScroll =
  `${typeSection} scroll-mt-mobile-nav outline-none md:scroll-mt-8`;
