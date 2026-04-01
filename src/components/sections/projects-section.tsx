"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import BlurText from "@/components/ui/blur-text";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  color: string;
  year: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "TerminalX",
    description:
      "A next-gen terminal emulator with AI-powered autocompletion, custom themes, and split-pane workflows.",
    tags: ["Swift", "SwiftUI", "AI", "macOS"],
    color: "var(--primary)",
    year: "2026",
    category: "Desktop App",
  },
  {
    id: 2,
    title: "Lockd",
    description:
      "Privacy-first password manager with biometric auth, end-to-end encryption, and cross-platform sync.",
    tags: ["React Native", "TypeScript", "E2EE"],
    color: "var(--accent)",
    year: "2025",
    category: "Mobile App",
  },
  {
    id: 3,
    title: "SkinScan Daily",
    description:
      "AI-powered skin analysis app using computer vision. Track skin health over time with personalized insights.",
    tags: ["Next.js", "Python", "TensorFlow", "iOS"],
    color: "#22c55e",
    year: "2025",
    category: "AI / Health",
  },
  {
    id: 4,
    title: "Cosmos Dashboard",
    description:
      "Real-time analytics dashboard with 3D data visualization, WebGL charts, and live streaming data.",
    tags: ["Three.js", "WebGL", "D3.js", "WebSockets"],
    color: "#f59e0b",
    year: "2024",
    category: "Web App",
  },
  {
    id: 5,
    title: "AuraFlow",
    description:
      "Generative art platform letting users create, mint, and trade algorithm-driven artworks.",
    tags: ["React", "GLSL", "Web3", "Canvas"],
    color: "#a855f7",
    year: "2024",
    category: "Creative",
  },
  {
    id: 6,
    title: "Pulse CMS",
    description:
      "Headless CMS with visual builder, real-time collaboration, and AI content generation.",
    tags: ["Next.js", "tRPC", "Prisma", "AI"],
    color: "#06b6d4",
    year: "2024",
    category: "SaaS",
  },
];

const categories = ["All", ...new Set(projects.map((p) => p.category))];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".filter-btn", {
        scrollTrigger: {
          trigger: ".filter-bar",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-[var(--accent)] text-sm font-mono tracking-[0.2em] uppercase mb-4">
            02 — Work
          </p>
          <BlurText
            text="Selected Projects"
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
            animateBy="words"
            delay={150}
          />
        </div>

        {/* Filter bar */}
        <div className="filter-bar flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-white"
                  : "border-white/[0.06] text-[var(--muted-foreground)] hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden cursor-pointer hover:border-white/[0.12] transition-all duration-500"
              >
                {/* Color accent bar */}
                <div
                  className="h-[2px] w-full transition-all duration-500"
                  style={{
                    background:
                      hoveredId === project.id
                        ? `linear-gradient(90deg, transparent, ${project.color}, transparent)`
                        : "transparent",
                  }}
                />

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p
                        className="text-xs font-mono tracking-wider mb-1"
                        style={{ color: project.color }}
                      >
                        {project.category} — {project.year}
                      </p>
                      <h3 className="text-xl font-bold text-white group-hover:text-gradient-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github size={14} />
                      </button>
                      <button
                        className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
                        aria-label={`Open ${project.title}`}
                      >
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[11px] font-mono border border-white/[0.06] text-[var(--muted-foreground)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight
                    size={20}
                    style={{ color: project.color }}
                  />
                </div>

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `0 0 60px ${project.color}10, 0 0 120px ${project.color}05`,
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
