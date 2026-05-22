"use client";

import { useState } from "react";
import { siteConfig } from "@/config";

const stateConfig = {
  available: { dot: "bg-green-500",    label: "AVAILABLE" },
  building:  { dot: "bg-bat-red",      label: "BUILDING"  },
  unavailable: { dot: "bg-bat-ghost",  label: "OFFLINE"   },
} as const;

export default function StatusWidget() {
  const [expanded, setExpanded] = useState(false);
  const { state, note } = siteConfig.status;
  const { dot, label } = stateConfig[state];

  return (
    <div className="fixed bottom-8 right-6 z-40 flex flex-col items-end gap-2">
      {/* Expanded panel */}
      {expanded && (
        <div className="bg-bat-graphite border border-bat-concrete px-4 py-3 max-w-[220px]">
          <p className="font-mono text-2xs tracking-[0.15em] uppercase text-bat-red mb-2">
            {label}
          </p>
          <p className="font-body text-xs text-bat-ash leading-relaxed">
            {note}
          </p>
        </div>
      )}

      {/* Status pill */}
      <button
        onClick={() => setExpanded((e) => !e)}
        aria-label={`Status: ${label}. ${expanded ? "Click to collapse" : "Click to expand"}`}
        className="flex items-center gap-2 bg-bat-graphite border border-bat-concrete px-3 py-2 hover:border-bat-red transition-colors duration-150 group"
      >
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 ${dot} status-pulse`}
        />
        <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-bat-ghost group-hover:text-bat-white transition-colors duration-150">
          {label}
        </span>
      </button>
    </div>
  );
}
