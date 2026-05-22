"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  { text: "THE", red: false },
  { text: "INFRASTRUCTURE", red: false },
  { text: "OF", red: false },
  { text: "FREEDOM", red: true },
  { text: "IS", red: false },
  { text: "NOT", red: true },
  { text: "OPTIONAL.", red: false },
];

export default function ScrollReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${WORDS.length * 200}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { autoAlpha: 0, y: 40, filter: "blur(8px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
            color: WORDS[i].red ? "var(--color-bat-red, #C0131A)" : "var(--color-bat-white, #F0F0EE)",
          },
          i * 0.3
        );
      });

      // Sub-line fades in after all words
      const sub = sectionRef.current?.querySelector(".scroll-sub");
      if (sub) {
        tl.fromTo(sub, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5 }, WORDS.length * 0.3);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bat-black border-t border-bat-concrete" aria-label="The principle">
      <div ref={pinRef} className="min-h-screen flex flex-col justify-center py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto w-full">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-16">
            The principle
          </p>

          <h2 className="font-display leading-none tracking-tight flex flex-wrap gap-x-[0.25em] gap-y-2">
            {WORDS.map((word, i) => (
              <span
                key={i}
                ref={(el) => { wordRefs.current[i] = el; }}
                className="inline-block text-[min(12vw,7rem)] text-bat-white"
                style={{ opacity: 0 }}
              >
                {word.text}
              </span>
            ))}
          </h2>

          <p className="scroll-sub font-body text-sm text-bat-ash leading-relaxed max-w-sm mt-16" style={{ opacity: 0 }}>
            Someone has to build it. Someone has to refuse to stop.
          </p>
        </div>
      </div>
    </section>
  );
}
