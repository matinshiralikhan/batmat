"use client";

import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 7, suffix: "+", label: "Years in systems" },
  { value: 40, suffix: "+", label: "Internal tools built" },
  { value: 3, suffix: "", label: "Anti-censorship systems" },
  { value: 100, suffix: "k+", label: "Lines of Go" },
];

function useCountUp(target: number, trigger: boolean, duration = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    let raf: number;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, trigger, duration]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  trigger,
}: {
  value: number;
  suffix: string;
  label: string;
  trigger: boolean;
}) {
  const count = useCountUp(value, trigger);

  return (
    <div className="flex flex-col gap-3 py-10 md:py-12 group">
      <div
        className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-bat-white leading-none tracking-tighter tabular-nums"
        aria-label={`${value}${suffix} ${label}`}
      >
        <span>{count}</span>
        <span className="text-bat-red">{suffix}</span>
      </div>
      <p className="font-mono text-2xs tracking-[0.18em] uppercase text-bat-ash">
        {label}
      </p>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-bat-black border-y border-bat-concrete px-8 md:px-16 lg:px-24"
      aria-label="Numbers"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-bat-concrete">
        {stats.map((s, i) => (
          <div key={i} className="px-4 md:px-6 first:pl-0 last:pr-0">
            <StatItem {...s} trigger={triggered} />
          </div>
        ))}
      </div>
    </section>
  );
}
