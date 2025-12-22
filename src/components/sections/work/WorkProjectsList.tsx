import { Button } from "@/components/ui/button";
import type { WorkProject } from "@/data/work";
import { cn } from "@/lib/utils";
import { ExternalLink, Play } from "lucide-react";

type WorkProjectsListProps = {
  projects: WorkProject[];
  className?: string;
};

const WorkProjectsList = ({ projects, className }: WorkProjectsListProps) => {
  return (
    <div className={cn("grid gap-8", className)}>
      {projects.map((project) => (
        <div
          key={project.name}
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

          {project.moreInfo ? (
            Array.isArray(project.moreInfo) ? (
              <div className="text-muted-foreground/80 text-sm mb-6 leading-relaxed">
                <p className="whitespace-pre-wrap">{project.moreInfo[0]}</p>
                {project.moreInfo.length > 1 ? (
                  <ul className="mt-3 list-disc pl-5 space-y-1">
                    {project.moreInfo.slice(1).map((item) => (
                      <li key={item} className="marker:text-foreground/30">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : (
              <p className="text-muted-foreground/80 text-sm mb-6 leading-relaxed whitespace-pre-wrap">
                {project.moreInfo}
              </p>
            )
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
        </div>
      ))}
    </div>
  );
};

export default WorkProjectsList;
