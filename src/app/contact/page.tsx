import type { Metadata } from "next";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: "Contact — BATMAT",
  description: "Open the channel.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bat-black pt-32 pb-24 px-8 md:px-16 lg:px-24 flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="mb-24">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">
            Contact
          </p>
          <h1 className="font-display text-7xl md:text-9xl leading-none text-bat-white tracking-tight">
            OPEN THE
            <br />
            <span className="text-bat-red">CHANNEL.</span>
          </h1>
        </div>

        {/* The invitation */}
        <div className="mb-20">
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-md mb-8">
            Not for the usual reasons. If something here resonated — the work,
            the approach, the fact that a person bothered to mean something with
            their website — that is enough.
          </p>
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-md">
            Collaboration. Consultation. Conversation. I am available for the
            right things. I understand what you need before you finish saying it.
          </p>
        </div>

        {/* Contact methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-bat-concrete">
          <div className="py-10 sm:pr-12 sm:border-r border-bat-concrete">
            <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
              Email
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-sm text-bat-white hover:text-bat-red transition-colors duration-150 block"
            >
              {siteConfig.email}
            </a>
            <p className="font-body text-xs text-bat-ash mt-3 leading-relaxed">
              For direct contact. I read everything. I respond to the ones that
              matter.
            </p>
          </div>

          <div className="py-10 sm:pl-12">
            <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
              GitHub
            </p>
            <a
              href={siteConfig.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-bat-white hover:text-bat-red transition-colors duration-150 block"
            >
              github.com/{siteConfig.github.username}
            </a>
            <p className="font-body text-xs text-bat-ash mt-3 leading-relaxed">
              Where the actual work lives. The public parts, at least.
            </p>
          </div>

          <div className="py-10 sm:pr-12 sm:border-r border-bat-concrete border-t border-bat-concrete">
            <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
              X / Twitter
            </p>
            <a
              href={siteConfig.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-bat-white hover:text-bat-red transition-colors duration-150 block"
            >
              @{siteConfig.twitter.username}
            </a>
            <p className="font-body text-xs text-bat-ash mt-3 leading-relaxed">
              Thinking out loud. Occasionally precise.
            </p>
          </div>

          <div className="py-10 sm:pl-12 border-t border-bat-concrete">
            <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
              Telegram
            </p>
            <a
              href={siteConfig.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-bat-white hover:text-bat-red transition-colors duration-150 block"
            >
              @{siteConfig.telegram.username}
            </a>
            <p className="font-body text-xs text-bat-ash mt-3 leading-relaxed">
              For the conversations that need to stay private.
            </p>
          </div>
        </div>

        {/* What I am available for */}
        <div className="mt-20 border-t border-bat-concrete pt-16">
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash mb-8">
            Available for
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Security infrastructure consulting",
              "Go systems development",
              "Technical leadership advising",
              "Anti-censorship tooling",
              "Architecture review",
              "The right conversation",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 font-body text-sm text-bat-ghost"
              >
                <span className="text-bat-red mt-0.5 flex-shrink-0">—</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Not available for */}
        <div className="mt-16 border-t border-bat-concrete pt-12">
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash mb-6">
            Not available for
          </p>
          <p className="font-body text-sm text-bat-ash leading-relaxed">
            Things that don&apos;t matter. Generic consulting. Projects that
            wouldn&apos;t exist if someone weren&apos;t paying for them.
          </p>
        </div>
      </div>
    </main>
  );
}
