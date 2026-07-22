export type Experience = {
  title: string;
  company: string;
  dates: string;
};

export const EXPERIENCE: readonly Experience[] = [
  {
    title: "Senior User Experience Designer",
    company: "Sonic Automotive",
    dates: "April 2023 – Present",
  },
  {
    title: "Freelance User Experience Designer",
    company: "Design Beanies",
    dates: "November 2021 – Present",
  },
  {
    title: "User Experience Architect",
    company: "Highland Ag Solutions",
    dates: "September 2022 – March 2023",
  },
  {
    title: "Lead Visual Designer",
    company: "First Internet Bank",
    dates: "November 2019 – August 2022",
  },
];

export const SKILLS: readonly string[] = [
  "UX design",
  "UI design",
  "Product design",
  "Interaction design",
  "Information architecture",
  "Wireframing",
  "Prototyping",
  "Design systems",
  "Responsive design",
  "Accessibility",
  "User research",
  "Usability testing",
  "A/B testing",
  "Journey mapping",
  "Storyboarding",
  "Focus groups",
  "Surveys & interviews",
  "Data-driven design",
  "Product strategy",
  "Content strategy",
  "Stakeholder alignment",
  "Workshop facilitation",
];

/** Resume-backed outcome metrics — available if you want to swap the card back. */
export const METRIC_MASTER_LIST = [
  { value: "80%", label: "KPI increase, powersports ecommerce" },
  { value: "40%", label: "Credit app completion lift" },
  { value: "$20K+", label: "Revenue generated" },
  { value: "27%", label: "PLP KPI lift" },
  { value: "21%", label: "Scheduler completion lift" },
  { value: "3 mo", label: "Faster time to market" },
] as const;

export const STATS = [
  { value: "80%", label: "KPI increase YoY" },
  { value: "40%", label: "Funnel completion lift" },
  { value: "27%", label: "PLP KPI lift at scale" },
] as const;

export const TEAM_STRENGTHS = [
  {
    title: "Cross-functional collaboration",
    detail: "Alignment across product, ops, legal & engineering",
  },
  {
    title: "Product ownership",
    detail: "Research, strategy, design & launch, end to end",
  },
  {
    title: "Efficiency & adaptability",
    detail: "Rapid prototyping, intuitive solutions, improved team efficiencies",
  },
] as const;
