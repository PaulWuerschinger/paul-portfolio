"use client";

import { Marquee } from "@/components/ui/marquee";

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Three.js",
  "Swift",
  "SwiftUI",
  "Node.js",
  "Python",
  "GSAP",
  "Framer Motion",
  "Tailwind CSS",
  "PostgreSQL",
  "WebGL",
  "GLSL",
  "Docker",
  "Prisma",
];

export function TechMarquee() {
  return (
    <div className="relative py-16 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

      <Marquee pauseOnHover className="[--duration:30s]">
        {technologies.map((tech) => (
          <div
            key={tech}
            className="mx-4 flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-[var(--primary)]/20 transition-colors duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse-glow" />
            <span className="text-sm font-medium text-[var(--muted-foreground)] whitespace-nowrap">
              {tech}
            </span>
          </div>
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover className="[--duration:35s] mt-4">
        {[...technologies].reverse().map((tech) => (
          <div
            key={tech}
            className="mx-4 flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-[var(--accent)]/20 transition-colors duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-glow" />
            <span className="text-sm font-medium text-[var(--muted-foreground)] whitespace-nowrap">
              {tech}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
