"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function LangToggle({ className = "" }: { className?: string }) {
  const { t, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch language to ${t.lang === "en" ? "Persian" : "English"}`}
      className={`font-mono text-[0.6rem] tracking-[0.22em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150 border border-bat-concrete px-2 py-0.5 hover:border-bat-red ${className}`}
    >
      {t.langToggle.label}
    </button>
  );
}
