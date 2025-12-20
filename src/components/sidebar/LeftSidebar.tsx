import { Download, Mail } from "lucide-react";

import { useThemeMode } from "@/hooks/useThemeMode";
import { default as SidebarFooter } from "./SidebarFooter";

type NavSection = {
  id: string;
  label: string;
};

type LeftSidebarProps = {
  navSections: readonly NavSection[];
  activeSectionId: string;
};

/**
 * Sticky left rail that anchors identity + navigation.
 *
 * Intent:
 * - Desktop: behave like a persistent left column (stays in view as content scrolls)
 * - Mobile: behave like a sticky “header panel” so navigation is always available
 */
const LeftSidebar = ({ navSections, activeSectionId }: LeftSidebarProps) => {
  const { mode, setThemeMode } = useThemeMode();

  return (
    <aside className="sticky top-0 self-start z-20 bg-background/80 backdrop-blur-xl border-b border-border/50 pt-6 pb-6 lg:z-auto lg:bg-transparent lg:backdrop-blur-0 lg:border-b-0 lg:pt-0 lg:pb-0 lg:top-0 lg:h-screen lg:w-[22rem] lg:flex lg:flex-col lg:justify-between lg:py-20">
      <div>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mt-20">
              Alex Leibhammer
            </h1>
            <p className="mt-3 text-lg sm:text-xl font-display font-medium gradient-text">
              Senior Frontend Engineer • Tech Lead
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-prose">
            I build data and AI-driven products — visual analytics,
            orchestration, workflow automation, and consumer-scale launches.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary/15 text-primary px-3 py-2 text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </a>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-secondary/50 text-foreground px-3 py-2 text-sm font-medium hover:bg-secondary transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>

        <nav className="mt-8 lg:mt-14" aria-label="Page sections">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:block lg:space-y-3">
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
                        : "text-muted-foreground hover:text-foreground",
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

      <SidebarFooter />
    </aside>
  );
};

export default LeftSidebar;
