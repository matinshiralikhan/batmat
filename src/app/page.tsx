import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import HomeTerminal from "@/components/home/HomeTerminal";
import SystemReveal from "@/components/home/SystemReveal";
import StatsBar from "@/components/home/StatsBar";
import ScrollReveal from "@/components/home/ScrollReveal";
import AnimatedVisuals from "@/components/home/AnimatedVisuals";
import TheCrack from "@/components/home/TheCrack";
import PhotoSection from "@/components/home/PhotoSection";
import WorkPreview from "@/components/home/WorkPreview";
import TimelineSection from "@/components/home/TimelineSection";
import SkillMatrix from "@/components/home/SkillMatrix";
import GithubPanel from "@/components/home/GithubPanel";
import HeatmapSection from "@/components/home/HeatmapSection";
import XFeed from "@/components/home/XFeed";
import ContactSignal from "@/components/home/ContactSignal";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <HomeTerminal />
      <SystemReveal />
      <StatsBar />
      <ScrollReveal />
      <AnimatedVisuals />
      <TheCrack />
      <PhotoSection />
      <WorkPreview />
      <TimelineSection />
      <SkillMatrix />
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
    <section className="bg-bat-graphite py-32 px-8 md:px-16 lg:px-24 border-t border-bat-concrete">
      <div className="max-w-6xl mx-auto">
        <div className="h-4 w-40 bg-bat-concrete animate-pulse mb-4" />
        <div className="h-16 w-64 bg-bat-concrete animate-pulse" />
      </div>
    </section>
  );
}
