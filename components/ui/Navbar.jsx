"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, Calendar, Image as ImageIcon, Mail } from "lucide-react";
import { weddingData } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "#invitation", icon: <Home size={18} /> },
  { label: "Couple", href: "#couple", icon: <Users size={18} /> },
  { label: "Event", href: "#event", icon: <Calendar size={18} /> },
  { label: "Gallery", href: "#gallery", icon: <ImageIcon size={18} /> },
  { label: "RSVP", href: "#rsvp", icon: <Mail size={18} /> },
];

/**
 * Navbar Component
 * Floating navigation with glassmorphism and smooth scroll integration.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 ${scrolled
        ? "py-4 bg-background/80 backdrop-blur-md border-b border-primary/10 shadow-sm"
        : "py-6 bg-transparent"
        }`}
    >
      <div className="container max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif text-xl md:text-2xl text-foreground font-light tracking-widest hover:text-primary transition-colors duration-300"
        >
          {weddingData.groom.firstName} <span className="text-primary/60 font-sans font-light">&</span> {weddingData.bride.firstName}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="group relative font-sans text-[10px] tracking-[0.3em] uppercase text-foreground/60 hover:text-primary transition-colors duration-300"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Mobile Navigation (Floating Bottom Bar approach for better UX) */}
        <nav className="md:hidden fixed bottom-6 left-6 right-6">
          <div className="bg-foreground/90 backdrop-blur-lg border border-primary/20 rounded-full px-6 py-4 shadow-2xl flex items-center justify-between">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-background/60 hover:text-primary transition-colors p-2"
                aria-label={link.label}
              >
                {link.icon}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
