import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import LeftSidebar from "@/components/sidebar/LeftSidebar";
import { usePointerGlow } from "@/hooks/usePointerGlow";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const navSections = [
  { id: "about", label: "About" },
  { id: "work", label: "Products" },
  // { id: "metrics", label: "Impact" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

const Index = () => {
  const {
    containerRef,
    glowStyle,
    isActive: isGlowActive,
  } = usePointerGlow<HTMLDivElement>();

  const activeSectionId = useScrollSpy({
    sectionIds: navSections.map((s) => s.id),
  });

  return (
    <div
      ref={containerRef}
      className="min-h-screen dark:bg-slate-950 light:bg-slate-50 relative"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" /> */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            isGlowActive ? "opacity-100" : "opacity-0"
          )}
          style={glowStyle}
        />
        <div className="absolute top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="section-container relative z-10 lg:flex lg:gap-24">
        {/* Left sidebar */}
        <LeftSidebar
          navSections={navSections}
          activeSectionId={activeSectionId}
        />

        {/* Right content */}
        <main className="flex-1 py-16 lg:py-24">
          <About />
          <Work />
          {/* <Metrics /> */}
          <Experience />
          <Skills />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default Index;
