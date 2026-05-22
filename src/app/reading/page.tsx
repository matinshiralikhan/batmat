import type { Metadata } from "next";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "Reading — BATMAT",
  description: "Books that changed how I think.",
};

export default function ReadingPage() {
  return (
    <main className="min-h-screen bg-bat-black pt-32 pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">
            Reading
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none text-bat-white tracking-tight mb-8">
            BOOKS.
          </h1>
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-md">
            Not a reading list. A record of things that changed how I see
            structure, control, and what it means to build something that holds.
            Hover to read why.
          </p>
        </div>

        {/* Book list */}
        <div className="border-t border-bat-concrete">
          {books.map((book, i) => (
            <div
              key={book.id}
              className="group border-b border-bat-concrete py-8 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 items-start hover:bg-bat-graphite transition-colors duration-200 -mx-4 px-4"
            >
              {/* Number */}
              <span className="font-mono text-2xs text-bat-concrete lg:pt-0.5 w-6 flex-shrink-0">
                {book.id}
              </span>

              {/* Info */}
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-xl md:text-2xl tracking-wider text-bat-white group-hover:text-bat-clinical transition-colors duration-200">
                  {book.title.toUpperCase()}
                </h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-xs text-bat-ghost">
                    {book.author}
                  </span>
                  <span className="text-bat-concrete text-xs">·</span>
                  <span className="font-mono text-xs text-bat-concrete">
                    {book.year}
                  </span>
                </div>
                <p className="font-body text-sm text-bat-ash leading-relaxed max-w-2xl mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">
                  {book.why}
                </p>
              </div>

              {/* Year */}
              <span className="font-mono text-2xs text-bat-concrete tracking-wider hidden lg:block flex-shrink-0">
                {book.year}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-bat-concrete pt-12">
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-concrete">
            {books.length} books. Hover any title to read why it made the list.
          </p>
        </div>
      </div>
    </main>
  );
}
