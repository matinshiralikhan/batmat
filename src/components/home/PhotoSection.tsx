"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhotoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { autoAlpha: 0, scale: 1.05, x: -40 },
        {
          autoAlpha: 1, scale: 1, x: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        textRef.current,
        { autoAlpha: 0, x: 40 },
        {
          autoAlpha: 1, x: 0, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
          delay: 0.2,
        }
      );

      // Parallax scroll on image
      gsap.to(imgRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Overlay reveal wipe
      gsap.fromTo(
        overlayRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 0.9,
          ease: "power4.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          transformOrigin: "left center",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bat-graphite border-t border-bat-concrete py-32 px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Photo frame */}
          <div ref={imgRef} className="relative" style={{ opacity: 0 }}>
            {/* Wipe overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-bat-graphite z-10"
              style={{ transformOrigin: "left center" }}
            />

            {/* Corner accents */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-bat-red z-20" />
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-bat-red z-20" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-bat-red z-20" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-bat-red z-20" />

            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden border border-bat-concrete">
              <Image
                src="/images/profile.jpg"
                alt="Daxson — BATMAT"
                fill
                className="object-cover object-top grayscale contrast-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={() => {}}
              />
              {/* Fallback CSS portrait (hidden when image loads) */}
              <div className="absolute inset-0 bg-bat-dark flex items-center justify-center">
                <PortraitPlaceholder />
              </div>
              {/* Red tint overlay */}
              <div className="absolute inset-0 bg-bat-red/5 mix-blend-color" />
              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-bat-graphite/80 to-transparent" />
            </div>

            {/* Photo caption */}
            <div className="absolute bottom-4 left-4 z-20">
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-bat-ash">
                Daxson · Tehran · 2025
              </p>
            </div>
          </div>

          {/* Text content */}
          <div ref={textRef} className="flex flex-col gap-8" style={{ opacity: 0 }}>
            <div>
              <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">
                The person
              </p>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-wider text-bat-white leading-none mb-8">
                BUILT IN
                <br />
                <span className="text-bat-ash">THE DARK.</span>
              </h2>
            </div>

            <p className="font-body text-base text-bat-white leading-relaxed">
              Technical manager. Go developer. Security infrastructure engineer.
              Builder of systems that run where most people don&apos;t look.
            </p>

            <p className="font-body text-sm text-bat-ash leading-relaxed">
              Seven years of systems. Three anti-censorship platforms. One hundred thousand users
              who move through a restricted world a little more freely because of code I wrote
              in the middle of the night.
            </p>

            <div className="border-l-2 border-bat-red pl-6">
              <p className="font-body text-sm text-bat-ghost leading-relaxed italic">
                &ldquo;The Batman mythology is not decoration. It is a psychological operating system.
                Obsession as method. Duality as structure.&rdquo;
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-bat-concrete">
              {[
                { v: "7+", l: "Years" },
                { v: "100k+", l: "Protected" },
                { v: "0", l: "Breaches" },
              ].map(({ v, l }) => (
                <div key={l} className="flex flex-col gap-1">
                  <span className="font-display text-3xl text-bat-red">{v}</span>
                  <span className="font-mono text-2xs tracking-[0.15em] uppercase text-bat-ash">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortraitPlaceholder() {
  return (
    <svg viewBox="0 0 300 400" className="w-full h-full opacity-20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body silhouette */}
      <ellipse cx="150" cy="120" rx="55" ry="60" fill="#F0F0EE" />
      <path d="M60 400 C60 280 100 240 150 230 C200 240 240 280 240 400Z" fill="#F0F0EE" />
      {/* Cape hint */}
      <path d="M80 280 C50 320 30 370 20 400 L280 400 C270 370 250 320 220 280 C210 320 190 340 150 340 C110 340 90 320 80 280Z" fill="#C0131A" opacity="0.4" />
      {/* Bat symbol on chest */}
      <path d="M150 270 L140 264 L128 266 L122 262 L124 270 L132 268 L138 276 L142 282 L146 278 L150 280 L154 278 L158 282 L162 276 L168 268 L176 270 L178 262 L172 266 L160 264 Z" fill="#C0131A" />
    </svg>
  );
}
