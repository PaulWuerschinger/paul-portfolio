"use client";

import { FloatingNav } from "@/components/sections/floating-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { TechMarquee } from "@/components/sections/tech-marquee";

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0c] text-white overflow-hidden">
      {/* Floating macOS-style dock nav */}
      <FloatingNav />

      {/* Split-Flap Hero */}
      <HeroSection />

      {/* Tech marquee divider */}
      <TechMarquee />

      {/* About section */}
      <AboutSection />

      {/* Tech marquee divider */}
      <TechMarquee />

      {/* Projects section */}
      <ProjectsSection />

      {/* Contact section */}
      <ContactSection />
    </main>
  );
}
