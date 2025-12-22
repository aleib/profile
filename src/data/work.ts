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
      "Overclock is a no-code AI agent platform that automates workflows in the browser. I led the frontend engineering, delivering the customer-facing web app.",
    moreInfo: [
      "Overclock is a no-code AI agent platform that automates workflows in the browser. I led the frontend engineering, delivering the customer-facing web app.",
      "Converts plain-English instructions into multi-step automated workflows that run on schedules and report back with logs, drafts, and results.",
      "Targets busy marketers, SaaS teams, and agencies needing research briefs, social listening, content drafts, monthly reporting, and operational automation.",
      "Runs where teams already work (Slack + web app), with review gates and transparent execution logs to prevent bad outputs.",
      "Integrates with major tools (Google Workspace, Slack, GitHub, Gmail, Notion, Reddit, X/Twitter, Linear, and others).",
      "Invite-only beta with credit-based pricing tiers.",
      "My work: end-to-end frontend architecture, UX flows, reusable component library, responsive UI, onboarding and billing screens, and the interface for connecting and managing integrations.",
      "Collaborated across product and backend to shape agent observability, approvals, and reliability improvements during beta.",
    ],
    url: "https://overclock.work/",
    tags: ["AI", "Automation", "SaaS", "Agentic"],
    period: "May 2025 - Oct 2025",
    role: "Co-founder, Frontend",
    featured: true,
    imageSrc: "/images/overclock-website-light.png",
    imageAlt: "Overclock product screenshot",
  },
  {
    name: "Coauthor",
    description:
      "Voice-to-audience engine that extrapolates your linguistic fingerprint from voice notes or text and drafts social content reflecting genuine expertise.",
    moreInfo:
      "The mission is direct distribution — helping builders cut through generic AI noise, grow reach across platforms, and communicate without surrendering authenticity or hours of weekly writing.",
    url: "https://coauthor.studio/",
    tags: ["AI", "Content", "Social Media"],
    period: "Jan 2024 – Apr 2025",
    role: "Co-founder, Frontend",
    featured: true,
    imageSrc: "/images/coauthor-dark.png",
    imageAlt: "Coauthor product screenshot",
  },
  {
    name: "LinkedIn Rewind 2024",
    description:
      "Personalized year-in-review experience for LinkedIn users. Created shareable cards told in users' authentic voice by analyzing their posts.",
    moreInfo:
      "A limited-time feature that allowed users to create a personalized year-in-review post and shareable card. It was a viral success, attracting more than 300,000 users.",
    url: "https://rewind.coauthor.studio/",
    tags: ["Consumer", "AI", "Viral"],
    period: "Dec 2024 – Jan 2025",
    highlight: "300K+ Users",
    role: "Co-founder, Frontend",
    featured: true,
    imageSrc: "/images/rewind.png",
    imageAlt: "LinkedIn Rewind screenshot",
  },
  {
    name: "Hunch",
    description:
      "AI-first workspace for teams that combines model orchestration, structured templates, and execution primitives to automate complex research, writing, and product workflows.",
    moreInfo:
      "Execution primitives include batch runs, web scraping, and embedded code execution. Enables teams to create reusable AI tools and run thousands of tasks in parallel.",
    url: "https://hunch.tools/",
    tags: ["AI", "Workspace", "Orchestration"],
    period: "May 2023 – Dec 2024",
    role: "Co-founder, Frontend",
    featured: true,
    imageSrc: "/images/hunch-canvas.png",
    imageAlt: "Hunch canvas screenshot",
  },
  {
    name: "Neon",
    description:
      "Collaborative visual analytics canvas. Drag datasets onto a shared canvas, create interactive charts, and link related tables automatically.",
    moreInfo:
      "Users can drag datasets (CSV, BigQuery, Snowflake, etc.) onto a shared canvas, create interactive charts, and link related tables automatically. Combines a familiar table/SQL abstraction for power users with an approachable, highly interactive UI.",
    url: "https://www.loom.com/share/f72ed8cfaec841499d97e087dc0bcf74",
    tags: ["Analytics", "Data Viz", "Collaboration", "SQL"],
    period: "Aug 2021 – Apr 2023",
    isVideo: true,
    role: "Co-founder, Frontend",
    featured: false,
  },
];

export const featuredWorkProjects: FeaturedWorkProject[] =
  allWorkProjects.filter(isFeaturedWorkProject);
