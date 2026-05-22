"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BatmarkLogo from "@/components/ui/BatmarkLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";

const mainLinks = [
  { href: "/work",          label: "Work" },
  { href: "/systems",       label: "Systems" },
  { href: "/signal",        label: "Signal" },
  { href: "/transmissions", label: "Transmissions" },
  { href: "/contact",       label: "Contact" },
];

const extraLinks = [
  { href: "/frequencies", label: "Frequencies" },
  { href: "/cinema",      label: "Cinema" },
  { href: "/reading",     label: "Reading" },
  { href: "/manifesto",   label: "Manifesto" },
  { href: "/archive",     label: "Archive" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        {/* Gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-bat-black/80 to-transparent pointer-events-none" />

        <div className="relative flex items-center justify-between px-5 sm:px-8 py-4 sm:py-6">
          <Link href="/" aria-label="BATMAT home" className="relative z-50">
            <BatmarkLogo size="small" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
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
            <div className="border-s border-bat-concrete ps-4 ms-2">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-4 relative z-50">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-bat-ghost hover:text-bat-white transition-colors p-1"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? "✕" : "MENU"}
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
        className={`fixed inset-0 bg-bat-black flex flex-col justify-end pb-12 px-6 z-40 transition-all duration-400 ${
          menuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        <nav className="flex flex-col gap-3">
          {mainLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={`font-display text-4xl sm:text-5xl tracking-wider block transition-colors duration-150 leading-tight ${
                isActive(href) ? "text-bat-red" : "text-bat-white hover:text-bat-red"
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
            >
              {label}
            </Link>
          ))}

          {/* Secondary links */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 pt-5 border-t border-bat-concrete">
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

        <p className="mt-6 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-bat-concrete">
          Quiet until it isn&apos;t.
        </p>
      </div>
    </>
  );
}
