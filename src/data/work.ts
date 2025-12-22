export type WorkProject = {
  name: string;
  nameLink?: string;
  description: string;
  /**
   * Expanded description content.
   * - Use a string for simple prose.
   * - Use an array for an intro line + bullet items (renders as a list in React).
   */
  moreInfo?: string | readonly string[];
  url: string;
  tags: string[];
  period: string;
  highlight?: string;
  isVideo?: boolean;
  role?: string;
  /**
   * Whether this project should appear in the homepage "featured products" section.
   */
  featured: boolean;
  imageSrc?: string;
  imageAlt?: string;
};

export type FeaturedWorkProject = WorkProject & {
  featured: true;
  imageSrc: string;
  imageAlt: string;
};

const isFeaturedWorkProject = (
  project: WorkProject
): project is FeaturedWorkProject =>
  project.featured &&
  project.imageSrc != null &&
  project.imageAlt != null &&
  project.imageSrc.trim().length > 0 &&
  project.imageAlt.trim().length > 0;

/**
 * Full Work list used by the /work page and the in-page overlay panel.
 * Kept in one place so the homepage CTA and dedicated route always stay consistent.
 */
export const allWorkProjects: WorkProject[] = [
  {
    name: "Overclock",
    nameLink: "https://overclock.work/",
    description:
      "Led frontend engineering for Overclock, a no-code AI agent platform that converts plain-English instructions into automated browser workflows. Architected the end-to-end frontend, agent-builder UI, and human-in-the-loop approval flows.",
    moreInfo: [
      "Designed and implemented reusable component systems and responsive layouts for a complex agent-building interface.",
      "Built onboarding, billing, and integration management for Google Workspace, Slack, GitHub, Notion, Linear, and more.",
      "Partnered closely with product and backend to shape agent observability, reliability, and self-healing execution.",
    ],
    url: "https://overclock.work/",
    tags: ["AI", "Automation", "SaaS", "Agentic"],
    period: "May 2025 - Oct 2025",
    role: "Co-creator, Frontend",
    featured: true,
    imageSrc: "/images/overclock-website-light.png",
    imageAlt: "Overclock product screenshot",
  },
  {
    name: "Coauthor",
    description:
      "Co-built Coauthor from inception—an AI writing product that transforms short voice or text inputs into authentic LinkedIn posts. Designed the end-to-end UX, content-generation mechanics, and onboarding flows.",
    moreInfo: [
      "Launched after 2024 LinkedIn Rewind to help users grow their LinkedIn presence with AI-assisted content.",
      "Designed voice-note and text input flows, enabling users to express ideas without prompting complexity.",
      "Built iterative feedback loops so users can fine-tune content with minimal effort.",
      "Created an 'interests to ideas' pipeline that surfaces timely, audience-relevant topics.",
      "Integrated AI media generation to boost post engagement.",
    ],

    url: "https://coauthor.studio/",
    tags: ["AI", "Content", "Social Media"],
    period: "Jan 2024 - Apr 2025",
    role: "Co-creator, Frontend",
    featured: true,
    imageSrc: "/images/coauthor-dark.png",
    imageAlt: "Coauthor product screenshot",
  },
  {
    name: "LinkedIn Rewind 2024",
    description:
      "A personalized year-in-review for LinkedIn users that attracted 300,000+ users in weeks. Analyzed posting history and generated shareable AI-powered recaps in each user's authentic voice.",
    moreInfo: [
      "Delivered a viral feature under tight seasonal timelines—300K+ signups during December 2024.",
      "Co-built the full UI: personalized stats, AI-generated recap cards, and frictionless social sharing.",
    ],
    url: "https://rewind.coauthor.studio/",
    tags: ["Consumer", "AI", "Viral"],
    period: "Dec 2024 - Jan 2025",
    highlight: "300K+ Users",
    role: "Co-creator, Frontend",
    featured: true,
    imageSrc: "/images/rewind.png",
    imageAlt: "LinkedIn Rewind screenshot",
  },
  {
    name: "Hunch",
    description:
      "Co-founded Hunch, an AI-first workspace combining model orchestration, a template-driven canvas, and execution primitives to automate research, writing, and product workflows. Led frontend engineering—architected the core canvas, tools, templates, onboarding, and run management.",
    moreInfo: [
      "Implemented execution primitives (batch runs, web scraping, embedded code execution, parallel orchestration) to scale single prompts into thousands of automated tasks.",
      "Designed model orchestration features to route, compare, and combine outputs from multiple LLMs and multimodal models.",
      "Built a template-driven canvas enabling users to create reusable AI tools and iterate without engineering overhead.",
      "Led frontend architecture and component systems for a performant, responsive UX across the product.",
    ],
    url: "https://hunch.tools/",
    tags: ["AI", "Workspace", "Orchestration"],
    period: "May 2023 - Dec 2024",
    role: "Co-creator, Frontend",
    featured: true,
    imageSrc: "/images/hunch-canvas.png",
    imageAlt: "Hunch canvas screenshot",
  },
  {
    name: "Neon",
    description:
      "Co-built the frontend for Neon, a collaborative visual analytics canvas that helped secure venture capital funding. Users drag datasets (CSV, BigQuery, Snowflake) onto a shared canvas, create interactive charts, and link related tables automatically—no manual joins required.",
    moreInfo: [
      "Architected a real-time, highly interactive canvas with drag-and-drop charting, automatic schema inference, and seamless cross-dataset linking.",
      "Designed UX patterns that surface distributions, time series, and cross-dataset insights while preserving SQL access for power users.",
      "Built annotation, filtering, and collaborative features enabling teams to explore data together in real time.",
    ],
    url: "https://www.loom.com/share/f72ed8cfaec841499d97e087dc0bcf74",
    tags: ["Analytics", "Data Viz", "Collaboration", "Canvas"],
    period: "Aug 2021 - Apr 2023",
    isVideo: true,
    role: "Co-founder, Frontend",
    featured: false,
  },
];

export const featuredWorkProjects: FeaturedWorkProject[] =
  allWorkProjects.filter(isFeaturedWorkProject);
