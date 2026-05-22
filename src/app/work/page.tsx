import type { Metadata } from "next";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — BATMAT",
  description: "Selected projects. Built with intent.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-bat-black pt-32 pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">
            Work
          </p>
          <h1 className="font-display text-7xl md:text-9xl leading-none text-bat-white tracking-tight mb-8">
            SELECTED
            <br />
            <span className="text-bat-ash">WORK.</span>
          </h1>
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-md">
            Three to five significant things. Presented with the weight they
            deserve. The rest lives in the systems, not the portfolio.
          </p>
        </div>

        {/* Projects */}
        <div className="divide-y divide-bat-concrete">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="py-16 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
                {/* Left — identity */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-2xs tracking-[0.2em] text-bat-ash">
                      {project.id}
                    </span>
                    <span className="font-mono text-2xs tracking-[0.15em] uppercase text-bat-red">
                      {project.status}
                    </span>
                    <span className="font-mono text-2xs tracking-[0.2em] text-bat-ash">
                      {project.year}
                    </span>
                  </div>
                  <h2 className="font-display text-5xl md:text-7xl text-bat-white tracking-wider mb-6 group-hover:text-bat-clinical transition-colors duration-300">
                    {project.title.toUpperCase()}
                  </h2>
                  <p className="font-body text-base text-bat-red leading-relaxed mb-6">
                    {project.tagline}
                  </p>
                  <p className="font-body text-sm text-bat-ghost leading-relaxed max-w-lg">
                    {project.description}
                  </p>
                </div>

                {/* Right — metadata */}
                <div className="lg:pt-16 flex flex-col gap-8">
                  <div>
                    <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash mb-4">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs tracking-wider text-bat-ghost border border-bat-concrete px-3 py-1.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Red accent line */}
                  <div className="w-8 h-px bg-bat-red" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
