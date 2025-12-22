import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="pt-0 pb-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="section-inner"
        >
          {/* <h2 className="text-2xl sm:text-3xl font-display font-bold mb-8">
            About Me
          </h2> */}

          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/70 font-normal">
            <p>
              I'm an software engineer and founder passionate about building
              products that blend thoughtful design and practical engineering.
            </p>
            <p>
              Recently I've focused on production-grade frontends for data and
              AI-driven products. Over the last five years I've co-founded and
              delivered multiple venture products across visual analytics, model
              orchestration, workflow automation, and content systems.
            </p>

            <p>
              I combine frontend expertise with product sensibility—owning
              architecture, reliability, performance, and execution. I've
              delivered collaborative data canvases, AI-first workspaces for
              thousands of parallel tasks, consumer features reaching 300K+
              users, and agentic workflow systems.
            </p>

            <p>
              I'm most effective where UX quality, engineering execution, and
              pragmatic leadership intersect.
            </p>
          </div>

          {/* Quick highlights */}
          {/* <motion.div
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
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
