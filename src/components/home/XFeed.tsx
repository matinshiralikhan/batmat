"use client";

import { xPosts } from "@/data/culture";
import { siteConfig } from "@/config";

export default function XFeed() {
  return (
    <section
      className="bg-bat-black py-24 px-8 md:px-16 lg:px-24 border-t border-bat-concrete"
      aria-label="Latest from X"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-4">
              X / Twitter — @{siteConfig.twitter.username}
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-bat-white tracking-wider">
              TRANSMITTING.
            </h2>
          </div>
          <a
            href={siteConfig.twitter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block font-mono text-xs tracking-[0.15em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150"
          >
            Follow →
          </a>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-bat-concrete divide-y md:divide-y-0 md:divide-x divide-bat-concrete">
          {xPosts.slice(0, 4).map((post) => (
            <a
              key={post.id}
              href={siteConfig.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 flex flex-col gap-6 hover:bg-bat-graphite transition-colors duration-200 group"
            >
              <p className="font-body text-sm text-bat-white leading-relaxed whitespace-pre-line group-hover:text-bat-clinical transition-colors duration-200">
                {post.content}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-5">
                  <span className="font-mono text-2xs text-bat-ash flex items-center gap-1.5">
                    <HeartIcon />
                    {post.likes}
                  </span>
                  <span className="font-mono text-2xs text-bat-ash flex items-center gap-1.5">
                    <RepostIcon />
                    {post.reposts}
                  </span>
                </div>
                <span className="font-mono text-2xs text-bat-concrete tracking-wider">
                  {post.timestamp}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* API note — visible only in development */}
        <p className="mt-8 font-mono text-2xs text-bat-concrete leading-relaxed">
          {/* To connect real posts: add X API v2 Bearer Token in .env as X_BEARER_TOKEN
              and replace xPosts in data/culture.ts with a fetch to
              https://api.twitter.com/2/users/:id/tweets */}
          Showing curated posts. Update{" "}
          <code className="text-bat-ash">src/config.ts</code> with your
          X handle and connect the X API v2 to display live posts.
        </p>

        <div className="mt-6 md:hidden">
          <a
            href={siteConfig.twitter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-[0.2em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150"
          >
            Follow on X →
          </a>
        </div>
      </div>
    </section>
  );
}

function HeartIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function RepostIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
