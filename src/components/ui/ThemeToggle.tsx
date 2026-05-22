"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`font-mono text-[0.6rem] tracking-[0.22em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150 ${className}`}
    >
      {theme === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
}
