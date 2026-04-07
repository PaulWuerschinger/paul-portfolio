"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import BlurText from "@/components/ui/blur-text";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/PaulWuerschinger" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/paulwuerschinger" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/paulwuerschinger" },
  { icon: Mail, label: "Email", href: "mailto:paulwuerschinger@gmail.com" },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-line", {
        scrollTrigger: {
          trigger: ".contact-content",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });

      gsap.from(".social-link", {
        scrollTrigger: {
          trigger: ".social-links",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 flex items-center"
    >
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--primary)]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Section header */}
        <div className="mb-8">
          <p className="text-[var(--accent)] text-sm font-mono tracking-[0.2em] uppercase mb-4">
            03 — Contact
          </p>
        </div>

        <div className="contact-content space-y-6">
          <div className="contact-line">
            <BlurText
              text="Let's Build Something"
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
              animateBy="words"
              delay={120}
            />
          </div>
          <div className="contact-line">
            <span className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gradient-primary">
              Extraordinary
            </span>
          </div>

          <p className="contact-line text-lg text-[var(--muted-foreground)] max-w-xl leading-relaxed mt-8">
            Got a project in mind? I&apos;m always interested in hearing about
            new opportunities, collaborations, and ideas worth exploring.
          </p>

          <div className="contact-line flex flex-wrap gap-4 mt-8">
            <a href="mailto:paulwuerschinger@gmail.com">
              <ShimmerButton
                shimmerColor="rgba(96, 119, 221, 0.5)"
                background="rgba(96, 119, 221, 0.1)"
                className="text-base font-medium"
              >
                <span className="flex items-center gap-2">
                  <Mail size={18} />
                  Get in Touch
                </span>
              </ShimmerButton>
            </a>
          </div>
        </div>

        {/* Social links */}
        <div className="social-links flex gap-4 mt-16">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="social-link group p-4 rounded-full border border-white/[0.06] bg-white/[0.02] hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 transition-all duration-300"
            >
              <social.icon
                size={20}
                className="text-[var(--muted-foreground)] group-hover:text-white transition-colors"
              />
            </a>
          ))}
        </div>

        {/* Creator CTA */}
        <div className="contact-line mt-16 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold text-lg">Are you a Creator?</p>
              <p className="text-[var(--muted-foreground)] text-sm">
                Join our affiliate program and earn up to 30% recurring commission promoting our apps.
              </p>
            </div>
            <a
              href="/apps"
              className="shrink-0 px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Creator Program
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Separator */}
        <div className="mt-24 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--muted-foreground)]">
              &copy; {new Date().getFullYear()} Paul Wurschinger. All rights
              reserved.
            </p>
            <p className="text-xs text-white/20 font-mono">
              Crafted with Next.js, GSAP &amp; Motion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
