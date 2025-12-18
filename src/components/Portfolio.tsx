import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { useRef } from "react";

type Project = {
  name: string;
  description: string;
  url: string;
  tags: string[];
  period: string;
  highlight?: string;
  isVideo?: boolean;
};

// Ordered chronologically: most recent first
const projects: Project[] = [
  {
    name: "Overclock",
    description:
      "Agentic workflows for SaaS teams. Decomposes natural-language requests into discrete steps, executes with connected integrations, and continuously improves via feedback.",
    url: "https://overclock.work/",
    tags: ["AI", "Automation", "SaaS"],
    period: "May 2025 – Present",
    highlight: "Current",
  },
  {
    name: "Coauthor",
    description:
      "Voice-to-audience engine that extrapolates your linguistic fingerprint from voice notes or text and drafts social content reflecting genuine expertise.",
    url: "https://coauthor.studio/",
    tags: ["AI", "Content", "Social"],
    period: "Jan 2024 – Apr 2025",
  },
  {
    name: "LinkedIn Rewind 2024",
    description:
      "Personalized year-in-review experience for LinkedIn users. Created shareable cards told in users' authentic voice by analyzing their posts.",
    url: "https://rewind.coauthor.studio/",
    tags: ["Consumer", "AI", "Viral"],
    period: "Dec 2024",
    highlight: "300K+ Users",
  },
  {
    name: "Hunch",
    description:
      "AI workspace and execution system. Model orchestration, structured templates, and execution primitives for complex research, writing, and product workflows.",
    url: "https://hunch.tools/",
    tags: ["AI", "Workspace", "Orchestration"],
    period: "May 2023 – Dec 2024",
  },
  {
    name: "Neon",
    description:
      "Collaborative visual analytics canvas. Drag datasets onto a shared canvas, create interactive charts, and link related tables automatically.",
    url: "https://www.loom.com/share/f72ed8cfaec841499d97e087dc0bcf74",
    tags: ["Analytics", "Data Viz", "Collaboration"],
    period: "Aug 2021 – Apr 2023",
    isVideo: true,
  },
];

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-12 text-center">
            Portfolio
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 glow-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-display font-semibold flex items-center gap-2">
                        {project.name}
                        {project.highlight ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                            {project.highlight}
                          </span>
                        ) : null}
                      </h3>
                      <span className="text-xs text-muted-foreground/70 font-mono">
                        {project.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                <Button variant="outline" size="sm" asChild>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
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
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
