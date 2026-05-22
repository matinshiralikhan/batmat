"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "THE",
  "INFRASTRUCTURE",
  "OF",
  "FREEDOM",
  "IS",
  "NOT",
  "OPTIONAL.",
];

export default function ScrollReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
            delay: i * 0.12,
          }
        );
      });

      // Red highlight on "FREEDOM" (index 3) and "NOT" (index 5)
      [3, 5].forEach((idx) => {
        const el = wordRefs.current[idx];
        if (!el) return;
        gsap.to(el, {
          color: "var(--color-bat-red, #C0131A)",
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          delay: idx * 0.12 + 0.4,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bat-black py-32 px-8 md:px-16 lg:px-24 border-t border-bat-concrete"
    >
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-16">
          The principle
        </p>

        <h2 className="font-display leading-none tracking-tight">
          {WORDS.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              className="inline-block mr-[0.25em] text-[min(14vw,7rem)] text-bat-white"
              style={{ opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </h2>

        <p className="font-body text-sm text-bat-ash leading-relaxed max-w-sm mt-16">
          Someone has to build it. Someone has to refuse to stop.
        </p>
      </div>
    </section>
  );
}
