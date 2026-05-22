import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — BATMAT",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bat-black flex flex-col items-start justify-end pb-24 px-8 md:px-16 lg:px-24">
      {/* Large atmospheric 404 */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-display text-[30vw] leading-none text-bat-graphite tracking-tighter">
          404
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md">
        <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-8">
          Location not found
        </p>
        <h1 className="font-display text-5xl md:text-6xl leading-tight text-bat-white tracking-wider mb-6">
          SOMETHING
          <br />
          WAS HERE.
        </h1>
        <p className="font-body text-sm text-bat-ash leading-relaxed mb-4">
          It may return. It may not. The absence is not an accident.
        </p>
        <p className="font-body text-sm text-bat-concrete leading-relaxed mb-12">
          Or you typed the wrong address. That is also possible.
        </p>

        <Link
          href="/"
          className="font-mono text-xs tracking-[0.2em] uppercase text-bat-white border border-bat-concrete px-8 py-4 hover:border-bat-red hover:text-bat-red transition-colors duration-200 inline-block"
        >
          Return to origin
        </Link>
      </div>
    </main>
  );
}
