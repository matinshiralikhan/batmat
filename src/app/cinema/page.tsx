import type { Metadata } from "next";
import { films } from "@/data/culture";

export const metadata: Metadata = {
  title: "Cinema — BATMAT",
  description: "Films that changed how I see things.",
};

export default function CinemaPage() {
  return (
    <main className="min-h-screen bg-bat-graphite pt-32 pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">
            Cinema
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none text-bat-white tracking-tight mb-8">
            FILMS.
          </h1>
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-md">
            Nolan, Villeneuve, Fincher, Mann. Films about obsession,
            consequence, systems, and the cost of caring too much.
          </p>
        </div>

        {/* Film grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-bat-concrete divide-y md:divide-x md:divide-y-0 divide-bat-concrete">
          {films.map((film) => (
            <div
              key={film.id}
              className="group p-8 flex flex-col gap-4 hover:bg-bat-dark transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-2xs tracking-[0.2em] text-bat-concrete">
                    {film.id}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl tracking-wider text-bat-white group-hover:text-bat-clinical transition-colors duration-200">
                    {film.title.toUpperCase()}
                  </h2>
                </div>
                <span className="font-mono text-2xs text-bat-ash tracking-wider flex-shrink-0 mt-6">
                  {film.year}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-bat-red text-xs">—</span>
                <span className="font-mono text-xs text-bat-ghost tracking-wide">
                  {film.director}
                </span>
              </div>

              <p className="font-body text-sm text-bat-ash leading-relaxed">
                {film.why}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        {films.length % 2 !== 0 && (
          <div className="border-l border-bat-concrete md:col-span-1" />
        )}
      </div>
    </main>
  );
}
