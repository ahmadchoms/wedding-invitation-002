"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/data";

/**
 * Calculates time remaining until the wedding.
 * @param {string} targetDate - ISO date string
 * @returns {Object} days, hours, minutes, seconds
 */
function getTimeLeft(targetDate) {
  const now = Date.now();
  const target = new Date(targetDate).getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/**
 * Countdown Section
 * Displays a live countdown to the wedding ceremony.
 */
export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(weddingData.ceremonyDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(weddingData.ceremonyDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isPast = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <section id="countdown" className="py-24 md:py-32 bg-secondary/30">
      <div className="container max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-4 block">
            Save the Date
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            Menuju Hari Bahagia
          </h2>
          <div className="w-12 h-px bg-primary/30 mx-auto" />
        </motion.div>

        {isPast ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif italic text-2xl text-primary"
          >
            Hari yang dinantikan telah tiba ✦
          </motion.p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <TimeUnit value={timeLeft.days} label="Hari" />
            <TimeUnit value={timeLeft.hours} label="Jam" />
            <TimeUnit value={timeLeft.minutes} label="Menit" />
            <TimeUnit value={timeLeft.seconds} label="Detik" />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16"
        >
          <p className="font-serif italic text-muted-foreground/60 text-lg">
            {weddingData.events.akad.date} &bull; {weddingData.events.akad.venue}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * TimeUnit Component
 * Individual ticker for days/hours/minutes/seconds.
 */
function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-20 h-24 md:w-24 md:h-28 bg-foreground flex items-center justify-center overflow-hidden luxury-border">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-serif text-4xl md:text-5xl text-background font-light"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-sans text-[10px] tracking-[0.3em] text-primary uppercase opacity-70">
        {label}
      </span>
    </div>
  );
}
