"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";
import { ChevronDown } from "lucide-react";

const MESSAGES: string[] = [
  "PAUL WURSCHINGER\nCREATIVE DEVELOPER\nAUSTRIA",
  "I BUILD APPS\nTHAT FEEL ALIVE",
  "REACT + NEXT.JS\nSWIFT + SWIFTUI\nTHREE.JS + GSAP",
  "DESIGN MEETS CODE\nPIXEL PERFECT\nALWAYS",
  "LETS BUILD\nSOMETHING\nEXTRAORDINARY",
];

export function HeroSection() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(
    () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const scrollToAbout = () => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8"
    >
      {/* Radial glow behind the board */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--primary)]/[0.04] blur-[150px] pointer-events-none" />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      {/* Board */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="w-full max-w-4xl"
      >
        <TextFlippingBoard
          text={MESSAGES[msgIdx]}
          className="!max-w-none !rounded-2xl !p-3 md:!p-5 !shadow-[0_20px_80px_-20px_rgba(96,119,221,0.15)]"
        />
      </motion.div>

      {/* Subtitle below the board */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-10 text-sm md:text-base text-[var(--muted-foreground)] tracking-[0.15em] uppercase font-light"
      >
        Creative Developer &middot; Austria
      </motion.p>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted-foreground)] hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
