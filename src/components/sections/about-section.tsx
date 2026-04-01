"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NumberTicker } from "@/components/ui/number-ticker";
import BlurText from "@/components/ui/blur-text";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 40, suffix: "+", label: "Projects Delivered" },
  { value: 12, suffix: "", label: "Technologies" },
  { value: 100, suffix: "%", label: "Passion" },
];

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Three.js / WebGL", level: 80 },
  { name: "Swift / SwiftUI", level: 85 },
  { name: "Node.js", level: 88 },
  { name: "UI/UX Design", level: 82 },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillBarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".skill-bar-fill", {
        scrollTrigger: {
          trigger: skillBarsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".about-image-wrapper", {
        scrollTrigger: {
          trigger: ".about-image-wrapper",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <p className="text-[var(--accent)] text-sm font-mono tracking-[0.2em] uppercase mb-4">
            01 — About
          </p>
          <BlurText
            text="Crafting Digital Experiences"
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
            animateBy="words"
            delay={150}
          />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left: Bio */}
          <div className="space-y-6">
            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
              I&apos;m Paul — a creative developer based in Austria who thrives at the
              intersection of design and engineering. I build immersive web
              experiences, native mobile apps, and everything in between.
            </p>
            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
              With a deep focus on motion design, 3D graphics, and
              pixel-perfect interfaces, I craft products that don&apos;t just work —
              they feel alive. Every project is an opportunity to push
              boundaries and create something remarkable.
            </p>
            <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring new frameworks,
              contributing to open source, or sketching out the next big idea.
            </p>
          </div>

          {/* Right: Skills */}
          <div ref={skillBarsRef} className="space-y-6">
            {skills.map((skill) => (
              <div key={skill.name} className="group">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)] font-mono">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="skill-bar-fill h-full rounded-full"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, var(--primary), var(--accent))`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-[var(--primary)]/20 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 flex items-baseline">
                <NumberTicker
                  value={stat.value}
                  className="text-3xl md:text-4xl font-extrabold text-white"
                />
                <span className="text-[var(--primary)]">{stat.suffix}</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] tracking-wide uppercase">
                {stat.label}
              </p>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 glow-primary pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
