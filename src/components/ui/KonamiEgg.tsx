"use client";

import { useEffect, useState } from "react";
import { BatSVG } from "@/components/ui/BatmarkLogo";

const SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiEgg() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "idle") return;

      setProgress((prev) => {
        const expected = SEQUENCE[prev];
        if (e.key === expected) {
          const next = prev + 1;
          if (next === SEQUENCE.length) {
            setPhase("in");
            setTimeout(() => setPhase("out"), 3200);
            setTimeout(() => setPhase("idle"), 4000);
            return 0;
          }
          return next;
        }
        return 0;
      });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  if (phase === "idle") return null;

  return (
    <div
      className={`fixed inset-0 z-[300] bg-bat-black flex flex-col items-center justify-center gap-10 ${
        phase === "in" ? "konami-in" : "konami-out"
      }`}
      aria-hidden="true"
    >
      {/* Moon glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(192,19,26,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Bat mark */}
      <BatSVG
        width={180}
        className="text-bat-red relative z-10 drop-shadow-[0_0_60px_rgba(192,19,26,0.6)]"
      />

      <div className="flex flex-col items-center gap-4 relative z-10 text-center px-8">
        <p className="font-display text-5xl md:text-7xl tracking-widest text-bat-white">
          OBSESSION
        </p>
        <p className="font-display text-5xl md:text-7xl tracking-widest text-bat-red">
          AS METHOD.
        </p>
        <p className="font-mono text-xs tracking-[0.25em] text-bat-ash mt-4 uppercase">
          The bat signal is yours.
        </p>
      </div>

      {/* Progress indicator of how many keys were pressed (invisible to regular users) */}
    </div>
  );
}
