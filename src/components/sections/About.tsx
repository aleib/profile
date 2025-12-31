const About = () => {
  return (
    <section id="about" className="pt-0 pb-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="section-container relative z-10">
        <div className="section-inner">
          {/* <h2 className="text-2xl sm:text-3xl font-display font-bold mb-8">
            About Me
          </h2> */}

          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/70 font-normal">
            <p>
              I'm a senior software engineer and former startup founder who
              builds high-impact products at the intersection of design,
              engineering, and systems thinking.
            </p>
            <p>
              Over the last decade, I've led and shipped production software
              across AI, data platforms, and workflow automation — from early
              prototypes to systems used by hundreds of thousands of people. I
              specialize in frontend architecture, complex UIs, and turning
              ambiguous product problems into reliable, scalable software.
            </p>
            <p>
              I work best in teams that value autonomy, quality, and clear
              thinking. I bring founder-level ownership, strong technical
              judgment, and a deep respect for craft — helping teams move faster
              without breaking what matters.
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
        </div>
      </div>
    </section>
  );
};

export default About;
