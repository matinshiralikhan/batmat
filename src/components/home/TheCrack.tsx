"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TheCrack() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(quoteRef.current, {
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 70%",
        },
        autoAlpha: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(contextRef.current, {
        scrollTrigger: {
          trigger: contextRef.current,
          start: "top 80%",
        },
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bat-black py-40 px-8 md:px-16 lg:px-24"
      aria-label="The crack"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section marker */}
        <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-ash mb-16">
          03 — Signal
        </p>

        {/* The quote — the emotional fracture */}
        <blockquote ref={quoteRef} className="mb-20">
          <p className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-bat-white">
            I build systems.
          </p>
          <p className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-bat-ash mt-2">
            Some of them are for companies.
          </p>
          <p className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-bat-red mt-2">
            Some of them are for people
            <br />
            who need to get out.
          </p>
        </blockquote>

        {/* Context — the quieter layer */}
        <div ref={contextRef} className="border-l-2 border-bat-red pl-8 max-w-lg">
          <p className="font-body text-base text-bat-ash leading-relaxed mb-4">
            Technical manager. R&D team. Go developer. Builder of internal
            tooling and infrastructure for freedom.
          </p>
          <p className="font-body text-base text-bat-ash leading-relaxed">
            Professionally: security and systems. Personally: a deep,
            specific understanding of how control works — and a radical
            orientation toward its opposite.
          </p>
        </div>
      </div>
    </section>
  );
}
