"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { weddingData } from "@/lib/data";

/**
 * Couple Section
 * Introduces the groom and bride with elegant cards and reveal animations.
 */
export default function Couple() {
  const { groom, bride } = weddingData;

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="couple" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="text-center mb-20"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-4 block">
            The Happy Couple
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-foreground font-light mb-6">
            Mempelai Pengantin
          </h2>
          <div className="w-20 h-px bg-primary/30 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <CoupleProfile person={groom} role="Putra" side="left" />
          <CoupleProfile person={bride} role="Putri" side="right" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="mt-24 text-center max-w-2xl mx-auto"
        >
          <p className="font-serif italic text-xl text-muted-foreground/80 mb-4">
            &quot;Maka nikahilah wanita-wanita yang kamu senangi...&quot;
          </p>
          <p className="font-sans text-xs tracking-widest text-primary uppercase">
            QS. An-Nisa: 3
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * CoupleProfile Component
 * Renders individual profile card for groom/bride.
 */
function CoupleProfile({ person, role, side }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Card className="glass-card border-none shadow-none group overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-3/4 overflow-hidden">
            <Image
              src={person.photo}
              alt={person.fullName}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-60" />
          </div>

          <div className="p-8 text-center">
            <h3 className="font-serif text-3xl md:text-4xl mb-2 font-light">
              {person.fullName}
            </h3>

            <a
              href={`https://instagram.com/${person.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6 font-sans text-xs tracking-widest uppercase"
            >
              <Instagram size={14} />
              {person.instagram}
            </a>

            <div className="space-y-1">
              <p className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {role} dari
              </p>
              <p className="font-serif text-lg text-foreground/80">
                Bapak {person.father}
              </p>
              <p className="font-serif text-lg text-foreground/80">
                & Ibu {person.mother}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
