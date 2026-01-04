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
  youtubeUrl?: string;
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
  /**
   * Whether a thumbnail version exists for this image.
   * Thumbnails should be named with "-thumb" suffix before the extension.
   * Example: "/images/hunch-canvas.png" -> "/images/hunch-canvas-thumb.png"
   */
  hasThumbnail?: boolean;
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
    name: "Overclock — Agentic Workflow Automation",
    nameLink: "https://overclock.work/",
    description:
      "Built the frontend architecture for a no-code AI agent platform that turns plain-English instructions into reliable, multi-step workflows. Designed systems that allow users to build, monitor, and control long-running automations with confidence.",
    moreInfo: [
      "Shipped a production-grade agent builder used to orchestrate complex workflows across tools like Google Workspace, Slack, GitHub, and Notion.",
      "Designed execution visibility, retries, and human-in-the-loop controls to make AI behavior understandable and trustworthy.",
      "Enabled non-technical users to compose and operate multi-step automations without writing code.",
    ],
    url: "https://overclock.work/",
    tags: ["AI", "Automation", "SaaS", "Agentic"],
    period: "Launched: June 2025",
    role: "Co-creator · Frontend & Product Engineering",
    featured: true,
    imageSrc: "/images/overclock-website-light.png",
    imageAlt: "Overclock product screenshot",
    hasThumbnail: true,
  },
  {
    name: "Coauthor — AI Writing Platform",
    nameLink: "https://coauthor.studio/",
    description:
      "Co-built an AI writing product that transforms short voice or text inputs into authentic, high-quality content — optimized for clarity, tone, and audience relevance.",
    moreInfo: [
      "Launched a consumer-facing product used to generate content for thousands of users.",
      "Designed intuitive input, editing, and feedback loops that let users shape AI output without prompt engineering.",
      "Built systems to preserve voice and intent while scaling content generation reliably.",
    ],
    url: "https://coauthor.studio/",
    tags: ["AI", "Content", "Social Media"],
    period: "Launched: Feb 2025",
    role: "Co-creator · Frontend & Product Engineering",
    featured: true,
    imageSrc: "/images/coauthor-website-light.png",
    imageAlt: "Coauthor product screenshot",
    hasThumbnail: true,
  },
  {
    name: "LinkedIn Rewind 2024",
    description:
      "Delivered a viral, time-bound product that generated personalized, shareable year-in-review summaries for LinkedIn users.",
    moreInfo: [
      "Reached 300,000+ users within weeks during a fixed seasonal window.",
      "Built dynamic recap UIs, AI-generated summaries, and frictionless sharing flows.",
      "Executed under tight deadlines with high reliability and performance expectations.",
    ],
    url: "https://rewind.coauthor.studio/",
    tags: ["Consumer", "AI", "Viral"],
    period: "Dec 2024 - Jan 2025",
    highlight: "300K+ Users",
    role: "Co-creator · Frontend Engineering",
    featured: true,
    imageSrc: "/images/rewind-4-3.png",
    imageAlt: "LinkedIn Rewind screenshot",
    hasThumbnail: true,
  },
  {
    name: "Hunch — AI-First Workspace",
    nameLink: "https://app.hunch.tools/",
    description:
      "Built a collaborative AI workspace enabling teams to design, run, and scale complex research and automation workflows.",
    moreInfo: [
      "Architected a canvas-based UI supporting templates, orchestration, and large-scale task execution.",
      "Designed systems for model routing, batching, and parallel execution across LLMs and tools.",
      "Led frontend architecture and design systems to support rapid iteration and long-term maintainability.",
    ],
    url: "https://app.hunch.tools/",
    youtubeUrl: "https://www.youtube.com/@HunchTools",
    tags: ["AI", "Workspace", "Orchestration"],
    period: "May 2023 - Dec 2024",
    role: "Co-founder · Frontend Engineering Lead",
    featured: true,
    imageSrc: "/images/hunch-canvas.png",
    imageAlt: "Hunch canvas screenshot",
    hasThumbnail: true,
  },
  {
    name: "Neon",
    description:
      "Built the frontend for Neon, a collaborative visual analytics canvas that helped secure venture capital funding. Users drag datasets (CSV, BigQuery, Snowflake) onto a shared canvas, create interactive charts, and link related tables automatically—no manual joins required.",
    moreInfo: [
      "Architected a real-time, highly interactive canvas with drag-and-drop charting, automatic schema inference, and seamless cross-dataset linking.",
      "Designed UX patterns that surface distributions, time series, and cross-dataset insights while preserving SQL access for power users.",
      "Built annotation, filtering, and collaborative features enabling teams to explore data together in real time.",
    ],
    url: "https://www.loom.com/share/f72ed8cfaec841499d97e087dc0bcf74",
    tags: ["Analytics", "Data Viz", "Collaboration", "Canvas"],
    period: "Aug 2021 - Apr 2023",
    isVideo: true,
    role: "Co-creator, Frontend",
    featured: false,
    imageSrc: "/images/neon-canvas.jpg",
    imageAlt: "Neon canvas screenshot",
    hasThumbnail: true,
  },
];

export const featuredWorkProjects: FeaturedWorkProject[] =
  allWorkProjects.filter(isFeaturedWorkProject);
