import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signal — BATMAT",
  description: "Who BATMAT actually is. Stated honestly.",
};

export default function SignalPage() {
  return (
    <main className="min-h-screen bg-bat-black pt-32 pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">
            Signal
          </p>
          <h1 className="font-display text-7xl md:text-9xl leading-none text-bat-white tracking-tight">
            WHO.
          </h1>
        </div>

        {/* Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-24 mb-32">
          <div className="flex flex-col gap-8">
            <p className="font-body text-lg text-bat-white leading-relaxed">
              Technical manager. R&D team at a security company. Go developer.
              Builder of internal tooling, infrastructure, and tools for people
              who need to move through the world without being stopped.
            </p>

            <p className="font-body text-base text-bat-ash leading-relaxed">
              Professionally: I work at the intersection of infrastructure and
              security. I think about how systems fail, how they are exploited,
              and how to build things that hold. I manage teams and write code.
              Both.
            </p>

            <p className="font-body text-base text-bat-ash leading-relaxed">
              Personally: I have a deep, specific understanding of how control
              works — governmental, institutional, psychological — and a radical
              orientation toward freedom. This is not a professional position. It
              is a structural fact about who I am.
            </p>

            <p className="font-body text-base text-bat-ash leading-relaxed">
              I tend to understand what someone really wants before they finish
              explaining it. I am obsessively calm on the surface. Something
              else underneath. I care for everyone except myself, and I am
              working on that.
            </p>

            <div className="border-l-2 border-bat-red pl-8">
              <p className="font-body text-base text-bat-white leading-relaxed italic">
                The Batman mythology is not decoration here. It is a
                psychological operating system. Obsession as method. Duality as
                structure. No superpowers — only will, intelligence, and
                preparation.
              </p>
            </div>
          </div>

          {/* Side metadata */}
          <div className="flex flex-col gap-10 lg:pt-2">
            <div>
              <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
                Role
              </p>
              <p className="font-body text-sm text-bat-ghost leading-relaxed">
                Technical Manager
                <br />
                R&D — Security Infrastructure
              </p>
            </div>

            <div>
              <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
                Primary Focus
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Go Development",
                  "Systems Architecture",
                  "Anti-censorship Tools",
                  "Security Infrastructure",
                  "Team Leadership",
                ].map((item) => (
                  <li
                    key={item}
                    className="font-mono text-xs text-bat-ghost tracking-wide"
                  >
                    — {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
                Sounds Like
              </p>
              <p className="font-body text-sm text-bat-ghost leading-relaxed">
                Post-rock. Mogwai. Godspeed You! Black Emperor. Long, quiet
                sections followed by something overwhelming.
              </p>
            </div>
          </div>
        </div>

        {/* Universe — culture links */}
        <div className="border-t border-bat-concrete pt-16 mb-16">
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash mb-10">
            The rest of it
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-bat-concrete divide-y sm:divide-y-0 sm:divide-x divide-bat-concrete">
            <Link
              href="/frequencies"
              className="group p-8 flex flex-col gap-3 hover:bg-bat-graphite transition-colors duration-200"
            >
              <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red">
                Music
              </p>
              <h2 className="font-display text-3xl tracking-wider text-bat-white group-hover:text-bat-clinical transition-colors duration-200">
                FREQUENCIES
              </h2>
              <p className="font-body text-sm text-bat-ash leading-relaxed">
                The records that shaped the way I think. Post-rock, ambient,
                everything that uses silence correctly.
              </p>
              <span className="font-mono text-xs text-bat-ghost group-hover:text-bat-red transition-colors duration-150 mt-2">
                {`${10} albums →`}
              </span>
            </Link>

            <Link
              href="/cinema"
              className="group p-8 flex flex-col gap-3 hover:bg-bat-graphite transition-colors duration-200"
            >
              <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red">
                Film
              </p>
              <h2 className="font-display text-3xl tracking-wider text-bat-white group-hover:text-bat-clinical transition-colors duration-200">
                CINEMA
              </h2>
              <p className="font-body text-sm text-bat-ash leading-relaxed">
                Nolan, Villeneuve, Fincher, Mann. Films about obsession,
                consequence, and what it costs to care.
              </p>
              <span className="font-mono text-xs text-bat-ghost group-hover:text-bat-red transition-colors duration-150 mt-2">
                {`${10} films →`}
              </span>
            </Link>
          </div>
        </div>

        {/* The uncomfortable truth */}
        <div className="border-t border-bat-concrete pt-16">
          <p className="font-display text-4xl md:text-5xl leading-tight text-bat-white mb-8">
            I TRY TO BUILD THINGS
            <br />
            <span className="text-bat-red">THAT LAST.</span>
          </p>
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-lg">
            Not for recognition. Not for the resume. Because the things that
            need to exist often do not, and someone has to decide to build them
            anyway. I decided a long time ago that person would be me.
          </p>
        </div>
      </div>
    </main>
  );
}
