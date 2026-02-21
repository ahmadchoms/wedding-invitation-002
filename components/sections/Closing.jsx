"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { weddingData } from "@/lib/data";

/**
 * Closing Section
 * Final farewell message and elegant signature.
 */
export default function Closing() {
  const { groom, bride, closing } = weddingData;

  return (
    <section id="closing" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <div className="flex justify-center mb-12">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="text-primary/40" size={32} strokeWidth={1} />
            </motion.div>
          </div>

          <blockquote className="mb-8">
            <p className="font-serif italic text-xl md:text-2xl text-foreground font-light leading-relaxed">
              &ldquo;{closing.quote}&rdquo;
            </p>
            <cite className="font-sans text-xs tracking-[0.3em] uppercase text-primary mt-6 block not-italic">
              {closing.quoteSource}
            </cite>
          </blockquote>

          <div className="w-16 h-px bg-primary/20 mx-auto my-12" />

          <p className="font-sans text-muted-foreground text-base leading-relaxed mb-16 max-w-xl mx-auto">
            {closing.message}
          </p>

          <div className="signature space-y-4">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-primary/60">
              Dengan Cinta,
            </p>
            <h2 className="font-serif text-5xl md:text-7xl font-light text-foreground">
              {groom.firstName} <span className="text-primary font-sans font-light">&</span> {bride.firstName}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 pt-10 border-t border-primary/10"
          >
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary/40">
              14 Juni 2025 &bull; Jakarta &bull; Indonesia
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
