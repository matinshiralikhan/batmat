"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CODE_LINES = [
  { text: "func NewVPNTunnel(cfg Config) (*Tunnel, error) {", color: "text-bat-clinical" },
  { text: "  if err := cfg.Validate(); err != nil {", color: "text-bat-ash" },
  { text: "    return nil, fmt.Errorf(\"invalid config: %w\", err)", color: "text-bat-red/70" },
  { text: "  }", color: "text-bat-ash" },
  { text: "  t := &Tunnel{cfg: cfg, state: StateIdle}", color: "text-bat-ghost" },
  { text: "  go t.watchdog()", color: "text-bat-red" },
  { text: "  return t, nil", color: "text-bat-ash" },
  { text: "}", color: "text-bat-clinical" },
  { text: "", color: "" },
  { text: "// Zero-trust. Zero-compromise.", color: "text-bat-red/60" },
];

const COMMITS = [
  { hash: "c0131a", msg: "feat: anti-censorship tunnel v3", time: "2h ago", files: "+847 -12" },
  { hash: "b4tm4n", msg: "fix: zero-day patch for proxy bypass", time: "6h ago", files: "+23 -1" },
  { hash: "d4rk0s", msg: "refactor: remove all surveillance hooks", time: "1d ago", files: "+0 -412" },
  { hash: "fr33d0m", msg: "init: meridian — freedom infra v1", time: "3d ago", files: "+2891 -0" },
];

const METRICS = [
  { label: "UPTIME", value: "99.97%", sub: "last 365d" },
  { label: "LATENCY", value: "4ms", sub: "avg p50" },
  { label: "USERS", value: "100k+", sub: "protected" },
  { label: "THREATS", value: "0", sub: "breaches" },
];

export default function AnimatedVisuals() {
  const sectionRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const gitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Code window — lines cascade in
      const codeLines = codeRef.current?.querySelectorAll(".code-line");
      if (codeLines) {
        gsap.fromTo(
          codeLines,
          { autoAlpha: 0, x: -16 },
          {
            autoAlpha: 1, x: 0, duration: 0.4, ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: codeRef.current, start: "top 75%" },
          }
        );
      }

      // Metrics — scale up
      const cards = metricsRef.current?.querySelectorAll(".metric-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, scale: 0.85, y: 20 },
          {
            autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.4)",
            stagger: 0.1,
            scrollTrigger: { trigger: metricsRef.current, start: "top 80%" },
          }
        );
      }

      // Git log — slide in from right
      const commits = gitRef.current?.querySelectorAll(".commit-row");
      if (commits) {
        gsap.fromTo(
          commits,
          { autoAlpha: 0, x: 24 },
          {
            autoAlpha: 1, x: 0, duration: 0.45, ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: gitRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bat-graphite border-t border-bat-concrete py-24 px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-4">
          The work
        </p>
        <h2 className="font-display text-4xl md:text-5xl tracking-wider text-bat-white mb-16">
          WHAT IT LOOKS LIKE INSIDE.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code window */}
          <div ref={codeRef} className="border border-bat-concrete bg-bat-black overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-bat-concrete bg-bat-dark">
              <span className="w-2.5 h-2.5 rounded-full bg-bat-red/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
              <span className="font-mono text-[0.6rem] text-bat-concrete ml-2 tracking-widest">
                tunnel.go
              </span>
            </div>
            <div className="p-5 font-mono text-[0.7rem] leading-6 overflow-x-auto">
              {CODE_LINES.map((line, i) => (
                <div
                  key={i}
                  className={`code-line flex gap-4 ${line.color}`}
                  style={{ opacity: 0 }}
                >
                  {line.text !== "" && (
                    <span className="text-bat-concrete/40 select-none w-4 text-right flex-shrink-0">
                      {i + 1}
                    </span>
                  )}
                  <span>{line.text}</span>
                </div>
              ))}
              {/* Blinking cursor */}
              <div className="code-line flex gap-4 mt-1" style={{ opacity: 0 }}>
                <span className="text-bat-concrete/40 select-none w-4 text-right flex-shrink-0">
                  {CODE_LINES.length + 1}
                </span>
                <span className="text-bat-red cursor-blink">▋</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* Metrics */}
            <div
              ref={metricsRef}
              className="grid grid-cols-2 gap-3"
            >
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="metric-card border border-bat-concrete bg-bat-black p-5 group hover:border-bat-red transition-colors duration-200"
                  style={{ opacity: 0 }}
                >
                  <p className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-bat-concrete mb-2">
                    {m.label}
                  </p>
                  <p className="font-display text-3xl text-bat-red leading-none">
                    {m.value}
                  </p>
                  <p className="font-mono text-[0.6rem] text-bat-ghost mt-1">{m.sub}</p>
                </div>
              ))}
            </div>

            {/* Git log */}
            <div ref={gitRef} className="border border-bat-concrete bg-bat-black overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-bat-concrete bg-bat-dark">
                <span className="font-mono text-[0.6rem] text-bat-concrete tracking-widest">
                  git log --oneline
                </span>
              </div>
              <div className="divide-y divide-bat-concrete/40">
                {COMMITS.map((c) => (
                  <div
                    key={c.hash}
                    className="commit-row flex items-start gap-3 px-4 py-3 hover:bg-bat-graphite transition-colors duration-150 group"
                    style={{ opacity: 0 }}
                  >
                    <span className="font-mono text-[0.65rem] text-bat-red flex-shrink-0 mt-0.5">
                      {c.hash}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[0.7rem] text-bat-clinical truncate">
                        {c.msg}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-mono text-[0.6rem] text-bat-concrete">{c.time}</span>
                        <span className="font-mono text-[0.6rem] text-green-500/70">{c.files}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
