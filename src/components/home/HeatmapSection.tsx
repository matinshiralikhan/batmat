"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  days: ContributionDay[];
}

function generateFallbackData(): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  const now = new Date();
  for (let w = 51; w >= 0; w--) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      const rand = Math.random();
      const count = rand < 0.5 ? 0 : rand < 0.7 ? 1 : rand < 0.85 ? 3 : rand < 0.95 ? 6 : 10;
      const level = (count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : count < 7 ? 3 : 4) as 0|1|2|3|4;
      days.push({ date: date.toISOString().split("T")[0], count, level });
    }
    weeks.push({ days });
  }
  return weeks;
}

const levelColor = [
  "bg-bat-concrete/30",
  "bg-bat-red/25",
  "bg-bat-red/45",
  "bg-bat-red/70",
  "bg-bat-red",
];

export default function HeatmapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
  const [total, setTotal] = useState(0);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setWeeks(generateFallbackData());
  }, []);

  useEffect(() => {
    if (weeks.length === 0) return;
    const t = weeks.reduce((sum, w) => sum + w.days.reduce((s, d) => s + d.count, 0), 0);
    setTotal(t);
  }, [weeks]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCell = (e: React.MouseEvent, day: ContributionDay) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const parentRect = sectionRef.current?.getBoundingClientRect();
    setTooltip({
      text: day.count === 0 ? `No activity · ${day.date}` : `${day.count} contribution${day.count !== 1 ? "s" : ""} · ${day.date}`,
      x: rect.left - (parentRect?.left ?? 0) + rect.width / 2,
      y: rect.top - (parentRect?.top ?? 0) - 8,
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`bg-bat-black border-t border-bat-concrete py-24 px-8 md:px-16 lg:px-24 transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-4">
              Activity
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-wider text-bat-white">
              GITHUB HEATMAP
            </h2>
          </div>
          <a
            href={siteConfig.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-[0.2em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150"
          >
            @{siteConfig.github.username} →
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mb-8 flex-wrap">
          <div>
            <span className="font-display text-3xl text-bat-red">{total.toLocaleString()}</span>
            <span className="font-mono text-2xs text-bat-ash ml-2 tracking-widest uppercase">contributions this year</span>
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="relative overflow-x-auto pb-2">
          <div
            className="flex gap-[3px]"
            onMouseLeave={() => setTooltip(null)}
          >
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.days.map((day, di) => (
                  <div
                    key={di}
                    onMouseEnter={(e) => handleCell(e, day)}
                    className={`w-3 h-3 rounded-[2px] cursor-default transition-all duration-150 hover:ring-1 hover:ring-bat-red/60 ${levelColor[day.level]}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="absolute z-10 bg-bat-graphite border border-bat-concrete px-3 py-1.5 pointer-events-none transform -translate-x-1/2 -translate-y-full"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              <span className="font-mono text-[0.6rem] tracking-[0.1em] text-bat-ash whitespace-nowrap">
                {tooltip.text}
              </span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4">
          <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-bat-concrete">Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div key={l} className={`w-3 h-3 rounded-[2px] ${levelColor[l as 0|1|2|3|4]}`} />
          ))}
          <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-bat-concrete">More</span>
        </div>
      </div>
    </section>
  );
}
