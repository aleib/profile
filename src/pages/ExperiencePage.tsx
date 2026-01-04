import { SEO } from "@/components/SEO";
import LeftSidebar from "@/components/sidebar/LeftSidebar";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BrainCog,
  Briefcase,
  CircleDollarSign,
  Database,
  ExternalLink,
  Gem,
  GraduationCap,
  LucideIcon,
  Wand2,
  Wifi,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const navSections = [
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
] as const;

type Experience = {
  company: string;
  role: string;
  period: string;
  url?: string;
  description: string[];
  technologies?: string[];
  icon?: LucideIcon;
};

const allExperiences: Experience[] = [
  {
    company: "Hunch",
    role: "Co-founder",
    period: "Aug 2021 – Present",
    url: "https://www.linkedin.com/company/hunchtools",
    icon: BrainCog,
    description: [
      "Venture-backed AI platform for teams",
      "Model orchestration, structured templates, and execution primitives (batch runs, web scraping, code execution)",
      "Led product and engineering for the core canvas, templates, and parallel execution system",
    ],
  },
  {
    company: "Aruba, a Hewlett Packard Enterprise company",
    role: "Engineering Manager & Frontend Lead",
    period: "May 2018 – Oct 2020",
    url: "https://www.arubanetworks.com/",
    icon: Wifi,
    description: [
      "Frontend tech lead & manager for Cape Networks (User Experience Insight at Aruba)",
      "Built industry-leading software for networking teams to manage users' connected experience",
      "Focused on putting design and ease of use first",
    ],
  },
  {
    company: "Cape Networks",
    role: "Frontend Lead",
    period: "Mar 2016 – Apr 2018",
    url: "https://www.linkedin.com/company/cape-networks/",
    icon: Wifi,
    description: [
      "Cape is now a Hewlett Packard Enterprise company (Aruba)",
      "Built the simplest way to monitor and improve WiFi networks",
      "Network sensors mimic human users to test WiFi from the user's perspective",
      "Simple dashboards and reports help detect issues and troubleshoot remotely",
    ],
  },
  {
    company: "Freelance",
    role: "Developer & Consultant",
    period: "Apr 2015 – Feb 2016",
    description: [
      "Web applications for Z* Mineral Resource Consultants and The De Beers Group",
      "Front-end web apps for hotel & time-share rentals",
      "Game development with Unity; VR & AR applications",
      "Mobile apps for the finance industry",
    ],
  },
  {
    company: "Merlin",
    role: "Lead Developer",
    period: "Jul 2012 – Mar 2015",
    icon: Wand2,
    description: [
      "Built software for the hotel and time-share industry",
      "Team lead, software architecture design, and mentorship",
      "Tech R&D and project management",
    ],
    technologies: [
      "C#",
      "JavaScript",
      "Durandal",
      ".NET 4.5",
      "ASP.NET MVC 4",
      "MS SQL",
      "Lucene",
    ],
  },
  {
    company: "Saratoga Software",
    role: "Software Developer",
    period: "Sep 2010 – Jun 2012",
    icon: Database,
    description: [
      "Projects for the financial sector — web applications and database systems",
      "R&D team prototyping new technologies in the BI space",
      "Transactional database and data warehouse systems, ETL and database design",
    ],
    technologies: ["C#", "MVC", "WCF", "ASP", "MS SQL Server", "SSIS", "SSRS"],
  },
  {
    company: "IHC Marine and Mineral",
    role: "Engineering Intern",
    period: "2007",
    icon: Gem,
    description: ["Mechatronics degree vacation work"],
  },
  {
    company: "Abbotts College",
    role: "Maths & Science Tutor",
    period: "2005 – 2006",
    icon: GraduationCap,
    description: ["Tutored maths and science for students in grade 10–12"],
  },
  {
    company: "Insinger de Beaufort (BNP Paribas Wealth Management)",
    role: "Research Assistant",
    period: "Apr 2004 – Nov 2004",
    icon: CircleDollarSign,
    description: [
      "Securities research",
      "Programming & financial data capture systems",
    ],
  },
];

const education = {
  institution: "University of Cape Town",
  degree: "BSc Eng, Mechatronics",
  period: "2005 – 2008",
};

const ExperiencePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const activeSectionId = useScrollSpy({
    sectionIds: navSections.map((s) => s.id),
    activationPoint: 0.8,
  });

  return (
    <>
      <SEO
        title="Experience"
        description="15+ years of building software — from network monitoring and hospitality systems to AI-powered products and consumer-scale launches."
        path="/experience"
      />
      <div className="min-h-screen bg-background relative mx-auto px-6 lg:px-8">
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
          <LeftSidebar
            navSections={navSections}
            activeSectionId={activeSectionId}
          />

          <main id="experience" className="flex-1 py-16 lg:py-24">
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
              id="experience"
            >
              <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                Experience
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                15+ years of building software — from network monitoring and
                hospitality systems to AI-powered products and consumer-scale
                launches.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative max-w-4xl">
              <div className="absolute left-0 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 to-primary/10" />

              <div className="space-y-6">
                {allExperiences.map((exp, index) => (
                  <motion.div
                    key={`${exp.company}-${exp.period}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.08, duration: 0.5 }}
                    className="relative pl-8 sm:pl-20"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 sm:left-8 -translate-x-1/2 w-3 h-3 rounded-full border-2 bg-background border-primary/50" />

                    <div className="lg:glass-card lg:rounded-xl lg:px-6 py-6 hover:border-primary/30 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div className="flex items-start gap-3 -mt-8 lg:mt-0">
                          <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                            {exp.icon ? (
                              <exp.icon className="w-5 h-5 text-primary" />
                            ) : (
                              <Briefcase className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <h2 className="text-xl font-display font-semibold flex items-center gap-2 flex-wrap">
                              {exp.company}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              {exp.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-sm text-muted-foreground font-medium font-mono">
                            {exp.period}
                          </span>
                          {exp.url ? (
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                              aria-label={`Visit ${exp.company}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          ) : null}
                        </div>
                      </div>

                      <ul className="space-y-1.5 mb-3 lg:ml-12 ml-2">
                        {exp.description.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-muted-foreground text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {exp.technologies ? (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2 py-0.5 rounded-md bg-secondary/50 text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-16 max-w-4xl pb-40 pt-10"
              id="education"
            >
              <h2 className="text-2xl font-display font-bold mb-6">
                Education
              </h2>
              <div className="glass-card rounded-xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-display font-semibold">
                      {education.institution}
                    </h3>
                    <p className="text-muted-foreground">{education.degree}</p>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">
                    {education.period}
                  </span>
                </div>
              </div>
            </motion.div>
          </main>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="block lg:hidden"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group mb-8"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to home
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ExperiencePage;
