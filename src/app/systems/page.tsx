import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Systems — BATMAT",
  description: "Technical identity. How I think about infrastructure.",
};

const tools = [
  { category: "Language", items: ["Go", "TypeScript", "Bash", "SQL"] },
  {
    category: "Infrastructure",
    items: ["Linux", "Kubernetes", "Docker", "Terraform"],
  },
  {
    category: "Security",
    items: ["WireGuard", "Vault", "mTLS", "Zero-Trust Networking"],
  },
  {
    category: "Data",
    items: ["PostgreSQL", "ClickHouse", "Redis", "Elasticsearch"],
  },
  {
    category: "Observability",
    items: ["Prometheus", "Grafana", "OpenTelemetry", "Jaeger"],
  },
  {
    category: "Communication",
    items: ["gRPC", "REST", "NATS", "WebSockets"],
  },
];

const principles = [
  {
    number: "01",
    title: "Explicit over implicit.",
    body: "Code that hides what it does is code that lies to the next person who reads it. I write code that tells the truth.",
  },
  {
    number: "02",
    title: "Boring is a feature.",
    body: "Clever code is a liability. Simple code that does exactly what it says, nothing more, is the hardest thing to write.",
  },
  {
    number: "03",
    title: "Observability is respect.",
    body: "If a system can fail without telling you why, it will. Instrumentation is not a nice-to-have. It is the work.",
  },
  {
    number: "04",
    title: "Security is not a layer.",
    body: "You cannot add security after the fact. You cannot bolt it on. It must be the foundation. Everything else is wishful thinking.",
  },
];

export default function SystemsPage() {
  return (
    <main className="min-h-screen bg-bat-graphite pt-32 pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-24">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">
            Systems
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none text-bat-white tracking-tight mb-8">
            HOW I
            <br />
            <span className="text-bat-ash">THINK.</span>
          </h1>
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-md">
            The tools are secondary. The principles are primary. Here is how I
            approach systems, security, and the infrastructure of things that
            matter.
          </p>
        </div>

        {/* Principles */}
        <div className="mb-32">
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash mb-12 border-b border-bat-concrete pb-6">
            Operating Principles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {principles.map(({ number, title, body }) => (
              <div key={number} className="flex flex-col gap-4">
                <span className="font-mono text-2xs tracking-[0.2em] text-bat-red">
                  {number}
                </span>
                <h2 className="font-display text-2xl tracking-widest text-bat-white">
                  {title.toUpperCase()}
                </h2>
                <p className="font-body text-sm text-bat-ash leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash mb-12 border-b border-bat-concrete pb-6">
            Tools & Stack
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {tools.map(({ category, items }) => (
              <div key={category}>
                <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
                  {category}
                </p>
                <ul className="flex flex-col gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-sm text-bat-ghost hover:text-bat-white transition-colors duration-150"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal-style block */}
        <div className="mt-32 bg-bat-dark border border-bat-concrete p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-bat-concrete" />
            <div className="w-3 h-3 rounded-full bg-bat-concrete" />
            <div className="w-3 h-3 rounded-full bg-bat-red" />
            <span className="font-mono text-2xs text-bat-ash ml-4 tracking-wider">
              batmat ~ systems
            </span>
          </div>
          <pre className="font-mono text-sm leading-relaxed">
            <span className="text-bat-ash">$ </span>
            <span className="text-bat-white">whoami</span>
            {"\n"}
            <span className="text-bat-ghost">
              technical-manager | r&d | go-developer | builder
            </span>
            {"\n\n"}
            <span className="text-bat-ash">$ </span>
            <span className="text-bat-white">cat philosophy.txt</span>
            {"\n"}
            <span className="text-bat-ghost">
              The systems I build are invisible until they matter.
            </span>
            {"\n"}
            <span className="text-bat-ghost">That is not a failure of visibility.</span>
            {"\n"}
            <span className="text-bat-red">That is the point.</span>
            {"\n\n"}
            <span className="text-bat-ash">$ </span>
            <span className="text-bat-red animate-pulse">_</span>
          </pre>
        </div>
      </div>
    </main>
  );
}
