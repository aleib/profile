import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Zap, Rocket, Code } from "lucide-react";

const metrics = [
  {
    value: "300K+",
    label: "Consumer Users",
    sublabel: "LinkedIn Rewind 2024",
    icon: Users,
  },
  {
    value: "1000s",
    label: "Parallel AI Tasks",
    sublabel: "Hunch execution system",
    icon: Zap,
  },
  {
    value: "4",
    label: "Venture Products",
    sublabel: "Built and launched",
    icon: Rocket,
  },
  {
    value: "5+",
    label: "Years Building",
    sublabel: "As founding engineer",
    icon: Code,
  },
];

const Metrics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="metrics" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      
      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-12 text-center">
            Impact
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-card rounded-2xl p-6 text-center hover:border-primary/30 transition-colors"
                >
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-display font-bold gradient-text mb-2">
                    {metric.value}
                  </div>
                  <div className="text-foreground font-medium mb-1">
                    {metric.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.sublabel}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Metrics;