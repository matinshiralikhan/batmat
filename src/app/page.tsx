import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import SystemReveal from "@/components/home/SystemReveal";
import StatsBar from "@/components/home/StatsBar";
import TheCrack from "@/components/home/TheCrack";
import WorkPreview from "@/components/home/WorkPreview";
import GithubPanel from "@/components/home/GithubPanel";
import HeatmapSection from "@/components/home/HeatmapSection";
import ScrollReveal from "@/components/home/ScrollReveal";
import XFeed from "@/components/home/XFeed";
import ContactSignal from "@/components/home/ContactSignal";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <SystemReveal />
      <StatsBar />
      <ScrollReveal />
      <TheCrack />
      <WorkPreview />
      <Suspense fallback={<GithubSkeleton />}>
        <GithubPanel />
      </Suspense>
      <HeatmapSection />
      <XFeed />
      <ContactSignal />
    </main>
  );
}

function GithubSkeleton() {
  return (
    <section className="bg-bat-graphite py-24 px-8 md:px-16 lg:px-24 border-t border-bat-concrete">
      <div className="max-w-6xl mx-auto">
        <div className="h-8 w-48 bg-bat-concrete animate-pulse mb-4 rounded-none" />
        <div className="h-16 w-64 bg-bat-concrete animate-pulse rounded-none" />
      </div>
    </section>
  );
}
