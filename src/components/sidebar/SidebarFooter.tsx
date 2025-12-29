import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react";

import { useThemeMode } from "@/hooks/useThemeMode";

/**
 * Footer component for the sidebar.
 */
const SidebarFooter = () => {
  const { mode, setThemeMode } = useThemeMode();
  const Icon = mode === "light" ? Sun : Moon;

  return (
    <div className="mt-8 lg:mt-0 mb-6">
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/aleib"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-2 rounded-lg bg-secondary/40 hover:bg-secondary cursor-pointer"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </a>
        <a
          href="https://www.linkedin.com/in/alexleibhammer/"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-2 rounded-lg bg-secondary/40 hover:bg-secondary cursor-pointer"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </a>
        <a
          href="mailto:aleibhammer@gmail.com"
          className="group p-2 rounded-lg bg-secondary/40 hover:bg-secondary cursor-pointer"
          aria-label="Email"
        >
          <Mail className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </a>
        <button
          className="group p-2 rounded-lg bg-secondary/40 hover:bg-secondary cursor-pointer"
          onClick={() => setThemeMode(mode === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
        >
          <Icon
            className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default SidebarFooter;
