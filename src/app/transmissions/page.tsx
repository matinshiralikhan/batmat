import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Transmissions — BATMAT",
  description: "Writing. Thinking. Things that needed to be said.",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function TransmissionsPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen bg-bat-black pt-32 pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">
            Transmissions
          </p>
          <h1 className="font-display text-7xl md:text-9xl leading-none text-bat-white tracking-tight mb-8">
            WRITING.
          </h1>
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-md">
            Things that needed to be said. Not frequent. Not polished. Real.
          </p>
        </div>

        {/* Post list */}
        <div className="divide-y divide-bat-concrete">
          {sorted.map((post) => (
            <article key={post.slug} className="group py-12">
              <Link href={`/transmissions/${post.slug}`} className="block">
                <div className="flex items-center gap-4 mb-5">
                  <time
                    dateTime={post.date}
                    className="font-mono text-2xs tracking-[0.2em] text-bat-ash"
                  >
                    {formatDate(post.date)}
                  </time>
                  <span className="font-mono text-2xs tracking-[0.15em] uppercase text-bat-concrete">
                    {post.readTime} read
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl tracking-wider text-bat-white mb-4 group-hover:text-bat-clinical transition-colors duration-200">
                  {post.title.toUpperCase()}
                </h2>
                <p className="font-body text-sm text-bat-ash leading-relaxed max-w-xl mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-2xs tracking-wider text-bat-concrete border border-bat-concrete px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
