"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import en from "@/i18n/en";
import fa from "@/i18n/fa";
import type { Translations } from "@/i18n/en";

type Lang = "en" | "fa";

const FA_FONTS = {
  "--font-body":    "'IRANSansX', 'Tahoma', system-ui, sans-serif",
  "--font-display": "'IRANSansX', system-ui, sans-serif",
  "--font-mono":    "'IRANSansX', 'Courier New', monospace",
};

function applyLang(lang: Lang) {
  const html = document.documentElement;
  html.setAttribute("lang", lang);
  html.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");

  if (lang === "fa") {
    html.classList.add("fa");
    for (const [key, val] of Object.entries(FA_FONTS)) {
      html.style.setProperty(key, val);
    }
  } else {
    html.classList.remove("fa");
    for (const key of Object.keys(FA_FONTS)) {
      html.style.removeProperty(key);
    }
  }
}

const LanguageCtx = createContext<{
  lang: Lang;
  t: Translations;
  toggle: () => void;
}>({ lang: "en", t: en, toggle: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("batmat-lang") as Lang | null;
    const initial = saved === "en" || saved === "fa" ? saved : "en";
    setLang(initial);
    applyLang(initial);
  }, []);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "fa" : "en";
      applyLang(next);
      localStorage.setItem("batmat-lang", next);
      return next;
    });
  }, []);

  const t = lang === "fa" ? fa : en;

  return (
    <LanguageCtx.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageCtx.Provider>
  );
}

export const useLanguage = () => useContext(LanguageCtx);
