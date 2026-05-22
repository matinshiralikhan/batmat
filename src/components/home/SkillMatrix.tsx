"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    name: "Systems",
    icon: "⬡",
    skills: [
      { name: "Go",          level: 96, note: "primary language" },
      { name: "Linux / Bash",level: 88, note: "daily driver" },
      { name: "C / C++",     level: 62, note: "kernel work" },
      { name: "TypeScript",  level: 80, note: "this site" },
    ],
  },
  {
    name: "Security",
    icon: "◈",
    skills: [
      { name: "WireGuard",        level: 92, note: "VPN infra" },
      { name: "Zero-Trust Arch",  level: 90, note: "system design" },
      { name: "mTLS / PKI",       level: 85, note: "service mesh" },
      { name: "Reverse Proxying", level: 88, note: "bypass systems" },
    ],
  },
  {
    name: "Infrastructure",
    icon: "◫",
    skills: [
      { name: "Kubernetes", level: 84, note: "prod clusters" },
      { name: "Docker",     level: 92, note: "everything" },
      { name: "Terraform",  level: 76, note: "IaC" },
      { name: "PostgreSQL", level: 82, note: "primary db" },
    ],
  },
  {
    name: "Observability",
    icon: "◎",
    skills: [
      { name: "Prometheus",       level: 86, note: "metrics" },
      { name: "Grafana",          level: 84, note: "dashboards" },
      { name: "OpenTelemetry",    level: 74, note: "tracing" },
      { name: "Elasticsearch",    level: 70, note: "log search" },
    ],
  },
];

function SkillBar({ name, level, note, trigger }: { name: string; level: number; note: string; trigger: boolean }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!trigger || animated) return;
    setAnimated(true);
    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      { width: `${level}%`, duration: 1.2, ease: "power3.out" }
    );
  }, [trigger, animated, level]);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-bat-white group-hover:text-bat-clinical transition-colors duration-150">
            {name}
          </span>
          <span className="font-mono text-[0.55rem] tracking-[0.12em] text-bat-concrete hidden group-hover:inline transition-all">
            {note}
          </span>
        </div>
        <span className="font-mono text-[0.6rem] text-bat-ash">{level}</span>
      </div>
      <div className="h-px bg-bat-concrete/50 relative overflow-hidden">
        <div
          ref={barRef}
          className="absolute left-0 top-0 h-full bg-bat-red"
          style={{ width: trigger ? undefined : "0%" }}
        />
      </div>
    </div>
  );
}

export default function SkillMatrix() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        autoAlpha: 0, y: 30, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });

      // Trigger bars when section enters view
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => setTriggered(true),
      });

      // Category cards stagger in
      const cards = sectionRef.current?.querySelectorAll("[data-cat]");
      if (cards) {
        gsap.from(cards, {
          autoAlpha: 0, y: 40, duration: 0.7, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bat-black border-t border-bat-concrete py-32 px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headRef}>
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-4">
            Stack
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider text-bat-white mb-4">
            WHAT I WORK WITH.
          </h2>
          <p className="font-body text-sm text-bat-ash mb-16 max-w-md leading-relaxed">
            Not a resume. A record of things I use when the stakes are real.
            Numbers are honest approximations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-bat-concrete divide-y md:divide-x md:divide-y-0 divide-bat-concrete">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              data-cat
              className="p-8 flex flex-col gap-6 hover:bg-bat-graphite transition-colors duration-300"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 border-b border-bat-concrete pb-4">
                <span className="text-bat-red font-mono text-lg">{cat.icon}</span>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-bat-ash">
                  {cat.name}
                </p>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-5">
                {cat.skills.map((s) => (
                  <SkillBar key={s.name} {...s} trigger={triggered} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-bat-concrete mt-8">
          Level is not self-assessment. It is a measure of how much I trust myself under pressure.
        </p>
      </div>
    </section>
  );
}
