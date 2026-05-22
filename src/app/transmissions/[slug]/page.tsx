import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/transmissions/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — BATMAT`,
    description: post.excerpt,
  };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage(props: PageProps<"/transmissions/[slug]">) {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = post.content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-bat-black pt-32 pb-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/transmissions"
          className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash hover:text-bat-red transition-colors duration-150 mb-16 inline-block"
        >
          ← Transmissions
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <time
              dateTime={post.date}
              className="font-mono text-2xs tracking-[0.2em] text-bat-ash"
            >
              {formatDate(post.date)}
            </time>
            <span className="text-bat-concrete">—</span>
            <span className="font-mono text-2xs tracking-[0.2em] text-bat-ash">
              {post.readTime} read
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-tight text-bat-white tracking-wider">
            {post.title.toUpperCase()}
          </h1>
        </div>

        {/* Body */}
        <div className="space-y-7">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className={`font-body leading-relaxed ${
                i === 0
                  ? "text-base text-bat-white"
                  : "text-[0.9375rem] text-bat-ash"
              }`}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-16 pt-8 border-t border-bat-concrete flex items-center gap-4 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-2xs tracking-wider text-bat-concrete border border-bat-concrete px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Back bottom */}
        <div className="mt-16">
          <Link
            href="/transmissions"
            className="font-mono text-xs tracking-[0.2em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150"
          >
            ← All transmissions
          </Link>
        </div>
      </div>
    </main>
  );
}
