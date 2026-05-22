import type { Metadata } from "next";
import { archiveEntries } from "@/data/projects";

export const metadata: Metadata = {
  title: "Archive — BATMAT",
  description: "Thinking accumulated over time. Gaining weight.",
};

const typeColors: Record<string, string> = {
  observation: "text-bat-red",
  note: "text-bat-ash",
  technical: "text-bat-ghost",
};

export default function ArchivePage() {
  return (
    <main className="min-h-screen bg-bat-graphite pt-32 pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">
            Archive
          </p>
          <h1 className="font-display text-7xl md:text-9xl leading-none text-bat-white tracking-tight mb-8">
            THINKING.
          </h1>
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-md">
            Fragments, observations, technical notes. Not a blog. An
            accumulation. These gain weight over time.
          </p>
        </div>

        {/* Entries */}
        <div className="divide-y divide-bat-concrete">
          {archiveEntries.map((entry, i) => (
            <article key={i} className="py-10 group">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-2xs tracking-[0.2em] text-bat-ash">
                  {entry.date}
                </span>
                <span
                  className={`font-mono text-2xs tracking-[0.15em] uppercase ${typeColors[entry.type] ?? "text-bat-ghost"}`}
                >
                  {entry.type}
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl tracking-wider text-bat-white mb-4 group-hover:text-bat-clinical transition-colors duration-200">
                {entry.title.toUpperCase()}
              </h2>
              <p className="font-body text-sm text-bat-ash leading-relaxed max-w-lg">
                {entry.excerpt}
              </p>
            </article>
          ))}
        </div>

        {/* Empty state / tease of more */}
        <div className="pt-16 border-t border-bat-concrete">
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-concrete">
            The archive is accumulating. More will appear.
          </p>
        </div>
      </div>
    </main>
  );
}
