import type { Metadata } from "next";
import ToolsContent from "@/components/tools/ToolsContent";

export const metadata: Metadata = {
  title: "Tools — BATMAT",
  description: "Network diagnostics, security utilities, Linux helpers, and DevOps tools. All in-browser.",
};

export default function ToolsPage() {
  return <ToolsContent />;
}
