import { Menu, X } from "lucide-react";
import { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import SidebarFooter from "./SidebarFooter";

type NavSection = {
  id: string;
  label: string;
};

type MobileNavProps = {
  navSections: readonly NavSection[];
  activeSectionId?: string;
};

/**
 * Mobile-only floating navigation button that opens a bottom drawer
 * for section navigation. Hidden on lg+ breakpoints.
 */
const MobileNav = ({ navSections, activeSectionId }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setOpen(false);
    // Small delay to let drawer close animation start before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <div className="lg:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </DrawerTrigger>

        <DrawerContent className="px-6 pb-8">
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>

          <div className="flex items-center justify-between py-4">
            <span className="text-lg font-display font-semibold">
              Sections
            </span>
            <DrawerClose asChild>
              <button
                className="p-2 rounded-lg hover:bg-secondary/60 transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </DrawerClose>
          </div>

          <nav aria-label="Page sections">
            <ul className="space-y-1">
              {navSections.map((item) => {
                const isActive = item.id === activeSectionId;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={[
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "h-px bg-muted-foreground/50 transition-all",
                          isActive ? "w-8 bg-primary" : "w-4",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-6 pt-6 border-t border-border">
            <SidebarFooter />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNav;
