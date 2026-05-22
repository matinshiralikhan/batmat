"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function WorkPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLDivElement>(null);

  const featured = projects.filter((p) => p.featured).slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      const frames = framesRef.current?.querySelectorAll("[data-frame]");
      if (frames) {
        gsap.from(frames, {
          scrollTrigger: {
            trigger: framesRef.current,
            start: "top 75%",
          },
          autoAlpha: 0,
          y: 50,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bat-graphite py-32 px-8 md:px-16 lg:px-24"
      aria-label="Selected work"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headingRef}
          className="flex items-end justify-between mb-16 border-b border-bat-concrete pb-8"
        >
          <div>
            <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-4">
              04 — Work
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-bat-white tracking-wider">
              SELECTED WORK
            </h2>
          </div>
          <Link
            href="/work"
            className="font-mono text-xs tracking-[0.15em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150 hidden md:block"
          >
            All work →
          </Link>
        </div>

        {/* Project frames */}
        <div ref={framesRef} className="divide-y divide-bat-concrete">
          {featured.map((project) => (
            <ProjectFrame key={project.id} project={project} />
          ))}
        </div>

        {/* Mobile all work link */}
        <div className="mt-12 md:hidden">
          <Link
            href="/work"
            className="font-mono text-xs tracking-[0.15em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150"
          >
            All work →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectFrame({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const frameRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={frameRef}
      data-frame
      className="group py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center hover:bg-bat-dark transition-colors duration-300 -mx-4 px-4 cursor-default"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <span className="font-mono text-2xs tracking-[0.2em] text-bat-ash">
            {project.id}
          </span>
          <span className="font-mono text-2xs tracking-[0.15em] uppercase text-bat-red">
            {project.status}
          </span>
        </div>
        <h3 className="font-display text-4xl md:text-5xl text-bat-white tracking-wider group-hover:text-bat-clinical transition-colors duration-200">
          {project.title.toUpperCase()}
        </h3>
        <p className="font-body text-sm text-bat-ghost leading-relaxed max-w-md">
          {project.tagline}
        </p>
      </div>

      <div className="flex flex-col items-start md:items-end gap-4">
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="font-mono text-2xs tracking-wider text-bat-ash border border-bat-concrete px-2 py-1"
            >
              {tech}
            </span>
          ))}
        </div>
        <span className="font-mono text-2xs tracking-[0.2em] text-bat-ash">
          {project.year}
        </span>
      </div>
    </div>
  );
}
