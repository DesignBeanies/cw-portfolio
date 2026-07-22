import type { ReactNode } from "react";

import type { SectionId } from "@/lib/sections";

type SectionProps = {
  id: SectionId;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative scroll-mt-mobile-nav py-20 md:scroll-mt-10 md:py-28 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
}
