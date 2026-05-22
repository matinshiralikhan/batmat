"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { BatSVG } from "@/components/ui/BatmarkLogo";
import { useLanguage } from "@/components/providers/LanguageProvider";

const FINAL_TEXT = "BATMAT";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&";

function useTextScramble(trigger: boolean) {
  const [display, setDisplay] = useState(
    FINAL_TEXT.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
  );

  useEffect(() => {
    if (!trigger) return;
    let iter = 0;
    const total = FINAL_TEXT.length * 5;

    const id = setInterval(() => {
      setDisplay(
        FINAL_TEXT.split("").map((char, i) => {
          if (i < Math.floor(iter / 5)) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      iter++;
      if (iter > total) {
        clearInterval(id);
        setDisplay(FINAL_TEXT);
      }
    }, 35);

    return () => clearInterval(id);
  }, [trigger]);

  return display;
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const batRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);

  const scrambled = useTextScramble(scrambleTrigger);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [batRef.current, titleRef.current, lineRef.current, taglineRef.current, scrollRef.current],
        { autoAlpha: 0, y: 30 }
      );

      const tl = gsap.timeline();

      tl.to({}, { duration: 0.3 });

      tl.to(batRef.current, {
        autoAlpha: 1, y: 0, duration: 1.0, ease: "power3.out",
        onComplete: () => setScrambleTrigger(true),
      });

      tl.to(titleRef.current, {
        autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out",
      }, "-=0.2");

      tl.to(lineRef.current, {
        autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out",
      }, "-=0.1");

      tl.to(taglineRef.current, {
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out",
      }, "+=0.1");

      tl.to(scrollRef.current, {
        autoAlpha: 1, y: 0, duration: 0.6,
      }, "+=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-bat-black overflow-hidden"
      aria-label="Hero"
    >
      {/* Moon background glow — very subtle */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <div
          className="w-[min(90vh,90vw)] aspect-square rounded-full"
          style={{
            background:
              "radial-gradient(circle at 44% 42%, rgba(240,240,238,0.055) 0%, rgba(240,240,238,0.02) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 select-none">
        {/* Bat mark */}
        <div ref={batRef} className="mb-10">
          <BatSVG
            width={100}
            className="text-bat-red drop-shadow-[0_0_32px_rgba(192,19,26,0.4)]"
          />
        </div>

        {/* Scrambling title */}
        <div ref={titleRef}>
          <h1
            className="font-display text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[9rem] xl:text-[10rem] leading-none tracking-[0.06em] text-bat-white"
            aria-label="BATMAT"
          >
            {scrambled}
          </h1>
        </div>

        {/* Red separator */}
        <div ref={lineRef} className="w-20 h-px bg-bat-red my-8" />

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-mono text-xs tracking-[0.22em] text-bat-ghost uppercase leading-loose"
        >
          {t.hero.tagline1}
          <br />
          {t.hero.tagline2}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-bat-concrete">
          {t.hero.scroll}
        </span>
        <svg
          width="1"
          height="48"
          viewBox="0 0 1 48"
          className="overflow-visible"
        >
          <line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="48"
            stroke="#C0131A"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
        </svg>
      </div>
    </section>
  );
}
