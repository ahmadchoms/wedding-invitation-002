"use client";

import { useEffect, useRef, ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.15,
  once = true,
}) {
  const ref = useRef(null);

  const translate = {
    up: "translateY(32px)",
    down: "translateY(-32px)",
    left: "translateX(32px)",
    right: "translateX(-32px)",
    none: "none",
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial hidden state
    el.style.opacity = "0";
    el.style.transform = translate[direction] ?? "translateY(32px)";
    el.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "none";
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.style.opacity = "0";
            el.style.transform = translate[direction] ?? "translateY(32px)";
          }
        });
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction, threshold, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
