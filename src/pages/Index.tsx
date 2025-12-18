import LeftSidebar from "@/components/LeftSidebar";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Metrics from "@/components/sections/Metrics";
import Portfolio from "@/components/sections/Portfolio";
import Skills from "@/components/sections/Skills";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "portfolio", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "metrics", label: "Impact" },
  { id: "contact", label: "Contact" },
] as const;

const Index = () => {
  const activeSectionId = useScrollSpy({
    sectionIds: navSections.map((s) => s.id),
    // Slightly biased towards the center of the viewport so the highlight feels like "reading position".
    rootMargin: "-35% 0px -60% 0px",
  });

  return (
    <div className="min-h-screen bg-background relative">
      {/* Ambient background (keeps the vibe of the old hero, but works for the 2-column layout). */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        <div className="absolute top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="section-container relative z-10 lg:flex lg:gap-16">
        {/* Left sidebar */}
        <LeftSidebar
          navSections={navSections}
          activeSectionId={activeSectionId}
        />

        {/* Right content */}
        <main className="flex-1 pb-16 lg:py-12">
          <About />
          <Experience />
          <Portfolio />
          <Skills />
          <Metrics />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default Index;
