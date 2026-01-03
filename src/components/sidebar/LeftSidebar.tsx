import { Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { default as SidebarFooter } from "./SidebarFooter";

type NavSection = {
  id: string;
  label: string;
};

type LeftSidebarProps = {
  navSections: readonly NavSection[];
  activeSectionId?: string;
};

/**
 * Sticky left rail that anchors identity + navigation.
 *
 * Intent:
 * - Desktop: behave like a persistent left column (stays in view as content scrolls)
 * - Mobile: behave like a sticky “header panel” so navigation is always available
 */
const LeftSidebar = ({ navSections, activeSectionId }: LeftSidebarProps) => {
  return (
    <aside className="pt-6 pb-6 lg:sticky lg:top-0 lg:self-start lg:z-auto lg:bg-transparent lg:backdrop-blur-0 lg:border-b-0 lg:pt-0 lg:pb-0 lg:h-screen lg:w-[22rem] lg:flex lg:flex-col lg:justify-between lg:py-20">
      <div>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl sm:text-4xl sm:text-[2.5rem] font-display font-bold tracking-tight mt-8 lg:mt-20">
              Alex Leibhammer
            </h1>
            <p className="mt-3 text-lg sm:text-xl font-display font-medium gradient-text">
              Senior Software Engineer
            </p>
          </div>

          <p className="text-foreground/80 leading-relaxed max-w-prose">
            Frontend, Systems & Product Thinking, building high-impact software
            through thoughtful design and durable engineering.
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 text-foreground/80 py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </Link>
            <span className="my-0 text-muted-foreground text-xs opacity-50">
              •
            </span>
            <a
              href="/Alex-Leibhammer-Resume-2026.pdf"
              download
              className="inline-flex items-center gap-2 text-foreground/80 py-2 text-sm font-medium hover:text-foreground transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>

        <nav className="hidden lg:block mt-14" aria-label="Page sections">
          <ul className="space-y-3">
            {navSections.map((item) => {
              const isActive = item.id === activeSectionId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "group inline-flex items-center gap-3 text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-foreground",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "h-px bg-muted-foreground/50 transition-all",
                        isActive ? "w-12 bg-primary" : "w-6 group-hover:w-10",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                    <span className="tracking-wide">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="hidden lg:block">
        <SidebarFooter />
      </div>
    </aside>
  );
};

export default LeftSidebar;
