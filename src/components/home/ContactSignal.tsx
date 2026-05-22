"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config";
import { useLanguage } from "@/components/providers/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSignal() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLParagraphElement>(null);
  const { t } = useLanguage();
  const cs = t.contactSignal;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: { trigger: contentRef.current, start: "top 75%" },
        autoAlpha: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });
      gsap.set(hiddenRef.current, { autoAlpha: 0 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const revealHidden = () => {
    gsap.to(hiddenRef.current, { autoAlpha: 1, duration: 0.8, ease: "power2.out" });
  };

  return (
    <section
      ref={sectionRef}
      className="bg-bat-black min-h-screen flex items-center py-40 px-8 md:px-16 lg:px-24"
      aria-label="Contact"
    >
      <div className="max-w-4xl mx-auto w-full" ref={contentRef}>
        <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-16">
          {cs.eyebrow}
        </p>

        <h2 className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-none text-bat-white tracking-tight mb-12">
          {cs.title}
        </h2>

        <p className="font-body text-base text-bat-ash leading-relaxed max-w-md mb-16">
          {cs.body}
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-8 mb-12">
          <Link
            href="/contact"
            className="font-mono text-xs tracking-[0.2em] uppercase text-bat-white border border-bat-white px-8 py-4 hover:border-bat-red hover:text-bat-red transition-colors duration-200"
          >
            {cs.cta}
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-mono text-xs tracking-[0.2em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150 self-center"
          >
            {siteConfig.email}
          </a>
        </div>

        {/* Socials */}
        <div className="flex flex-wrap items-center gap-8 mb-16">
          <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer"
            className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150">
            GitHub →
          </a>
          <a href={siteConfig.twitter.url} target="_blank" rel="noopener noreferrer"
            className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150">
            X →
          </a>
          <a href={siteConfig.telegram.url} target="_blank" rel="noopener noreferrer"
            className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150">
            Telegram →
          </a>
        </div>

        <div className="border-t border-bat-concrete pt-12 mb-16">
          <p className="font-body text-sm text-bat-ash leading-relaxed max-w-sm mb-6">
            {cs.supportBody}
          </p>
          <a
            href={`${siteConfig.github.url}?tab=sponsoring`}
            className="font-mono text-xs tracking-[0.2em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150"
            target="_blank"
            rel="noopener noreferrer"
          >
            {cs.supportCta}
          </a>
        </div>

        <div className="border-t border-bat-concrete pt-12" onMouseEnter={revealHidden}>
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-concrete mb-4">
            {cs.hoverHint}
          </p>
          <p
            ref={hiddenRef}
            className="font-body text-sm text-bat-ash leading-relaxed max-w-lg italic"
          >
            {cs.hidden}
          </p>
        </div>
      </div>
    </section>
  );
}
