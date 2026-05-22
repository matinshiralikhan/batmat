import type { Metadata } from "next";
import { playlist } from "@/data/culture";

export const metadata: Metadata = {
  title: "Frequencies — BATMAT",
  description: "The records that shaped the way I think.",
};

export default function FrequenciesPage() {
  return (
    <main className="min-h-screen bg-bat-black pt-32 pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">
            Frequencies
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none text-bat-white tracking-tight mb-8">
            MUSIC.
          </h1>
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-md">
            Post-rock structures the way I think. Long quiet sections. Occasional
            overwhelming moments. The silence earns the crescendo.
          </p>
        </div>

        {/* Track list */}
        <div className="border-t border-bat-concrete">
          {playlist.map((album, i) => (
            <div
              key={album.id}
              className="group border-b border-bat-concrete py-8 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 items-start hover:bg-bat-graphite transition-colors duration-200 -mx-4 px-4"
            >
              {/* Number */}
              <span className="font-mono text-2xs tracking-[0.2em] text-bat-concrete lg:pt-0.5 w-6">
                {album.id}
              </span>

              {/* Info */}
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-xl md:text-2xl tracking-wider text-bat-white group-hover:text-bat-clinical transition-colors duration-200">
                  {album.title.toUpperCase()}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-bat-ghost">
                    {album.artist}
                  </span>
                  <span className="text-bat-concrete text-xs">·</span>
                  <span className="font-mono text-xs text-bat-concrete">
                    {album.year}
                  </span>
                  <span className="text-bat-concrete text-xs">·</span>
                  <span className="font-mono text-xs text-bat-ash tracking-wider">
                    {album.genre}
                  </span>
                </div>
                <p className="font-body text-sm text-bat-ash leading-relaxed max-w-lg mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {album.why}
                </p>
              </div>

              {/* Year badge */}
              <span className="font-mono text-2xs text-bat-concrete tracking-wider hidden lg:block">
                {album.year}
              </span>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 border-t border-bat-concrete pt-12">
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-concrete">
            Hover any record to read why it matters.
          </p>
        </div>
      </div>
    </main>
  );
}
