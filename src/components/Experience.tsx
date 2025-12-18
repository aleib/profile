import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, ExternalLink } from "lucide-react";

const experiences = [
  {
    company: "Overclock",
    role: "Product & Engineering",
    period: "May 2025 – Present",
    url: "https://overclock.work/",
    description: [
      "Builds agentic workflows from natural-language requests",
      "Frontend architecture, integrations, telemetry, execution UX",
    ],
    current: true,
  },
  {
    company: "Hunch",
    role: "Co-founder, Head of Product & Engineering",
    period: "May 2023 – Dec 2024",
    url: "https://hunch.tools/",
    description: [
      "AI-first workspace for orchestrating models, templates and executions",
      "Ran product and engineering for canvas, templates, parallel execution",
    ],
  },
  {
    company: "Coauthor",
    role: "Product Lead / Engineer",
    period: "Jan 2024 – Apr 2025",
    url: "https://coauthor.studio/",
    description: [
      "Launched LinkedIn Rewind 2024 (300k+ users)",
      "Speech-to-audience content engine, linguistic style extraction",
    ],
  },
  {
    company: "Neon",
    role: "Co-founder, Frontend Engineer",
    period: "Aug 2021 – Apr 2023",
    url: "https://www.loom.com/share/f72ed8cfaec841499d97e087dc0bcf74",
    description: [
      "Collaborative visual analytics canvas",
      "Drag-and-drop data, auto-joins, interactive charts",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-12 text-center">
            Experience
          </h2>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative pl-8 sm:pl-20"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 sm:left-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                    exp.current 
                      ? "bg-primary border-primary animate-pulse-glow" 
                      : "bg-background border-primary/50"
                  }`} />

                  <div className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-display font-semibold flex items-center gap-2">
                            {exp.company}
                            {exp.current && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                                Current
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">{exp.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground font-medium">
                          {exp.period}
                        </span>
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`Visit ${exp.company}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li 
                          key={i} 
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;