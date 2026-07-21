"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { weddingData } from "@/lib/data";

/**
 * Gallery Section
 * Showcases wedding photos in a premium grid with a lightbox for detailed viewing.
 */
export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="font-sans text-xs tracking-[0.3em] text-primary uppercase mb-4 block">
            Capturing Moments
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            Galeri Foto
          </h2>
          <div className="w-12 h-px bg-primary/30 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {weddingData.gallery.map((image, index) => (
            <motion.div
              key={index}
              layoutId={`image-${index}`}
              onClick={() => setSelectedImage(index)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-4/5 overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-background/40 flex items-center justify-center backdrop-blur-sm">
                  <Plus className="text-background" size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox
            image={weddingData.gallery[selectedImage]}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * Lightbox Component
 * Popup modal preview (non-fullscreen).
 */
function Lightbox({ image, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-1/4 bg-background rounded-2xl p-4 md:p-6 shadow-2xl border border-border/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-muted text-foreground transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Container Gambar Modal */}
        <div className="relative w-full aspect-4/5 rounded-lg overflow-hidden bg-muted">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 600px"
            priority
          />
        </div>

        {/* Keterangan Gambar */}
        {image.alt && (
          <p className="mt-4 font-serif italic text-foreground/70 text-center text-sm md:text-base">
            {image.alt}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}