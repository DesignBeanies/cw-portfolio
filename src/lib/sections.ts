export type SectionId = "about" | "experience" | "projects" | "contact";

export type SectionConfig = {
  id: SectionId;
  number: string;
  label: string;
};

export const SECTIONS: readonly SectionConfig[] = [
  { id: "about", number: "01", label: "About" },
  { id: "experience", number: "02", label: "Experience" },
  { id: "projects", number: "03", label: "Projects" },
  { id: "contact", number: "04", label: "Contact" },
] as const;

export const SECTION_IDS = SECTIONS.map((s) => s.id);

export const neonTextClass = "text-neon-pink";
export const neonBorderClass = "border-neon-pink";
