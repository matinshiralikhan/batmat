"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const domains = [
  {
    label: "Infrastructure",
    detail: "Systems that run whether anyone is watching or not.",
  },
  {
    label: "Security",
    detail: "Not the kind that makes you feel safe. The kind that keeps you safe.",
  },
  {
    label: "Freedom",
    detail: "Anti-censorship tooling. Built for use, not for press releases.",
  },
  {
    label: "Systems Thinking",
    detail: "Understanding how control works before building around it.",
  },
];

const stack = [
  "Go",
  "gRPC",
  "PostgreSQL",
  "WireGuard",
  "Linux",
  "Prometheus",
  "OpenTelemetry",
  "Kubernetes",
  "Vault",
  "ClickHouse",
];

export default function SystemReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
      });

      const domainItems = domainsRef.current?.querySelectorAll("[data-domain]");
      if (domainItems) {
        gsap.from(domainItems, {
          scrollTrigger: {
            trigger: domainsRef.current,
            start: "top 75%",
          },
          autoAlpha: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
        });
      }

      gsap.from(stackRef.current, {
        scrollTrigger: {
          trigger: stackRef.current,
          start: "top 80%",
        },
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-bat-graphite flex items-center py-32 px-8 md:px-16 lg:px-24"
      aria-label="What I build"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section marker */}
        <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-12">
          02 — System
        </p>

        {/* Main heading */}
        <h2
          ref={headingRef}
          className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-none tracking-tight text-bat-white mb-20 max-w-4xl"
        >
          I BUILD
          <br />
          <span className="text-bat-ash">THINGS THAT</span>
          <br />
          MATTER.
        </h2>

        {/* Domains */}
        <div
          ref={domainsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-bat-concrete mb-24"
        >
          {domains.map(({ label, detail }) => (
            <div
              key={label}
              data-domain
              className="border-b border-bat-concrete md:even:border-l py-8 md:px-8 first:pl-0 group"
            >
              <h3 className="font-display text-2xl tracking-widest text-bat-white mb-3 group-hover:text-bat-red transition-colors duration-200">
                {label.toUpperCase()}
              </h3>
              <p className="font-body text-sm text-bat-ash leading-relaxed max-w-xs">
                {detail}
              </p>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div ref={stackRef}>
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash mb-6">
            Primary Stack
          </p>
          <div className="flex flex-wrap gap-3">
            {stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs tracking-wider text-bat-ghost border border-bat-concrete px-3 py-1.5 hover:border-bat-red hover:text-bat-white transition-colors duration-150"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
