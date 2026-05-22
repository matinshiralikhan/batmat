export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  year: string;
  status: "active" | "deployed" | "internal" | "archived";
  slug: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Meridian",
    tagline: "Infrastructure for people who need to get out.",
    description:
      "Anti-censorship network tooling. Built to be used, not showcased. Works in environments where connection itself is a risk. Deployed. Running. Not mentioned in press releases.",
    stack: ["Go", "WireGuard", "DNS-over-HTTPS", "Linux"],
    year: "2024",
    status: "active",
    slug: "meridian",
    featured: true,
  },
  {
    id: "02",
    title: "Darkroom",
    tagline: "The security tooling your team doesn't know it needs yet.",
    description:
      "Internal credential management and secret rotation infrastructure. Built after one incident too many. Prevents the kind of mistakes that end careers.",
    stack: ["Go", "PostgreSQL", "gRPC", "Vault"],
    year: "2023",
    status: "deployed",
    slug: "darkroom",
    featured: true,
  },
  {
    id: "03",
    title: "Cartographer",
    tagline: "Mapping networks no one else wanted to map.",
    description:
      "Distributed reconnaissance and infrastructure visibility system. Find what you didn't know you were running. See everything. Decide what to do with that information.",
    stack: ["Go", "gRPC", "Prometheus", "ClickHouse"],
    year: "2023",
    status: "internal",
    slug: "cartographer",
    featured: true,
  },
  {
    id: "04",
    title: "Signal",
    tagline: "Structured logging that doesn't lie.",
    description:
      "A logging and observability layer built for teams that actually read their logs. Opinionated. Fast. Difficult to misuse.",
    stack: ["Go", "OpenTelemetry", "Elasticsearch"],
    year: "2022",
    status: "deployed",
    slug: "signal",
    featured: false,
  },
];

export const archiveEntries = [
  {
    date: "2024-09",
    type: "observation",
    title: "On building things people need but won't ask for",
    excerpt:
      "The most important infrastructure is the kind people pretend doesn't exist until it does.",
  },
  {
    date: "2024-04",
    type: "note",
    title: "Control is always about information first",
    excerpt:
      "Every system of control — governmental, corporate, interpersonal — begins with controlling what people know. Build accordingly.",
  },
  {
    date: "2024-01",
    type: "technical",
    title: "Why Go is not a language choice, it's a statement",
    excerpt:
      "Simple isn't the same as easy. Explicit isn't the same as verbose. Choosing Go is choosing to be accountable.",
  },
  {
    date: "2023-11",
    type: "note",
    title: "The cost of caring too much",
    excerpt:
      "There's a version of professionalism that's really just a failure of nerve. That version is not interesting.",
  },
  {
    date: "2023-08",
    type: "observation",
    title: "What censorship infrastructure looks like from the inside",
    excerpt:
      "It's not a wall. It's more like weather. And weather can be navigated.",
  },
];
