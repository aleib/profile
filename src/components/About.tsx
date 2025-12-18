import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      
      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8 text-center">
            About Me
          </h2>
          
          <div className="glass-card rounded-2xl p-8 sm:p-10">
            <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground">
              I build production-grade frontends and lead engineering for data and AI-driven products. 
              I've spent five years shipping startups across visual analytics, model orchestration, 
              workflow automation and large-scale audience content. I combine React/TypeScript depth 
              with product leadership—owning UI architecture, reliability, performance and execution.
            </p>
          </div>
          
          {/* Quick highlights */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {[
              { label: "Years Experience", value: "5+" },
              { label: "Products Shipped", value: "4" },
              { label: "Startups Founded", value: "2" },
              { label: "Users Reached", value: "300K+" },
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center p-4 rounded-xl bg-secondary/30 border border-border/50"
              >
                <div className="text-2xl sm:text-3xl font-display font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;