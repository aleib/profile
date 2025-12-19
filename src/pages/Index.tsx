import LeftSidebar from "@/components/LeftSidebar";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Metrics from "@/components/sections/Metrics";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import { usePointerGlow } from "@/hooks/usePointerGlow";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const navSections = [
  { id: "about", label: "About" },
  { id: "work", label: "Products" },
  { id: "metrics", label: "Impact" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

const Index = () => {
  const {
    containerRef,
    glowStyle,
    isActive: isGlowActive,
  } = usePointerGlow<HTMLDivElement>({
    // Slightly larger radius keeps the glow ambient and subtle on the full-page layout.
    radiusPx: 760,
    opacity: 0.05,
  });

  const activeSectionId = useScrollSpy({
    sectionIds: navSections.map((s) => s.id),
    // Slightly biased towards the center of the viewport so the highlight feels like "reading position".
    rootMargin: "-35% 0px -60% 0px",
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative">
      {/* Ambient background (keeps the vibe of the old hero, but works for the 2-column layout). */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        {/* Cursor-follow glow: subtle, but adds a bit of "depth" to the dark theme. */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-300 ${
            isGlowActive ? "opacity-100" : "opacity-0"
          }`}
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
          <Metrics />
          <Experience />
          <Skills />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default Index;
