import { cn, getResponsiveSrcset } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
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
    <section id="work" className="pb-24 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="sr-only">Products</h2>

          <div className="grid md:grid-cols-1 gap-10 lg:gap-4 max-w-[51rem] mx-auto">
            {featuredWorkProjects.map((project, index) => {
              const detailsId = `${detailsIdPrefix}-${toDomIdSegment(
                project.name
              )}`;
              const isExpanded = expandedProjectName === project.name;
              const description = project.description;
              const moreInfo = Array.isArray(project.moreInfo)
                ? project.moreInfo
                : null;

              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative"
                >
                  <div className="group glow-border rounded-xl py-6 lg:px-6 transition-all duration-300 border border-transparent bg-transparent shadow-none hover:bg-background/50 hover:backdrop-blur-xl hover:border-border/10 hover:shadow-[var(--shadow-md)]">
                    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-6">
                      <div className="overflow-hidden rounded-sm border border-border/30 bg-secondary/10 h-fit">
                        {project.nameLink ? (
                          <a
                            href={project.nameLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <img
                              src={project.imageSrc}
                              srcSet={getResponsiveSrcset(project.imageSrc, {
                                hasThumbnail: project.hasThumbnail,
                              })}
                              sizes="(max-width: 640px) 100vw, 200px"
                              alt={project.imageAlt}
                              loading="lazy"
                              className="w-full aspect-[4/2.7] object-cover transition-transform duration-300 hover:scale-[1.05] cursor-pointer"
                            />
                          </a>
                        ) : (
                          <img
                            src={project.imageSrc}
                            srcSet={getResponsiveSrcset(project.imageSrc, {
                              hasThumbnail: project.hasThumbnail,
                            })}
                            sizes="(max-width: 640px) 100vw, 200px"
                            alt={project.imageAlt}
                            loading="lazy"
                            className="w-full aspect-[4/2.7] object-cover transition-transform duration-300 hover:scale-[1.05]"
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-lg font-display font-semibold leading-snug">
                            {project.nameLink ? (
                              <a
                                href={project.nameLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link text-foreground hover:underline transition-colors inline-flex items-center gap-1.5 group-hover:text-primary"
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                                aria-label={`Visit ${project.name}`}
                              >
                                {project.name}
                              </a>
                            ) : (
                              <span className="text-foreground">
                                {project.name}
                              </span>
                            )}
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

                        <p className="text-sm text-foreground/80 font-medium mt-1">
                          {project.role}
                        </p>

                        {/* LinkedIn-style description: clamp to 3 lines + "... More" affordance */}
                        <button
                          type="button"
                          aria-label={
                            isExpanded
                              ? `Collapse description for ${project.name}`
                              : `Expand description for ${project.name}`
                          }
                          aria-expanded={isExpanded}
                          aria-controls={detailsId}
                          onClick={() => toggleExpanded(project.name)}
                          className="relative mt-3 block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm"
                        >
                          <motion.div
                            id={detailsId}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className={cn(
                              "block text-base leading-relaxed hover-text-muted-foreground text-foreground/80 whitespace-pre-wrap"
                            )}
                          >
                            <p
                              className={cn(
                                "whitespace-pre-wrap",
                                isExpanded ? null : "line-clamp-3"
                              )}
                            >
                              {description}
                            </p>

                            {moreInfo ? (
                              isExpanded && moreInfo.length > 0 ? (
                                <ul className="mt-3 list-disc pl-5 space-y-1">
                                  {moreInfo.map((item) => (
                                    <li
                                      key={item}
                                      className="marker:text-foreground/30"
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              ) : null
                            ) : null}
                          </motion.div>

                          {!isExpanded && (
                            <span
                              className={cn(
                                "select-none text-sm transition-colors absolute bottom-1 right-0 text-right",
                                "pl-24 bg-gradient-to-r from-transparent via-background to-background",
                                "group-hover:text-foreground text-muted-foreground hover:text-primary/80" // make it look clickable
                              )}
                            >
                              ... see more
                            </span>
                          )}
                        </button>

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
                            className="inline-flex items-center gap-1.5 text-sm font-medium py-1 text-muted-foreground group-hover:text-primary transition-colors hover:underline"
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
              className="mt-0 text-left lg:ml-6"
            >
              <Link
                to="/work"
                className="inline-flex items-center gap-1.5 text-base font-semibold texts-foreground hover:text-foreground transition-colors group"
              >
                View Full Product Portfolio
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
