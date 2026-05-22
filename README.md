# BATMAT

> *Built in the dark. Works in the light.*

A cinematic personal identity site — dark, precise, post-rock-paced. This is not a portfolio. It is a transmission.

**Author:** [@matinshiralikhan](https://github.com/matinshiralikhan)

---

## What this is

BATMAT is a full personal brand site for a technical manager, Go developer, and security infrastructure engineer. It is built to carry signal, not just information — the kind of site that tells you who someone is before they say a word.

Designed with a specific psychological operating system: Batman mythology as a metaphor for building infrastructure in the dark, refusing compromise, and caring about craft more than credit.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 — CSS-first config via `@theme inline` |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth scroll | Lenis |
| Fonts | Bebas Neue · Space Mono · Inter · IRANSansX |
| Language | TypeScript |
| Runtime | React 19 (Server + Client Components) |

---

## Features

- **Bat-in-moon cursor** — a custom SVG bat inside a glowing moon that tracks the mouse, turns red on hover
- **Konami code easter egg** — `↑↑↓↓←→←→BA` triggers a full-screen identity moment
- **Command palette** — `Ctrl+K` opens a terminal-style command interface with real navigation
- **Status widget** — fixed bottom-right, shows current availability with pulsing dot
- **Text scramble hero** — the title resolves from random characters into BATMAT on load
- **GSAP scroll reveals** — scroll-triggered word-by-word animations throughout
- **GitHub heatmap** — contribution grid with red color scale
- **Light / dark mode** — theme switch with zero flash (inline CSS vars set before React hydrates)
- **Bilingual — English / Persian (FA)** — full i18n with RTL layout, IRANSansX font, translated content including the full manifesto
- **Manifesto** — full beliefs, working style, and refusals with a hidden sentence revealed on hover

### Pages

| Route | Content |
|-------|---------|
| `/` | Hero · marquee · stats · scroll reveal · GitHub panel · contact signal |
| `/work` | Projects — Meridian, Darkroom, Cartographer, Signal |
| `/systems` | Technical systems overview |
| `/signal` | About — honest biography |
| `/transmissions` | Blog — 4 essays in the BATMAT voice |
| `/transmissions/[slug]` | Individual post |
| `/frequencies` | Music that shaped the thinking |
| `/cinema` | Films that changed how I see structure |
| `/reading` | 12 annotated books |
| `/manifesto` | Beliefs · method · refusals (bilingual) |
| `/contact` | All channels — email, GitHub, X, Telegram |
| `/archive` | Older work |

---

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Persian font setup

The Persian (FA) mode uses **IRANSansX**. Download the font from [rastikerdar/iransansx](https://github.com/rastikerdar/iransansx) and place the `.woff2` / `.woff` files here:

```
public/
  fonts/
    IRANSansX/
      IRANSansXFaNum-Regular.woff2
      IRANSansXFaNum-Medium.woff2
      IRANSansXFaNum-Bold.woff2
```

Until the files are added, Persian mode falls back to Tahoma — a system font that renders Persian correctly on most devices.

---

## Theme system

Theme switching uses **inline CSS variables** set directly on `<html>` — not CSS class overrides — so they win over all stylesheet layers with zero specificity conflict.

A blocking `<script>` in `<head>` reads `localStorage` and sets the correct variables before React hydrates, eliminating any flash of wrong theme or language.

```ts
// ThemeProvider sets these on document.documentElement.style:
"--color-bat-black", "--color-bat-white", "--color-bat-ash" // etc.
```

---

## i18n

Language state lives in `LanguageProvider`. All UI text is in `src/i18n/en.ts` and `src/i18n/fa.ts`. Use the `useLanguage()` hook in any client component:

```ts
const { t, lang, toggle } = useLanguage();
// t.manifesto.section1Title → "WHAT I BELIEVE" or "باورهایم"
```

Switching to Persian also sets `dir="rtl"` on `<html>` and switches all fonts to IRANSansX via inline style.

---

## Configuration

All personal details live in one file — `src/config.ts`:

```ts
export const siteConfig = {
  name: "Daxson",
  email: "daxson-dev@gmail.com",
  github:   { username: "matinshiralikhan", url: "https://github.com/matinshiralikhan" },
  twitter:  { username: "IDaxsonI",         url: "https://x.com/IDaxsonI" },
  telegram: { username: "IDaxsonI",         url: "https://t.me/IDaxsonI" },
  status:   { state: "building", note: "Working on infrastructure you can't see yet." },
};
```

---

## Project structure

```
src/
  app/                   Next.js App Router pages
  components/
    home/                Homepage sections (Hero, Heatmap, ScrollReveal…)
    layout/              Nav
    pages/               Translated page content components
    providers/           ThemeProvider · LanguageProvider · SmoothScroll
    ui/                  CustomCursor · CommandPalette · KonamiEgg · StatusWidget…
  data/                  projects · blog · books · culture (albums, films, x posts)
  i18n/                  en.ts · fa.ts translations
  config.ts              Site-wide configuration
```

---

## License

MIT — use it, build on it, make it yours.

---

<p align="center">
  <sub>Obsession as method.</sub>
</p>
