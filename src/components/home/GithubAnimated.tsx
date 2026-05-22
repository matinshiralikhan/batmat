"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GithubAnimated({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = ref.current?.querySelector("[data-gh-heading]");
      const cards = ref.current?.querySelectorAll("[data-gh-card]");
      const stats = ref.current?.querySelectorAll("[data-gh-stat]");

      if (heading) {
        gsap.from(heading, {
          autoAlpha: 0, y: 30, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: heading, start: "top 80%" },
        });
      }

      if (stats) {
        gsap.from(stats, {
          autoAlpha: 0, y: 20, duration: 0.6, ease: "power2.out", stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
      }

      if (cards) {
        gsap.from(cards, {
          autoAlpha: 0, y: 50, scale: 0.96, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
