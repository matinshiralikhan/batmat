"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { siteConfig } from "@/config";

export default function ContactPageContent() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <main className="min-h-screen bg-bat-black pt-32 pb-24 px-8 md:px-16 lg:px-24 flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="mb-24">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">
            {c.eyebrow}
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none text-bat-white tracking-tight">
            {c.title1}
            <br />
            <span className="text-bat-red">{c.title2}</span>
          </h1>
        </div>

        {/* The invitation */}
        <div className="mb-20">
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-md mb-8">
            {c.intro1}
          </p>
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-md">
            {c.intro2}
          </p>
        </div>

        {/* Contact methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-bat-concrete">
          <div className="py-10 sm:pe-12 sm:border-e border-bat-concrete">
            <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
              {c.emailLabel}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-sm text-bat-white hover:text-bat-red transition-colors duration-150 block"
            >
              {siteConfig.email}
            </a>
            <p className="font-body text-xs text-bat-ash mt-3 leading-relaxed">{c.emailDesc}</p>
          </div>

          <div className="py-10 sm:ps-12">
            <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
              {c.githubLabel}
            </p>
            <a
              href={siteConfig.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-bat-white hover:text-bat-red transition-colors duration-150 block"
            >
              github.com/{siteConfig.github.username}
            </a>
            <p className="font-body text-xs text-bat-ash mt-3 leading-relaxed">{c.githubDesc}</p>
          </div>

          <div className="py-10 sm:pe-12 sm:border-e border-bat-concrete border-t border-bat-concrete">
            <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
              {c.twitterLabel}
            </p>
            <a
              href={siteConfig.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-bat-white hover:text-bat-red transition-colors duration-150 block"
            >
              @{siteConfig.twitter.username}
            </a>
            <p className="font-body text-xs text-bat-ash mt-3 leading-relaxed">{c.twitterDesc}</p>
          </div>

          <div className="py-10 sm:ps-12 border-t border-bat-concrete">
            <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
              {c.telegramLabel}
            </p>
            <a
              href={siteConfig.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-bat-white hover:text-bat-red transition-colors duration-150 block"
            >
              @{siteConfig.telegram.username}
            </a>
            <p className="font-body text-xs text-bat-ash mt-3 leading-relaxed">{c.telegramDesc}</p>
          </div>
        </div>

        {/* Available for */}
        <div className="mt-20 border-t border-bat-concrete pt-16">
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash mb-8">
            {c.availableFor}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.availableItems.map((item) => (
              <div key={item} className="flex items-start gap-3 font-body text-sm text-bat-ghost">
                <span className="text-bat-red mt-0.5 flex-shrink-0">—</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Not available for */}
        <div className="mt-16 border-t border-bat-concrete pt-12">
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash mb-6">
            {c.notAvailableFor}
          </p>
          <p className="font-body text-sm text-bat-ash leading-relaxed">{c.notAvailableDesc}</p>
        </div>
      </div>
    </main>
  );
}
