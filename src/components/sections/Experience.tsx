import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";

type ExperienceLink = {
  label: string;
  url: string;
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  url: string;
  /** Short 2–3 line summary for scannability. */
  summary: string;
  /** Optional related links (press, docs, etc.) shown as a third row. */
  links?: ExperienceLink[];
  current?: boolean;
};

const experiences: ExperienceItem[] = [
  {
    company: "Hunch",
    role: "Co-founder",
    period: "2021 - 2025",
    url: "https://hunch.tools/",
    summary:
      "Co-founded Hunch, a venture-backed startup that provides AI-powered tools for teams — model orchestration, templates, and batch execution. Led product and engineering; designed the core canvas and parallel execution system.",
    current: false,
  },
  {
    company: "Aruba, a Hewlett Packard Enterprise company",
    role: "Engineering Manager & Frontend Lead",
    period: "2018 - 2020",
    url: "https://www.hpe.com/za/en/networking/user-experience-insight.html",
    summary:
      "Frontend tech lead & manager for User Experience Insight at Aruba (previously Cape Networks). Built industry-leading software for networking teams, putting design and ease of use first.",
  },
  {
    company: "Cape Networks",
    role: "Frontend Lead",
    period: "2016 - 2018",
    url: "https://www.linkedin.com/company/cape-networks/",
    summary:
      "Network monitoring product — sensors mimic users to test WiFi from their perspective. Built simple dashboards and reports to detect issues instantly and troubleshoot remotely.",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /**
   * Makes the whole row feel like one "card link" while still allowing nested
   * links (third-row items) without invalid anchor nesting.
   */
  const openExternal = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <section id="experience" className="pb-24 lg:pb-24 relative lg:-mx-10">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* <h2 className="section-header">Experience</h2> */}

          <div className="relative max-w-[51rem] mx-auto">
            <div className="space-y-12 lg:space-y-4">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative group/experience"
                >
                  <div
                    role="link"
                    tabIndex={0}
                    aria-label={`Open ${exp.company} website`}
                    onClick={() => openExternal(exp.url)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openExternal(exp.url);
                      }
                    }}
                    className="group lg:glow-border rounded-xl lg:p-6 outline-none transition-all duration-300 lg:border border-transparent bg-transparent shadow-none cursor-pointer hover:bg-card/80 hover:backdrop-blur-xl hover:border-border/50 hover:shadow-[var(--shadow-md)] focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-2 sm:gap-6">
                      {/* Dates-as-bullets */}
                      <div className="text-xs font-medium tracking-wider text-muted-foreground/80 pt-1">
                        {exp.period}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-display font-semibold leading-snug">
                              <span className="text-foreground">
                                {exp.role}
                              </span>
                              {exp.current ? (
                                <span className="ml-2 align-middle text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                                  Current
                                </span>
                              ) : null}
                            </h3>
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              onKeyDown={(e) => e.stopPropagation()}
                              className="group/link text-sm text-foreground/80 font-medium mt-1 hover:underline group-hover/experience:text-primary transition-colors flex items-center gap-1"
                            >
                              {exp.company}
                              <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 group-hover/experience:opacity-100 transition-opacity" />
                            </a>
                          </div>
                        </div>

                        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                          {exp.summary}
                        </p>

                        {exp.links?.length ? (
                          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                            {exp.links.map((l) => (
                              <a
                                key={l.url}
                                href={l.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary/90 hover:text-primary transition-colors"
                              >
                                {l.label}
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View all link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 lg:mt-6 text-left lg:ml-6"
            >
              <Link
                to="/experience"
                className="inline-flex items-center gap-1.5 text-base font-semibold texts-foreground hover:text-foreground transition-colors group"
              >
                View full career history
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
