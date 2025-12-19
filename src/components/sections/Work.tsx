import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";

type Project = {
  name: string;
  description: string;
  url: string;
  tags: string[];
  period: string;
  highlight?: string;
  imageSrc: string;
  imageAlt: string;
};

// Featured products for the homepage (most recent first)
const projects: Project[] = [
  {
    name: "Overclock",
    description:
      "Agentic workflows for SaaS teams. Decomposes natural-language requests into discrete steps, executes with connected integrations, and continuously improves via feedback.",
    url: "https://overclock.work/",
    tags: ["AI", "Automation", "SaaS"],
    period: "2025",
    // highlight: "Current",
    imageSrc: "/images/overclock-app-dark.png",
    imageAlt: "Overclock product screenshot",
  },
  {
    name: "Coauthor",
    description:
      "Voice-to-audience engine that extrapolates your linguistic fingerprint from voice notes or text and drafts social content reflecting genuine expertise.",
    url: "https://coauthor.studio/",
    tags: ["AI", "Content", "Social"],
    period: "2024 – 2025",
    imageSrc: "/images/coauthor-light.png",
    imageAlt: "Coauthor product screenshot",
  },
  {
    name: "LinkedIn Rewind 2024",
    description:
      "Personalized year-in-review experience for LinkedIn users. Created shareable cards told in users' authentic voice by analyzing their posts.",
    url: "https://rewind.coauthor.studio/",
    tags: ["Consumer", "AI", "Viral"],
    period: "Dec 2024",
    highlight: "300K+ Users",
    imageSrc: "/images/rewind.png",
    imageAlt: "LinkedIn Rewind screenshot",
  },
  {
    name: "Hunch",
    description:
      "AI workspace and execution system. Model orchestration, structured templates, and execution primitives for complex research, writing, and product workflows.",
    url: "https://hunch.tools/",
    tags: ["AI", "Workspace", "Orchestration"],
    period: "2023 – 2024",
    imageSrc: "/images/hunch-canvas.png",
    imageAlt: "Hunch canvas screenshot",
  },
];

const Work = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /**
   * Makes each item feel like one "card link" while keeping nested links valid
   * (no anchor nesting) and independently clickable.
   */
  const openExternal = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <section id="work" className="py-24 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid md:grid-cols-1 gap-4 max-w-[51rem] mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                <div
                  role="link"
                  tabIndex={0}
                  aria-label={`Open ${project.name} website`}
                  onClick={() => openExternal(project.url)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openExternal(project.url);
                    }
                  }}
                  className="group glow-border rounded-xl p-6 outline-none transition-all duration-300 border border-transparent bg-transparent shadow-none cursor-pointer hover:bg-card/80 hover:backdrop-blur-xl hover:border-border/50 hover:shadow-[var(--shadow-md)] focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-6">
                    {/* Image-as-bullet */}
                    <div className="overflow-hidden rounded-sm border border-border/30 bg-secondary/10 h-fit">
                      <img
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        loading="lazy"
                        className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-display font-semibold leading-snug">
                          <span className="text-foreground">
                            {project.name}
                          </span>
                          {project.highlight ? (
                            <span className="ml-2 align-middle text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                              {project.highlight}
                            </span>
                          ) : null}
                        </h3>

                        <ArrowUpRight className="mt-1 w-4 h-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="text-xs text-muted-foreground/70 font-mono">
                          {project.period}
                        </span>
                        <div className="flex flex-wrap gap-2">
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

                      <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary/90 hover:text-primary transition-colors"
                        >
                          Visit site
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* View all link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-left ml-6"
            >
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-sm font-normal text-muted-foreground hover:text-foreground transition-colors group"
              >
                View all work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
