"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Smartphone, Mail, ChevronDown } from "lucide-react";
import BlurText from "@/components/ui/blur-text";
import Link from "next/link";

interface App {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  color: string;
  icon: string;
  tags: string[];
  comingSoon?: boolean;
}

const apps: App[] = [
  {
    id: "lockd",
    name: "Lockd",
    tagline: "Focus-First Training Companion",
    description:
      "Automated training plans, session tracking, and progress analysis. Built for lifters who want structure without the noise.",
    category: "Fitness",
    color: "#6366f1",
    icon: "🏋️",
    tags: ["iOS", "Training Plans", "Session Tracking"],
  },
  {
    id: "swingiq",
    name: "SwingIQ",
    tagline: "AI Tennis Coach",
    description:
      "Analyzes your game and gives personalized coaching powered by AI. Your pocket tennis coach for every session.",
    category: "Sports",
    color: "#22c55e",
    icon: "🎾",
    tags: ["iOS", "AI Coach", "Game Analysis"],
  },
  {
    id: "roastmyfit",
    name: "Roast My Fit",
    tagline: "AI Fashion Roast",
    description:
      "Upload a photo, get brutally honest feedback on your outfit. Fun, viral, and actually useful style advice.",
    category: "Lifestyle",
    color: "#f43f5e",
    icon: "👔",
    tags: ["iOS", "AI", "Fashion"],
  },
  {
    id: "onepercentclub",
    name: "One Percent Club",
    tagline: "Daily Goals & Habit Tracker",
    description:
      "Get 1% better every day. Daily challenges, streak tracking, and a community that holds you accountable.",
    category: "Productivity",
    color: "#f59e0b",
    icon: "🎯",
    tags: ["iOS", "Habits", "Goal Tracking"],
  },
  {
    id: "sundeck",
    name: "Sundeck",
    tagline: "Smart Tanning App",
    description:
      "Track your UV exposure, optimize your tan, and protect your skin. Smart tanning for the modern sun lover.",
    category: "Health",
    color: "#fb923c",
    icon: "☀️",
    tags: ["iOS", "UV Tracking", "Skin Protection"],
  },
  {
    id: "selah",
    name: "Selah",
    tagline: "Pray Simple",
    description:
      "A minimalist prayer app for daily devotion, journaling, and spiritual growth. Simple, calm, intentional.",
    category: "Lifestyle",
    color: "#a78bfa",
    icon: "🕊️",
    tags: ["iOS", "Prayer", "Journaling"],
  },
];

const categories = ["All", ...Array.from(new Set(apps.map((a) => a.category)))];

// SETUP: Replace with your deployed Google Apps Script URL
const WEBHOOK_URL = process.env.NEXT_PUBLIC_CREATOR_WEBHOOK_URL || "";

export default function AppsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", tiktok: "", followers: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filtered =
    activeCategory === "All"
      ? apps
      : apps.filter((a) => a.category === activeCategory);

  const toggleApp = (id: string) => {
    setSelectedApps((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedApps.length === 0) return;
    setSubmitting(true);
    try {
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            tiktok: formData.tiktok.replace("@", ""),
            followers: formData.followers,
            apps: selectedApps.map((id) => apps.find((a) => a.id === id)?.name || id),
            message: formData.message,
          }),
        });
      }
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative bg-[#0a0a0c] text-white min-h-screen">
      {/* Back to portfolio */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="px-4 py-2 rounded-full text-sm font-medium border border-white/[0.06] text-[var(--muted-foreground)] hover:border-white/20 hover:text-white transition-all backdrop-blur-md bg-white/[0.02]"
        >
          &larr; Portfolio
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-32">
        {/* Header */}
        <div className="mb-6">
          <p className="text-[var(--accent)] text-sm font-mono tracking-[0.2em] uppercase mb-4">
            App Gallery
          </p>
          <BlurText
            text="My Apps"
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
            animateBy="words"
            delay={150}
          />
        </div>

        <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mb-4">
          iOS apps I&apos;m building — from fitness to faith. All launching soon.
        </p>

        {/* Affiliate CTA */}
        <motion.button
          onClick={() => {
            setFormOpen(true);
            document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mb-16 px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Become an Affiliate — Earn up to 30% recurring
        </motion.button>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-white"
                  : "border-white/[0.06] text-[var(--muted-foreground)] hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Apps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-32">
          <AnimatePresence mode="popLayout">
            {filtered.map((app, index) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredId(app.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden cursor-pointer hover:border-white/[0.12] transition-all duration-500"
              >
                {/* Color accent bar */}
                <div
                  className="h-[2px] w-full transition-all duration-500"
                  style={{
                    background:
                      hoveredId === app.id
                        ? `linear-gradient(90deg, transparent, ${app.color}, transparent)`
                        : "transparent",
                  }}
                />

                <div className="p-6">
                  {/* Icon + Category */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{app.icon}</span>
                        <div>
                          <p
                            className="text-xs font-mono tracking-wider"
                            style={{ color: app.color }}
                          >
                            {app.category}
                          </p>
                          <h3 className="text-xl font-bold text-white">
                            {app.name}
                          </h3>
                        </div>
                      </div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: app.color }}
                      >
                        {app.tagline}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Smartphone size={18} className="text-[var(--muted-foreground)]" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-5">
                    {app.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[11px] font-mono border border-white/[0.06] text-[var(--muted-foreground)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Affiliate button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleApp(app.id);
                      setFormOpen(true);
                      setTimeout(() => {
                        document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                      selectedApps.includes(app.id)
                        ? "border-transparent text-white"
                        : "border-white/[0.08] text-[var(--muted-foreground)] hover:border-white/20 hover:text-white"
                    }`}
                    style={
                      selectedApps.includes(app.id)
                        ? { background: `${app.color}20`, borderColor: `${app.color}40`, color: app.color }
                        : {}
                    }
                  >
                    {selectedApps.includes(app.id) ? "✓ Selected" : "Join Affiliate Program"}
                  </button>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `0 0 60px ${app.color}10, 0 0 120px ${app.color}05`,
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Signup Form */}
        <section id="signup" className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Join the Creator Program
              </h2>
              <p className="text-[var(--muted-foreground)] text-sm">
                Earn up to 30% recurring commission. We&apos;ll set you up with your personal referral link once the app launches.
              </p>
            </div>

            {/* Tier breakdown */}
            <div className="mb-6 space-y-2">
              {[
                { tier: "Gold", rate: "30%", req: "4+ videos + 2 stories/mo + link in bio", color: "#f59e0b" },
                { tier: "Silver", rate: "20%", req: "2+ videos + 1 story/mo + link in bio", color: "#94a3b8" },
                { tier: "Bronze", rate: "10%", req: "1 video/mo + link in bio", color: "#b45309" },
              ].map((t) => (
                <div
                  key={t.tier}
                  className="flex items-center justify-between py-3 px-4 rounded-xl border border-white/[0.04] bg-white/[0.01]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold" style={{ color: t.color }}>{t.tier}</span>
                    <span className="text-xs text-[var(--muted-foreground)]">{t.req}</span>
                  </div>
                  <span className="text-sm font-mono text-[var(--accent)]">{t.rate}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--muted-foreground)] mb-8">
              More content = more sign-ups through your link = more you earn. Commission is recurring — you get paid every month the user stays subscribed.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <p className="text-2xl mb-2">🎉</p>
                <p className="text-white font-semibold text-lg mb-1">Application received!</p>
                <p className="text-[var(--muted-foreground)] text-sm">
                  We&apos;ll reach out to you shortly with next steps.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Selected apps */}
                {selectedApps.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedApps.map((id) => {
                      const app = apps.find((a) => a.id === id)!;
                      return (
                        <span
                          key={id}
                          className="px-3 py-1 rounded-full text-xs font-medium border"
                          style={{ borderColor: `${app.color}40`, color: app.color, background: `${app.color}10` }}
                        >
                          {app.icon} {app.name}
                          <button
                            type="button"
                            onClick={() => toggleApp(id)}
                            className="ml-2 opacity-60 hover:opacity-100"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* App selection dropdown */}
                <div>
                  <label className="text-xs font-mono text-[var(--muted-foreground)] mb-1.5 block">
                    Apps you want to promote
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {apps.map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => toggleApp(app.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                          selectedApps.includes(app.id)
                            ? "text-white"
                            : "border-white/[0.06] text-[var(--muted-foreground)] hover:border-white/20"
                        }`}
                        style={
                          selectedApps.includes(app.id)
                            ? { borderColor: `${app.color}40`, color: app.color, background: `${app.color}10` }
                            : {}
                        }
                      >
                        {app.icon} {app.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-[var(--muted-foreground)] mb-1.5 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[var(--muted-foreground)] mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                      placeholder="jane@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-[var(--muted-foreground)] mb-1.5 block">
                      TikTok Handle
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.tiktok}
                      onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[var(--muted-foreground)] mb-1.5 block">
                      Follower Count
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.followers}
                      onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                      placeholder="e.g. 15,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[var(--muted-foreground)] mb-1.5 block">
                    Anything else? (optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
                    placeholder="Your follower count, content style, etc."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting || selectedApps.length === 0}
                  className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={!submitting ? { scale: 1.01 } : {}}
                  whileTap={!submitting ? { scale: 0.98 } : {}}
                >
                  {submitting ? "Submitting..." : selectedApps.length === 0 ? "Select at least one app" : "Apply to Creator Program"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </section>
      </div>
    </main>
  );
}
