import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Vite",
  "Vike (SSR/SSG)",
  "Cloudflare",
  "Frontend Architecture",
  "Node.js",
  "Data Visualization",
  "Product Leadership",
  "Workflow Automation",
  "AI Integrations",
  "API Design",
  "Performance",
  "CI/CD",
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-12 text-center">
            Skills & Technologies
          </h2>

          <div className="flex flex-wrap justify-center gap-3 section-inner">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-foreground font-medium text-sm sm:text-base hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
