"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

type Theme = "dark" | "light";

const DARK_VARS: Record<string, string> = {
  "--color-bat-black":    "#0A0A0A",
  "--color-bat-graphite": "#111111",
  "--color-bat-dark":     "#1A1A1A",
  "--color-bat-concrete": "#2C2C2C",
  "--color-bat-ash":      "#555555",
  "--color-bat-ghost":    "#888888",
  "--color-bat-white":    "#F0F0EE",
  "--color-bat-clinical": "#FAFAFA",
};

const LIGHT_VARS: Record<string, string> = {
  "--color-bat-black":    "#F0F0EE",
  "--color-bat-graphite": "#E6E6E4",
  "--color-bat-dark":     "#DCDCDA",
  "--color-bat-concrete": "#C4C4C2",
  "--color-bat-ash":      "#666666",
  "--color-bat-ghost":    "#999999",
  "--color-bat-white":    "#111111",
  "--color-bat-clinical": "#0A0A0A",
};

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  const vars = theme === "light" ? LIGHT_VARS : DARK_VARS;
  for (const [key, val] of Object.entries(vars)) {
    html.style.setProperty(key, val);
  }
  html.classList.toggle("light", theme === "light");
}

const ThemeCtx = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("batmat-theme") as Theme | null;
    const initial = saved === "light" || saved === "dark" ? saved : "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("batmat-theme", next);
      return next;
    });
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
