import type { WorkProject } from "@/data/work";
import { cn, getResponsiveSrcset } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

type WorkProjectsListProps = {
  projects: WorkProject[];
  className?: string;
};

const WorkProjectsList = ({ projects, className }: WorkProjectsListProps) => {
  return (
    <div className={cn("grid gap-4", className)}>
      {projects.map((project, index) => {
        const moreInfo = Array.isArray(project.moreInfo)
          ? project.moreInfo
          : null;
        const hasImage = project.imageSrc && project.imageAlt;

        return (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative"
          >
            <div className="group glow-border rounded-xl p-6 transition-all duration-300 border border-transparent bg-transparent shadow-none hover:bg-background/50 hover:backdrop-blur-xl hover:border-border/10 hover:shadow-[var(--shadow-md)]">
              <div
                className={cn(
                  "grid grid-cols-1 gap-4",
                  hasImage && "sm:grid-cols-[200px_1fr] sm:gap-6"
                )}
              >
                {/* Image */}
                {hasImage ? (
                  <div className="overflow-hidden rounded-sm border border-border/30 bg-secondary/10 h-fit">
                    {project.nameLink ? (
                      <a
                        href={project.nameLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={project.imageSrc}
                          srcSet={getResponsiveSrcset(project.imageSrc ?? "", {
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
                        srcSet={getResponsiveSrcset(project.imageSrc ?? "", {
                          hasThumbnail: project.hasThumbnail,
                        })}
                        sizes="(max-width: 640px) 100vw, 200px"
                        alt={project.imageAlt}
                        loading="lazy"
                        className="w-full aspect-[4/2.7] object-cover transition-transform duration-300 hover:scale-[1.05]"
                      />
                    )}
                  </div>
                ) : null}

                {/* Content */}
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-display font-semibold leading-snug">
                      {project.nameLink ? (
                        <a
                          href={project.nameLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link text-foreground hover:underline transition-colors inline-flex items-center gap-1.5 group-hover:text-primary"
                          aria-label={`Visit ${project.name}`}
                        >
                          {project.name}
                        </a>
                      ) : (
                        <span className="text-foreground">{project.name}</span>
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

                  {project.role ? (
                    <p className="text-sm text-foreground/80 font-medium mt-1">
                      {project.role}
                    </p>
                  ) : null}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md border text-muted-foreground group-hover:text-foreground group-hover:border-foreground/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description - always fully visible */}
                  <div className="mt-3 text-base leading-relaxed text-foreground/80">
                    <p className="whitespace-pre-wrap">{project.description}</p>

                    {moreInfo && moreInfo.length > 0 ? (
                      <ul className="mt-3 list-disc pl-5 space-y-1">
                        {moreInfo.map((item) => (
                          <li key={item} className="marker:text-foreground/30">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium py-1 mt-4 text-muted-foreground group-hover:text-primary transition-colors hover:underline"
                  >
                    {project.isVideo ? (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        Watch Demo
                      </>
                    ) : (
                      <>
                        Visit site
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WorkProjectsList;
