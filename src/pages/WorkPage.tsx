import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";
import { Link } from "react-router-dom";

type Project = {
  name: string;
  description: string;
  longDescription?: string;
  url: string;
  tags: string[];
  period: string;
  highlight?: string;
  isVideo?: boolean;
  role?: string;
};

const allProjects: Project[] = [
  {
    name: "Overclock",
    description:
      "Agentic workflows for SaaS teams. Decomposes natural-language requests into discrete steps, executes with connected integrations, and continuously improves via feedback.",
    longDescription:
      "Overclock is positioned for solo marketers, small/oversubscribed SaaS teams, and agencies. Typical use cases include competitor tracking, pre-call research briefs, social monitoring and response, churn/feedback synthesis, and automated changelogs or monthly performance analyses.",
    url: "https://overclock.work/",
    tags: ["AI", "Automation", "SaaS", "Agentic"],
    period: "May 2025 – Present",
    highlight: "Current",
    role: "Product & Engineering",
  },
  {
    name: "Coauthor",
    description:
      "Voice-to-audience engine that extrapolates your linguistic fingerprint from voice notes or text and drafts social content reflecting genuine expertise.",
    longDescription:
      "The mission is direct distribution — helping builders cut through generic AI noise, grow reach across platforms, and communicate without surrendering authenticity or hours of weekly writing.",
    url: "https://coauthor.studio/",
    tags: ["AI", "Content", "Social Media", "Voice"],
    period: "Jan 2024 – Apr 2025",
    role: "Product Lead / Engineer",
  },
  {
    name: "LinkedIn Rewind 2024",
    description:
      "Personalized year-in-review experience for LinkedIn users. Created shareable cards told in users' authentic voice by analyzing their posts.",
    longDescription:
      "A limited-time feature that allowed users to create a personalized year-in-review post and shareable card. It was a viral success, attracting more than 300,000 users.",
    url: "https://rewind.coauthor.studio/",
    tags: ["Consumer", "AI", "Viral", "Social"],
    period: "Dec 2024 – Jan 2025",
    highlight: "300K+ Users",
    role: "Product Lead / Engineer",
  },
  {
    name: "Hunch",
    description:
      "AI-first workspace for teams that combines model orchestration, structured templates, and execution primitives to automate complex research, writing, and product workflows.",
    longDescription:
      "Execution primitives include batch runs, web scraping, and embedded code execution. Enables teams to create reusable AI tools and run thousands of tasks in parallel.",
    url: "https://hunch.tools/",
    tags: ["AI", "Workspace", "Orchestration", "Templates"],
    period: "May 2023 – Dec 2024",
    role: "Co-founder, Head of Product & Engineering",
  },
  {
    name: "Neon",
    description:
      "Collaborative visual analytics canvas. Drag datasets onto a shared canvas, create interactive charts, and link related tables automatically.",
    longDescription:
      "Users can drag datasets (CSV, BigQuery, Snowflake, etc.) onto a shared canvas, create interactive charts, and link related tables automatically. Combines a familiar table/SQL abstraction for power users with an approachable, highly interactive UI.",
    url: "https://www.loom.com/share/f72ed8cfaec841499d97e087dc0bcf74",
    tags: ["Analytics", "Data Viz", "Collaboration", "SQL"],
    period: "Aug 2021 – Apr 2023",
    isVideo: true,
    role: "Co-founder, Frontend Engineer",
  },
];

const WorkPage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        <div className="absolute top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="section-container relative z-10 py-12">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group mb-8"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Work
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Products I've helped build — from AI platforms and visual analytics
            tools to consumer-scale launches with hundreds of thousands of
            users.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid gap-8 max-w-4xl">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-all duration-300 glow-border"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-2xl font-display font-semibold flex items-center gap-3 flex-wrap">
                    {project.name}
                    {project.highlight ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                        {project.highlight}
                      </span>
                    ) : null}
                  </h2>
                  {project.role ? (
                    <p className="text-sm text-primary/80 font-medium mt-1">
                      {project.role}
                    </p>
                  ) : null}
                </div>
                <span className="text-sm text-muted-foreground/70 font-mono shrink-0">
                  {project.period}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground mb-3 leading-relaxed">
                {project.description}
              </p>

              {project.longDescription ? (
                <p className="text-muted-foreground/80 text-sm mb-6 leading-relaxed">
                  {project.longDescription}
                </p>
              ) : null}

              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  {project.isVideo ? (
                    <>
                      <Play className="w-4 h-4" />
                      Watch Demo
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      Visit Site
                    </>
                  )}
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkPage;


