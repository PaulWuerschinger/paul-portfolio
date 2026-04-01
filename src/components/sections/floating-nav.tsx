"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, User, Briefcase, Mail } from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";

const navItems = [
  { icon: Home, label: "Home", href: "#" },
  { icon: User, label: "About", href: "#about" },
  { icon: Briefcase, label: "Projects", href: "#projects" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

export function FloatingNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <Dock
            iconSize={36}
            iconMagnification={54}
            iconDistance={120}
            className="border-white/[0.08] bg-[#111118]/80 backdrop-blur-xl"
          >
            {navItems.map((item) => (
              <DockIcon key={item.label}>
                <button
                  onClick={() => handleClick(item.href)}
                  aria-label={item.label}
                  className="flex items-center justify-center w-full h-full rounded-full hover:bg-white/5 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-[var(--muted-foreground)] hover:text-white transition-colors" />
                </button>
              </DockIcon>
            ))}
          </Dock>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
