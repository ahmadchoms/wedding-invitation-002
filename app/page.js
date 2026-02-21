"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/ui/Navbar";
import Couple from "@/components/sections/Couple";
import EventDetails from "@/components/sections/EventDetails";
import Countdown from "@/components/sections/Countdown";
import Gallery from "@/components/sections/Gallery";
import RSVP from "@/components/sections/RSVP";
import Gift from "@/components/sections/Gift";
import Closing from "@/components/sections/Closing";

/**
 * HomePage Component
 * Orchestrates the transition between the invitation cover (Hero) and the main content.
 */
export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="cover"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-200"
          >
            <Hero onOpen={() => setIsOpen(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            id="invitation"
          >
            <Navbar />
            <main>
              {/* Anchor for Home link in Navbar */}
              <div id="home" className="h-0 w-0" />
              
              {/* Invitation Sections */}
              <Couple />
              <EventDetails />
              <Countdown />
              <Gallery />
              <RSVP />
              <Gift />
              <Closing />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
