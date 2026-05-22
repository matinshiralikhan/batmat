"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EVENTS = [
  {
    year: "2017",
    title: "First Line of Go",
    desc: "Discovered Go. Realized immediately it was the right language for systems work — fast, explicit, no surprises. Wrote 10k lines in the first month.",
    tag: "origin",
  },
  {
    year: "2019",
    title: "Anti-Censorship v1",
    desc: "Built the first version of a censorship circumvention tool from scratch. Reached 2,000 daily users. It worked. That was enough to keep going.",
    tag: "milestone",
  },
  {
    year: "2021",
    title: "Technical Manager — Security R&D",
    desc: "Took on leadership of the R&D team at a security infrastructure company. Built internal tooling, managed engineers, shipped systems that run in the dark.",
    tag: "role",
  },
  {
    year: "2022",
    title: "Meridian — Freedom Infra v2",
    desc: "Complete rewrite. WireGuard-based, zero-trust architecture, sub-5ms latency. 10k→100k users in eight months. Zero breaches. No surveillance hooks.",
    tag: "systems",
  },
  {
    year: "2023",
    title: "100k+ Protected Users",
    desc: "Crossed the threshold. Uptime: 99.97%. The infrastructure became invisible — which means it was working exactly as designed.",
    tag: "scale",
  },
  {
    year: "2025",
    title: "BATMAT",
    desc: "Opened the curtain slightly. A single page that says: this is what I built, this is how I think, this is who I am. The rest is still in the dark.",
    tag: "now",
  },
];

const tagColor: Record<string, string> = {
  origin:    "text-bat-ghost",
  milestone: "text-bat-red",
  role:      "text-bat-ash",
  systems:   "text-bat-red",
  scale:     "text-bat-clinical",
  now:       "text-bat-red",
};

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grow the vertical line as you scroll through the section
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      // Each item slides in from left
      itemRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { autoAlpha: 0, x: -30 },
          {
            autoAlpha: 1, x: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bat-black border-t border-bat-concrete py-32 px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">
          Timeline
        </p>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wider text-bat-white mb-20">
          HOW IT HAPPENED.
        </h2>

        {/* Timeline list */}
        <div className="relative pl-10 md:pl-16">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-bat-concrete origin-top"
            style={{ transformOrigin: "top center" }}
          />

          <div className="flex flex-col gap-12">
            {EVENTS.map((ev, i) => (
              <div
                key={ev.year}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="relative"
                style={{ opacity: 0 }}
              >
                {/* Dot on the line */}
                <div className="absolute -left-[2.35rem] md:-left-[3.35rem] top-2.5 flex items-center justify-center w-3 h-3">
                  <div className={`w-3 h-3 rounded-full ring-4 ring-bat-black ${ev.tag === "now" ? "bg-bat-red" : "bg-bat-concrete"}`} />
                </div>

                {/* Content */}
                <div className="border border-bat-concrete bg-bat-graphite p-6 hover:border-bat-red/40 transition-colors duration-300 group">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-display text-3xl text-bat-red">{ev.year}</span>
                    <span className={`font-mono text-2xs tracking-[0.15em] uppercase ${tagColor[ev.tag]}`}>
                      {ev.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl tracking-wider text-bat-white mb-3 group-hover:text-bat-clinical transition-colors duration-200">
                    {ev.title.toUpperCase()}
                  </h3>
                  <p className="font-body text-sm text-bat-ash leading-relaxed">
                    {ev.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
