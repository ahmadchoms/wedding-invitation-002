"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Building,
  Navigation,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { weddingData } from "@/lib/data";

/**
 * EventDetails Section
 * Displays Akad and Resepsi event information with interactive maps and clear schedules.
 */
export default function EventDetails() {
  const { akad, resepsi } = weddingData.events;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="event" className="relative py-24 md:py-32 bg-foreground text-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-4 block">
            The Celebration
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light mb-6">
            Rangkaian Acara
          </h2>
          <div className="w-20 h-px bg-primary/30 mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <EventCard event={akad} icon={<Building className="text-primary" size={32} />} variants={itemVariants} />
          <EventCard event={resepsi} icon={<Navigation className="text-primary" size={32} />} variants={itemVariants} />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * EventCard Component
 * Displays specific event details (Akad/Resepsi) in a luxury card.
 */
function EventCard({ event, icon, variants }) {
  return (
    <motion.div variants={variants}>
      <Card className="bg-background/5 border-primary/20 backdrop-blur-sm shadow-none h-full flex flex-col group hover:border-primary/40 transition-colors duration-500">
        <CardHeader className="p-8 pb-4">
          <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
            {icon}
          </div>
          <CardTitle className="font-serif text-3xl font-light tracking-wide text-primary">
            {event.label}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8 pt-0 flex-1 flex flex-col">
          <div className="w-12 h-px bg-primary/20 mb-8" />

          <div className="space-y-6 flex-1 mb-10">
            <DetailItem icon={<Calendar size={18} />} text={event.date} />
            <DetailItem icon={<Clock size={18} />} text={event.time} />
            <DetailItem icon={<Building size={18} />} text={event.venue} isStrong />
            <DetailItem icon={<MapPin size={18} />} text={event.address} />
          </div>

          <Button
            asChild
            variant="outline"
            className="w-full border-primary/30 text-primary hover:bg-primary hover:text-background transition-all duration-500 font-sans text-xs tracking-[0.2em] uppercase py-6"
          >
            <a href={event.mapsUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} className="mr-2" />
              {event.mapsLabel}
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * DetailItem Component
 * Helper for rendering icon + text row.
 */
function DetailItem({ icon, text, isStrong = false }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-primary/60 shrink-0 mt-1">{icon}</span>
      <p className={`font-sans text-sm leading-relaxed ${isStrong ? "text-primary font-medium" : "text-background/60"}`}>
        {text}
      </p>
    </div>
  );
}
