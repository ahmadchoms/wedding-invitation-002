"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MailOpen } from "lucide-react";
import { weddingData } from "@/lib/data";

/**
 * Hero Section
 * Displays the invitation cover with a luxury opening animation.
 * @param {Object} props - Component props
 * @param {Function} props.onOpen - Callback triggered when the invitation is opened
 */
export default function Hero({ onOpen }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      gsap.from(".reveal-item", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      });

      // Background fade in
      gsap.from(".hero-bg", {
        opacity: 0,
        duration: 2,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    const tl = gsap.timeline({
      onComplete: onOpen,
    });

    tl.to(contentRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
    })
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 1,
        ease: "power2.inOut",
      }, "-=0.4");
  };

  const { groom, bride } = weddingData;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden bg-foreground"
    >
      <div className="hero-bg absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)]" />

      <div className="absolute inset-8 border border-primary/20 pointer-events-none" />

      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="reveal-item mb-8">
          <p className="font-sans text-sm tracking-[0.3em] text-primary uppercase">
            14 &bull; 06 &bull; 2025
          </p>
        </div>

        <div className="reveal-item mb-6">
          <h1 className="flex flex-col md:flex-row items-center gap-4 text-luxury-gold">
            <span className="font-serif text-6xl md:text-8xl font-light">
              {groom.firstName}
            </span>
            <span className="font-serif italic text-4xl md:text-5xl text-primary/60 my-2 md:my-0">
              &
            </span>
            <span className="font-serif text-6xl md:text-8xl font-light">
              {bride.firstName}
            </span>
          </h1>
        </div>

        <div className="reveal-item mb-12 max-w-md">
          <p className="font-serif italic text-xl text-primary/80 mb-2">
            The Wedding of
          </p>
          <p className="font-sans text-xs tracking-widest text-primary/40 uppercase">
            Akan melangsungkan pernikahan dengan mengharap ridho Allah SWT
          </p>
        </div>

        <div className="reveal-item">
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="group relative flex items-center gap-3 px-10 py-4 luxury-border text-primary font-sans text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:bg-primary/10 disabled:opacity-50"
          >
            {isOpening ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Membuka...
              </span>
            ) : (
              <>
                <MailOpen size={16} strokeWidth={1} />
                Buka Undangan
              </>
            )}
          </button>
        </div>
      </div>


      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 reveal-item opacity-40">
        <div className="w-px h-12 bg-linear-to-b from-primary/60 to-transparent" />
      </div>
    </div>
  );
}
