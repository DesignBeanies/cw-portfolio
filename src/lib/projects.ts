export type ProjectImages = {
  hero: string;
  heroMobile?: string;
  before: string;
  after: string;
};

export type DesignBuildColumn = {
  title: string;
  body: string;
  illustration?: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: readonly string[];
  challenge: string;
  approach: string;
  solution: string;
  designBuild: readonly [DesignBuildColumn, DesignBuildColumn, DesignBuildColumn];
  images: ProjectImages;
};

export const PROJECTS: readonly Project[] = [
  {
    id: "powersports-site-overhaul",
    title: "Powersports site overhaul",
    tagline: "80% increase in conversions YoY · 5 stores unified · 3 month delivery",
    description:
      "Consolidated five Houston-area storefronts into one unified ecommerce experience, balancing OEM compliance, local identity, and a single design system.",
    tags: [
      "UX Design",
      "Design Systems",
      "Figma",
      "Prototyping",
      "Usability Testing",
      "Cross-functional Collaboration",
    ],
    challenge:
      "Team Mancuso Powersports wanted to consolidate five Houston-area stores into a single ecommerce site. What looked straightforward on paper wasn't: each store had distinct manufacturer relationships with strict OEM compliance rules about how brands could be displayed online, and the store teams had no interest in losing their individual identities to a generic parent brand. The real challenge wasn't the design. It was building the case for the project itself.",
    approach:
      "I started upstream: workshops, store shadowing, card sorts, competitive analysis, and customer sentiment research before touching Figma. That groundwork gave us the alignment we needed to move fast. Close collaboration with an OEM-certified host partner, built on weekly alignment sessions throughout, is what made the 3-month deadline possible.",
    solution:
      "The design solution centered on location-specific splash pages that let each store maintain its identity and stay OEM-compliant while living under the Team Mancuso umbrella. Consolidated five years of fragmented branding into a unified front: improving brand recognition across all touchpoints and giving the business one system to maintain instead of five.",
    designBuild: [
      {
        title: "Understanding the context",
        body: "We went on-site before designing because you can't design for five distinct stores without knowing what makes each of them unique. Card sorts, customer sentiment, and competitive/comparative analyses were conducted to get an even deeper understanding of the powersports industry and user type.",
        illustration: "/projects/designer/tmp-understanding.svg",
      },
      {
        title: "During the process",
        body: "Constant collaboration, workshops, and feedback loops with ops and dev team kept us on track while uncovering nuances, store needs/wants, and technical constraints. This is what helped us uncover the major compliance red flag among other risks, pain points, and trade-offs.",
        illustration: "/projects/designer/tmp-process.svg",
      },
      {
        title: "How we got a compliant site",
        body: "If we kept the original sites' URL that redirected to store splash pages containing OEM promos, approved brands, and the correct items \"above the fold,\" we could make the business request work within the OEM guidelines. Not the most obvious solution, but collaboration allows for the best solutions to grow.",
        illustration: "/projects/designer/tmp-compliant.svg",
      },
    ],
    images: {
      hero: "/projects/tmp-hero.png",
      before: "/projects/tmp-before.png",
      after: "/projects/tmp-after.png",
    },
  },
  {
    id: "credit-application-redesign",
    title: "Credit application redesign",
    tagline:
      "40% improved completion rates · 15 steps to 7 · Scaled to 100+ locations",
    description:
      "Replaced a frustrating third-party iframe with an in-house, analytics-enabled flow: half the steps, fully accessible, and on-brand.",
    tags: [
      "UX Design",
      "Design Systems",
      "Form Design",
      "Accessibility",
      "Prototyping",
      "Cross-functional Collaboration",
    ],
    challenge:
      "EchoPark's credit application lived inside a third-party iframe that frustrated users and blocked internal teams from seeing where people were dropping off. Beyond the technical limitations the UX had deeper problems: inconsistent requirements across teams, unclear store routing, mixed cosigner information causing in-store confusion, and a form collecting more data than it needed to. Nobody had visibility into what was broken or why.",
    approach:
      "I inherited an incomplete audit and finished it, documenting the existing iframe logic and researching across teams to separate operational needs from user needs. Content wireframes aligned stakeholders on flow structure early, before anyone got attached to a solution. I prioritized sketches and mid-fidelity wireframes to validate conditional logic before committing to visual design, applied EchoPark's design system, introduced new components where needed, and built in ADA compliance and microinteractions throughout.",
    solution:
      "Usability testing on the most complex parts of the flow surfaced the final interaction refinements. The result was a fully in-house, on-brand credit application: analytics-enabled, ADA compliant, and half the steps of the original.",
    designBuild: [
      {
        title: "Finishing the audit",
        body: "I inherited an incomplete audit and finished it, documenting the existing iframe logic and researching across teams to separate operational needs from user needs. That clarity was the foundation for every design decision that followed.",
      },
      {
        title: "Structure before aesthetics",
        body: "Content wireframes aligned stakeholders on flow structure early, before anyone got attached to a solution. I prioritized sketches and mid-fidelity wireframes to validate conditional logic before committing to visual design.",
      },
      {
        title: "System, accessibility, and polish",
        body: "I applied EchoPark's design system, introduced new components where needed, and built in ADA compliance and microinteractions throughout. Usability testing on the most complex parts of the flow surfaced the final interaction refinements.",
      },
    ],
    images: {
      hero: "/projects/sca-hero.png",
      before: "/projects/sca-before.png",
      after: "/projects/sca-after.svg",
    },
  },
  {
    id: "cazador-del-oso",
    title: "Cazador del Oso: multimedia web design",
    tagline: "Storytelling ecommerce · $20K+ revenue · End-to-end solo delivery",
    description:
      "A narrative-driven arts & culture site weaving art, music, and commerce into one cohesive experience, designed and built solo.",
    tags: [
      "UX Design",
      "Storytelling",
      "Brand Identity",
      "Front-end Development",
      "Content Strategy",
      "Commerce & Conversion",
    ],
    challenge:
      "ZFunk Productions poured a decade of work in Cazador Del Oso, a story of Montana's history shown through original compositions and visual art, but the website did not stack up due to a lack of branding, paragraphs of content, and overall readability issues. We needed to tell the story clearly enough to sell gala tickets, products, and to get donations all while keeping the artist's vision and passion at the heart. A blank canvas sounds like freedom. In practice it's the hardest brief to execute.",
    approach:
      "I started with competitive and comparative research, a full audit of the original site, and stakeholder workshops so we could align on narrative, content, and hierarchy before visual design. Art direction came from the work itself: a moodier palette drawn from the main piece instead of default western-earth tones. On build, every ambitious layout choice had a technical conversation underneath it: what the CMS allows, what custom CSS can carry, and what still has to hold up across devices.",
    solution:
      "A storytelling-driven ecommerce site that weaves art, music, and narrative into a single cohesive website experience. Delivered end-to-end as sole designer and developer, helping ZFunk Productions' Cazador del Oso generate over $20K in revenue.",
    designBuild: [
      {
        title: "Understanding the context",
        body: "When there's no brand system to work within you build the guardrails first. I started with competitive/comparative research of other multi-media projects, original site content audit, and stakeholder workshops to align on content and hierarchy before any visual decision got made. Getting a client to react to structure, flows, and solutions before aesthetics is how I avoid redesigning everything in hifis.",
        illustration: "/projects/designer/cdo-understanding.svg",
      },
      {
        title: "Improving the design & story",
        body: "I pulled the color palette directly from the main art piece. The easy choice would have been to keep the earthy, western tones of the original website. Instead we went darker and moodier to visually communicate the psychological depth and mystery at the heart of the story.",
        illustration: "/projects/designer/cdo-improving.svg",
      },
      {
        title: "Building the vibes",
        body: "CMS has restrictions on layouts that don't always match what a visually ambitious client imagines, or myself for that matter. Every creative decision had a technical conversation underneath it: what's possible, what's solvable through custom CSS, what's a trade-off between the vision and what holds up across devices.",
        illustration: "/projects/designer/cdo-vibes.svg",
      },
    ],
    images: {
      hero: "/projects/cdo-hero.png",
      before: "/projects/cdo-before.png",
      after: "/projects/cdo-after.png",
    },
  },
  {
    id: "srp-tile-redesign",
    title: "SRP tile redesign",
    tagline: "UX Designer · Automotive Ecommerce · 2023",
    description:
      "Redesigned the search results tile on a nationwide automotive platform, leading with location, simplifying density, and outperforming the original across 90% of KPIs.",
    tags: [
      "Systems Thinking",
      "Information Architecture",
      "Interaction Design",
      "A/B Testing",
      "Design Systems",
      "Accessibility",
    ],
    challenge:
      "Two weeks into a new role I was handed the redesign of the search results tile: the component carrying almost all traffic on a nationwide automotive ecommerce platform. In the current state there were a few major issues: users couldn't tell where the car was located, the stock number meant nothing to them, and the layout wasn't surfacing what mattered most. On such a small but impactful component we had to balance what users wanted with what pushed business KPIs.",
    approach:
      "New to the team, I rapidly built context on industry jargon, design systems, and team processes. User research showed the tile had enough information for decision-making but was missing location, so we simplified rather than added, removing quick info and adopting an F-pattern layout for faster scanning.",
    solution:
      "A redesigned tile that led with location, simplified the information density, and adopted an F-pattern layout for faster scanning. A/B testing confirmed the new design outperformed the original across 90% of KPIs, enough signal to roll the redesign out platform-wide.",
    designBuild: [
      {
        title: "Ramp up",
        body: "New to the team, I rapidly navigated a steep learning curve: mastering industry jargon, design systems, and team processes. By proactively asking questions and leaning on team expertise, I quickly built the context needed to make effective decisions.",
        illustration: "/projects/designer/srp-rampup.svg",
      },
      {
        title: "Optimizing content & hierarchy",
        body: "User research showed the car tile had enough information for decision-making, but was missing a critical detail: location. A major issue for a nationwide business with real shipping logistics. Instead of adding more content, we simplified, removing \"quick info\" and prioritizing clarity. A consistent F-pattern layout improved scannability across listings.",
        illustration: "/projects/designer/srp-content-hierarchy.svg",
      },
      {
        title: "A push forward",
        body: "A/B testing showed the new SRP outperformed the old across 90% of KPIs, but a drop in \"Ask about this car\" interactions paused rollout. We found the CTA on the car tile had been used as a workaround for missing location info. Once we solved that, the need disappeared. What looked like a loss proved the design worked, enabling full launch.",
        illustration: "/projects/designer/srp-pushforward.svg",
      },
    ],
    images: {
      hero: "/projects/SRPDESKTOP.svg",
      heroMobile: "/projects/srp-hero-mobile.png",
      before: "/projects/SRP-Before.png",
      after: "/projects/SRP-After.png",
    },
  },
];
