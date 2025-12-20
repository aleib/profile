import WorkProjectsList from "@/components/sections/work/WorkProjectsList";
import LeftSidebar from "@/components/sidebar/LeftSidebar";
import { allWorkProjects } from "@/data/work";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const navSections = [{ id: "work", label: "Work" }] as const;

const WorkPage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        <div className="absolute top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="section-container relative z-10 lg:flex lg:gap-24">
        <LeftSidebar navSections={navSections} activeSectionId="work" />

        <main id="work" className="flex-1 py-16 lg:py-24">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group mb-8"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Work
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Products I've helped build — from AI platforms and visual
              analytics tools to consumer-scale launches with hundreds of
              thousands of users.
            </p>
          </motion.div>

          {/* Projects grid */}
          <WorkProjectsList projects={allWorkProjects} className="max-w-4xl" />
        </main>
      </div>
    </div>
  );
};

export default WorkPage;
