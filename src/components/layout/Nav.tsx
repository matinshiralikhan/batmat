"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BatmarkLogo from "@/components/ui/BatmarkLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LangToggle from "@/components/ui/LangToggle";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const mainLinks = [
    { href: "/work", label: t.nav.work },
    { href: "/systems", label: t.nav.systems },
    { href: "/signal", label: t.nav.signal },
    { href: "/transmissions", label: t.nav.transmissions },
    { href: "/contact", label: t.nav.contact },
  ];

  const extraLinks = [
    { href: "/frequencies", label: t.nav.frequencies },
    { href: "/cinema", label: t.nav.cinema },
    { href: "/reading", label: t.nav.reading },
    { href: "/manifesto", label: t.nav.manifesto },
    { href: "/archive", label: t.nav.archive },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bat-black/70 to-transparent pointer-events-none" />

        <div className="relative flex items-center justify-between px-8 py-6">
          <Link href="/" aria-label="BATMAT home" className="relative z-50">
            <BatmarkLogo size="small" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {mainLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-mono text-[0.6rem] tracking-[0.22em] uppercase transition-colors duration-150 ${
                  isActive(href) ? "text-bat-red" : "text-bat-ghost hover:text-bat-white"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="flex items-center gap-3 ms-4 border-s border-bat-concrete ps-4">
              <ThemeToggle />
              <LangToggle />
            </div>
          </nav>

          {/* Mobile: toggles + hamburger */}
          <div className="md:hidden flex items-center gap-3 relative z-50">
            <ThemeToggle />
            <LangToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-bat-ghost hover:text-bat-white transition-colors"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.nav.close : t.nav.menu}
            >
              {menuOpen ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={`fixed inset-0 bg-bat-black flex flex-col justify-end pb-16 px-8 z-40 transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-5">
          {mainLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={`font-display text-6xl tracking-wider block transition-colors duration-150 ${
                isActive(href) ? "text-bat-red" : "text-bat-white hover:text-bat-red"
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
            >
              {label}
            </Link>
          ))}

          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4 pt-6 border-t border-bat-concrete">
            {extraLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-150 ${
                  isActive(href) ? "text-bat-red" : "text-bat-ghost hover:text-bat-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="mt-8 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-bat-concrete">
          {t.nav.quiet}
        </div>
      </div>
    </>
  );
}
