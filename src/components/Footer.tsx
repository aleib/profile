import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="section-container">
        <div className="flex flex-col items-center text-center">
          {/* Availability */}
          <div className="mb-8">
            <p className="text-lg font-display font-medium text-foreground mb-2">
              Available for opportunities
            </p>
            <p className="text-muted-foreground">
              Senior Engineer • Tech Lead • Team Lead • Founding Engineer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            <a
              href="https://www.linkedin.com/in/alexleibhammer/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/aleib"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:aleibhammer@gmail.com"
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>by Alex Leibhammer © {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;