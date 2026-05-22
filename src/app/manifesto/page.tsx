import type { Metadata } from "next";
import ManifestoContent from "@/components/pages/ManifestoContent";

export const metadata: Metadata = {
  title: "Manifesto — BATMAT",
  description: "What I believe. How I work. What I refuse.",
};

export default function ManifestoPage() {
  return <ManifestoContent />;
}
