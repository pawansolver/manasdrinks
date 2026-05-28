// @ts-nocheck
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Zap,
  Send,
  ChevronRight,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const navColumns = [
  {
    heading: "Products",
    links: [
      { label: "NEVAS Water", href: "/products" },
      { label: "Hustle Energy", href: "/products" },
      { label: "Jimmy's Blend", href: "/products" },
      { label: "All Products", href: "/products" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Careers", href: "/career" },
      { label: "Collaborate", href: "/collaborate" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Association", href: "/association" },
    ],
  },
];

const socials = [
  { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
  { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
  { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
  { icon: <Youtube size={20} />, href: "#", label: "YouTube" },
];

const contactInfo = [
  { icon: <Phone size={16} />, text: "+91-000-000-0000" },
  { icon: <Mail size={16} />, text: "contact@manasbeverage.com" },
  { icon: <MapPin size={16} />, text: "Corona, CA 92879, India" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3500);
    }
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden font-body">
      {/* ── Top glow line ── */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #00d8ff 30%, #6bff00 70%, transparent 100%)",
        }}
      />

      {/* ── Subtle radial bg glow ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, #00d8ff55 0%, transparent 70%)",
        }}
      />

      {/* ── Main grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* ── Brand column ── */}
          <motion.div
            className="lg:col-span-4 flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo & Name */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #00d8ff, #6bff00)",
                }}
              >
                <Zap size={22} className="text-black" />
              </div>
              <span className="text-2xl font-display font-extrabold tracking-widest uppercase">
                MANASH
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Engineered for peak performance. Our revolutionary blends deliver
              smooth, sustained energy — zero crash, full focus.
            </p>

            {/* Contact info */}
            <ul className="flex flex-col gap-3">
              {contactInfo.map((c, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="text-[#00d8ff]">{c.icon}</span>
                  {c.text}
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00d8ff] hover:border-[#00d8ff]/40 transition-all duration-200"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Nav columns ── */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-8">
            {navColumns.map((col, ci) => (
              <motion.div
                key={col.heading}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (ci + 1) }}
              >
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00d8ff] mb-5">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => navigate(link.href)}
                        className="group flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <ChevronRight
                          size={13}
                          className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#6bff00]"
                        />
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ── Newsletter ── */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00d8ff]">
              Stay in the Loop
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Get exclusive launches, deals and energy tips delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00d8ff]/60 focus:ring-1 focus:ring-[#00d8ff]/30 transition-all"
                />
              </div>

              <motion.button
                type="submit"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold text-black transition-all duration-300"
                style={{
                  background: subscribed
                    ? "linear-gradient(135deg, #6bff00, #00d8ff)"
                    : "linear-gradient(135deg, #00d8ff, #6bff00)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {subscribed ? (
                  "✓ Subscribed!"
                ) : (
                  <>
                    Subscribe <Send size={15} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Mini badge */}
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div
          className="my-10 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-400 font-semibold">MANASH BEVERAGE</span>. All rights
            reserved.
          </p>

          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <button
                key={t}
                className="hover:text-gray-300 transition-colors duration-200"
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600">Crafted with</span>
            <span className="text-[#00d8ff]">⚡</span>
            <span className="text-gray-600">by</span>
            <span className="text-gray-400 font-semibold">NighwanTech</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
