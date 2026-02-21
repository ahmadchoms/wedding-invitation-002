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
 * Full-screen image preview with smooth transitions.
 */
function Lightbox({ image, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-200 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-background/60 hover:text-background transition-colors p-2"
      >
        <X size={32} strokeWidth={1} />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[80vh]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
        <p className="mt-8 font-serif italic text-background/60 text-lg">
          {image.alt}
        </p>
      </motion.div>
    </motion.div>
  );
}
