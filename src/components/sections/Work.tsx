import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { featuredWorkProjects } from "../../data/work";

const Work = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const detailsIdPrefix = useId();
  const [expandedProjectName, setExpandedProjectName] = useState<string | null>(
    null
  );

  /**
   * Converts a human label (e.g. project name) into a stable, valid DOM id segment.
   * This keeps `aria-controls` and `id` safe even if names include spaces/punctuation.
   */
  const toDomIdSegment = useCallback((value: string) => {
    const slug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return slug.length > 0 ? slug : "item";
  }, []);

  /**
   * Treat the whole card as an expandable control (not a link), while keeping
   * the nested "Visit site" anchor independently clickable.
   */
  const toggleExpanded = useCallback((projectName: string) => {
    setExpandedProjectName((prev) =>
      prev === projectName ? null : projectName
    );
  }, []);

  return (
    <section id="work" className="py-24 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="section-header">Products</h2>

          <div className="grid md:grid-cols-1 gap-4 max-w-[51rem] mx-auto">
            {featuredWorkProjects.map((project, index) => {
              const detailsId = `${detailsIdPrefix}-${toDomIdSegment(
                project.name
              )}`;
              const isExpanded = expandedProjectName === project.name;

              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative"
                >
                  {/*
                    We use a <div role="button"> (not an <a>) so the primary action is
                    expanding/collapsing, while still allowing a real nested external link.
                  */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Toggle details for ${project.name}`}
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                    onClick={() => toggleExpanded(project.name)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleExpanded(project.name);
                      }
                    }}
                    className="group glow-border rounded-xl p-6 outline-none transition-all duration-300 border border-transparent bg-transparent shadow-none cursor-pointer hover:bg-background/50 hover:backdrop-blur-xl hover:border-border/10 hover:shadow-[var(--shadow-md)] focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-6">
                      <div className="overflow-hidden rounded-sm border border-border/30 bg-secondary/10 h-fit">
                        <img
                          src={project.imageSrc}
                          alt={project.imageAlt}
                          loading="lazy"
                          className="w-full aspect-[4/3] object-cover transition-transform duration-300 hover:scale-[1.2]"
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

                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                            <span className="text-xs text-muted-foreground font-mono group-hover:text-foreground">
                              {project.period}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground font-medium mt-1">
                          {project.role}
                        </p>

                        <p className="mt-3 text-base hover-text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        {/* <div className="shrink-0 text-left">
                          <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity group-hover:delay-1000 group-hover:duration-500 duration-0 text-xs text-muted-foreground">
                            {isExpanded
                              ? "Click to collapse"
                              : "Click to expand"}
                          </span>
                        </div> */}

                        <AnimatePresence initial={false}>
                          {isExpanded ? (
                            <motion.div
                              id={detailsId}
                              key="details"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4">
                                {project.longDescription ? (
                                  <p className="text-sm text-muted-foreground/80 leading-relaxed">
                                    {project.longDescription}
                                  </p>
                                ) : null}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>

                        <div className="flex items-center justify-between gap-x-4 gap-y-2 mt-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground group-hover:text-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors"
                          >
                            Visit site
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
