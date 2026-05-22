"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ManifestoContent() {
  const { t } = useLanguage();
  const m = t.manifesto;
  const hiddenRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  const revealHidden = () => {
    if (revealed) return;
    setRevealed(true);
    gsap.to(hiddenRef.current, { autoAlpha: 1, duration: 0.8, ease: "power2.out" });
  };

  useEffect(() => {
    gsap.set(hiddenRef.current, { autoAlpha: 0 });
  }, []);

  return (
    <main className="min-h-screen bg-bat-black pt-32 pb-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto">
        {/* Opening */}
        <div className="mb-32">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-10">
            {m.eyebrow}
          </p>
          <h1 className="font-display text-[min(14vw,8rem)] leading-none text-bat-white tracking-tight mb-10">
            {m.title1}
            <br />
            {m.title2}
          </h1>
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-lg">
            {m.intro}
          </p>
        </div>

        {/* Section 1 */}
        <Section number="01" title={m.section1Title}>
          {m.section1.map((item, i) => (
            <ManifestoItem key={i}>{item}</ManifestoItem>
          ))}
        </Section>

        {/* Section 2 */}
        <Section number="02" title={m.section2Title}>
          {m.section2.map((item, i) => (
            <p key={i} className="font-body text-base text-bat-ash leading-relaxed">{item}</p>
          ))}
        </Section>

        {/* Section 3 */}
        <Section number="03" title={m.section3Title}>
          {m.section3.map((item, i) => (
            <ManifestoItem key={i}>{item}</ManifestoItem>
          ))}
        </Section>

        {/* The hidden sentence */}
        <div
          className="mt-24 border-t-2 border-bat-red pt-12 cursor-pointer"
          onMouseEnter={revealHidden}
          onClick={revealHidden}
        >
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-8">
            {m.underTitle}
          </p>
          <div ref={hiddenRef}>
            <blockquote className="space-y-4">
              <p className="font-display text-3xl md:text-4xl leading-tight text-bat-white">
                {m.hidden1}
              </p>
              <p className="font-display text-3xl md:text-4xl leading-tight text-bat-ash">
                {m.hidden2}
              </p>
              <p className="font-display text-3xl md:text-4xl leading-tight text-bat-ash">
                {m.hidden3}
              </p>
              <p className="font-display text-3xl md:text-4xl leading-tight text-bat-red">
                {m.hidden4}
              </p>
              <p className="font-display text-3xl md:text-4xl leading-tight text-bat-white">
                {m.hidden5}
              </p>
            </blockquote>

            <div className="mt-16 flex flex-col gap-4">
              <p className="font-body text-sm text-bat-ash leading-relaxed">
                {m.endLine1}
              </p>
              <p className="font-body text-sm text-bat-ash leading-relaxed">
                {m.endLine2}
              </p>
              <p className="font-display text-2xl tracking-widest text-bat-white">
                {m.ending}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-24">
      <div className="flex items-baseline gap-4 mb-10 border-b border-bat-concrete pb-6">
        <span className="font-mono text-2xs tracking-[0.2em] text-bat-red">{number}</span>
        <h2 className="font-display text-3xl md:text-4xl tracking-widest text-bat-white">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-6 ps-8">{children}</div>
    </div>
  );
}

function ManifestoItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-bat-red mt-1 flex-shrink-0 font-mono text-xs">—</span>
      <p className="font-body text-base text-bat-ash leading-relaxed">{children}</p>
    </div>
  );
}
