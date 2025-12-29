import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import { SEO } from "@/components/SEO";
import LeftSidebar from "@/components/sidebar/LeftSidebar";
import { usePointerGlow } from "@/hooks/usePointerGlow";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const navSections = [
  { id: "about", label: "About" },
  { id: "work", label: "Products" },
  // { id: "metrics", label: "Impact" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

const Index = () => {
  const location = useLocation();

  const {
    containerRef,
    glowStyle,
    isActive: isGlowActive,
  } = usePointerGlow<HTMLDivElement>();

  const activeSectionId = useScrollSpy({
    sectionIds: navSections.map((s) => s.id),
  });

  // Handle hash navigation (e.g., /#contact)
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  // Handle SPA redirect from 404.html
  useEffect(() => {
    const redirect = sessionStorage.getItem("redirect");
    if (redirect) {
      sessionStorage.removeItem("redirect");
      // Only navigate if it's not the home page
      if (redirect !== "/" && redirect !== "") {
        window.history.replaceState(null, "", redirect);
      }
    }
  }, []);

  return (
    <>
      <SEO path="/" />
      <div
        id="container"
        ref={containerRef}
        className="min-h-screen dark:bg-slate-950 light:bg-slate-50 relative group/container"
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
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float transition-opacity opacity-0  duration-1000 delay-[5s] group-hover/container:opacity-100" />
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
    </>
  );
};

export default Index;
