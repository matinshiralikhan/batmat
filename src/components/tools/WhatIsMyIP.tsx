"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────
interface IPData {
  query: string;
  status: string;
  country: string;
  countryCode: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  proxy: boolean;
  hosting: boolean;
  mobile: boolean;
}

interface BrowserInfo {
  userAgent: string;
  language: string;
  languages: string[];
  screen: string;
  colorDepth: number;
  platform: string;
  vendor: string;
  doNotTrack: string;
  cookiesEnabled: boolean;
  connection: string;
  timezone: string;
  plugins: number;
  touchPoints: number;
}

interface DNSInfo {
  resolver: string | null;
}

interface WebRTCLeaks {
  ips: string[];
}

// ─── Utils ────────────────────────────────────────────────
function flag(code: string) {
  if (!code || code.length !== 2) return "🌍";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0))
  );
}

function privacyScore(data: IPData, browser: BrowserInfo, leaks: WebRTCLeaks): number {
  let score = 0;
  if (data.proxy) score += 25;
  if (data.hosting) score += 30;
  if (!data.mobile) score += 5;
  if (browser.doNotTrack === "1") score += 10;
  if (!browser.cookiesEnabled) score += 10;
  if (leaks.ips.length === 0) score += 15;
  if (browser.plugins < 3) score += 5;
  return Math.min(score, 100);
}

function scoreLabel(n: number) {
  if (n >= 80) return { label: "GHOST", color: "text-green-400", bar: "bg-green-500" };
  if (n >= 60) return { label: "PARANOID (HEALTHY)", color: "text-green-400", bar: "bg-green-500" };
  if (n >= 40) return { label: "SOMEWHAT COVERED", color: "text-yellow-400", bar: "bg-yellow-500" };
  if (n >= 20) return { label: "EXPOSED", color: "text-orange-400", bar: "bg-orange-500" };
  return { label: "COMPLETELY NAKED ONLINE", color: "text-red-400", bar: "bg-red-500" };
}

function countryRoast(code: string, name: string) {
  const map: Record<string, string> = {
    IR: "Iran 🇮🇷 — where every connection needs WireGuard and a prayer.",
    CN: "China 🇨🇳 — congratulations on escaping the Firewall. Temporarily.",
    RU: "Russia 🇷🇺 — privacy here is a suggestion, not a right.",
    US: "United States 🇺🇸 — land of the free, surveilled of the brave.",
    GB: "United Kingdom 🇬🇧 — CCTV capital. They know your face too.",
    DE: "Germany 🇩🇪 — GDPR won't save you from yourself.",
    IN: "India 🇮🇳 — 1.4 billion people and zero escape.",
    TR: "Turkey 🇹🇷 — Wikipedia was banned here. Just saying.",
    KP: "North Korea 🇰🇵 — how are you even online right now.",
    SA: "Saudi Arabia 🇸🇦 — the government called. They say hi.",
  };
  return map[code] ?? `${flag(code)} ${name} — you live there. Make of that what you will.`;
}

function ispRoast(isp: string) {
  const l = isp.toLowerCase();
  if (l.includes("cloudflare")) return "Cloudflare — you're routing through the backbone of the internet. Fancy.";
  if (l.includes("google")) return "Google — oh they definitely already know. They always know.";
  if (l.includes("amazon") || l.includes("aws")) return "Amazon AWS — VPN user or running something shady. No middle ground.";
  if (l.includes("digital ocean")) return "DigitalOcean — developer or hacktivist. Probably both.";
  if (l.includes("linode") || l.includes("akamai")) return "Linode/Akamai — solid infrastructure. Suspicious hobby.";
  if (l.includes("hetzner")) return "Hetzner — cheap servers, strong opinions.";
  if (l.includes("comcast") || l.includes("xfinity")) return "Comcast — deepest condolences. No one chooses this willingly.";
  if (l.includes("verizon")) return "Verizon — selling your data one packet at a time.";
  if (l.includes("att") || l.includes("at&t")) return "AT&T — they gave the NSA a room in their data center. Fun fact.";
  if (l.includes("mobile") || l.includes("cellular") || l.includes("wireless")) return "Mobile carrier — on the move. Still tracked. Faster, though.";
  if (l.includes("irancell") || l.includes("mci")) return "Iranian carrier — filtered, throttled, monitored. The holy trinity.";
  return `${isp} — they see every packet. They're not mad, just disappointed.`;
}

function vpnRoast(proxy: boolean, hosting: boolean) {
  if (proxy && hosting) return "PROXY + HOSTING — double wrapped, still scared. Respect.";
  if (proxy) return "PROXY ON — nice move. They still know it's you.";
  if (hosting) return "VPN / HOSTING DETECTED — hiding behind a datacenter. Smart. Cowardly. Effective.";
  return "NOTHING — exposed like a dev server in production. Bold strategy.";
}

function timeRoast() {
  const h = new Date().getHours();
  if (h >= 0 && h < 4) return "It's the middle of the night. What are you looking for at this hour.";
  if (h >= 4 && h < 7) return "Up before sunrise checking your IP. You might need help.";
  if (h >= 7 && h < 9) return "Morning. Already paranoid. Productive day incoming.";
  if (h >= 9 && h < 12) return "Work hours. This is definitely in the job description.";
  if (h >= 12 && h < 14) return "Lunch break paranoia. A balanced diet.";
  if (h >= 14 && h < 18) return "Afternoon. Procrastinating with purpose.";
  if (h >= 18 && h < 21) return "Evening. The internet is quieter. The surveillance is not.";
  return "Late night. The best work happens in the dark. Or the worst.";
}

// ─── WebRTC Leak Detector ─────────────────────────────────
async function detectWebRTCLeaks(): Promise<WebRTCLeaks> {
  return new Promise((resolve) => {
    try {
      const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
      const ips = new Set<string>();
      pc.createDataChannel("");
      pc.createOffer().then((o) => pc.setLocalDescription(o));
      const timeout = setTimeout(() => {
        pc.close();
        resolve({ ips: [...ips] });
      }, 3000);
      pc.onicecandidate = (e) => {
        if (!e.candidate) {
          clearTimeout(timeout);
          pc.close();
          resolve({ ips: [...ips] });
          return;
        }
        const match = e.candidate.candidate.match(
          /([0-9]{1,3}(?:\.[0-9]{1,3}){3}|[a-f0-9:]+:[a-f0-9:]+)/i
        );
        if (match && !match[1].startsWith("0.") && !match[1].startsWith("100.")) {
          ips.add(match[1]);
        }
      };
    } catch {
      resolve({ ips: [] });
    }
  });
}

// ─── DNS Resolver Detect ─────────────────────────────────
async function detectDNS(): Promise<DNSInfo> {
  try {
    const res = await fetch(
      "https://cloudflare-dns.com/dns-query?name=whoami.cloudflare&type=TXT",
      { headers: { Accept: "application/dns-json" } }
    );
    const data = await res.json();
    const txt = data.Answer?.[0]?.data?.replace(/"/g, "") ?? null;
    return { resolver: txt };
  } catch {
    return { resolver: null };
  }
}

// ─── Browser Info ────────────────────────────────────────
function getBrowserInfo(): BrowserInfo {
  const nav = typeof navigator !== "undefined" ? navigator : null;
  const win = typeof window !== "undefined" ? window : null;
  if (!nav || !win) return {
    userAgent: "unknown", language: "unknown", languages: [], screen: "unknown",
    colorDepth: 0, platform: "unknown", vendor: "unknown", doNotTrack: "unknown",
    cookiesEnabled: false, connection: "unknown", timezone: "unknown", plugins: 0, touchPoints: 0,
  };

  const conn = (nav as Navigator & { connection?: { effectiveType?: string; type?: string } }).connection;
  const connType = conn ? (conn.effectiveType || conn.type || "unknown") : "unknown";

  return {
    userAgent: nav.userAgent,
    language: nav.language,
    languages: [...(nav.languages ?? [])],
    screen: `${win.screen.width}×${win.screen.height}`,
    colorDepth: win.screen.colorDepth,
    platform: nav.platform,
    vendor: nav.vendor,
    doNotTrack: nav.doNotTrack ?? "unset",
    cookiesEnabled: nav.cookieEnabled,
    connection: connType,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    plugins: nav.plugins?.length ?? 0,
    touchPoints: nav.maxTouchPoints ?? 0,
  };
}

// ─── Fetch IP Data ────────────────────────────────────────
async function fetchIPData(): Promise<IPData | null> {
  try {
    const res = await fetch("/api/ip-info");
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Component ────────────────────────────────────────────
type Phase = "loading" | "loaded" | "error";

const LOADING_LINES = [
  "contacting the mothership...",
  "triangulating your position...",
  "asking nicely who you are...",
  "cross-referencing your presence...",
  "exposing your secrets...",
  "this is not optional...",
];

export default function WhatIsMyIP() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [ip, setIp] = useState<IPData | null>(null);
  const [browser, setBrowser] = useState<BrowserInfo | null>(null);
  const [dns, setDns] = useState<DNSInfo | null>(null);
  const [leaks, setLeaks] = useState<WebRTCLeaks | null>(null);
  const [loadLine, setLoadLine] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const lineInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    lineInterval.current = setInterval(() => setLoadLine((l) => (l + 1) % LOADING_LINES.length), 900);

    const run = async () => {
      const [ipData, dnsData, leakData] = await Promise.all([
        fetchIPData(),
        detectDNS(),
        detectWebRTCLeaks(),
      ]);
      const browserData = getBrowserInfo();

      if (lineInterval.current) clearInterval(lineInterval.current);

      if (!ipData || ipData.status !== "success") {
        setPhase("error");
        return;
      }

      setIp(ipData);
      setBrowser(browserData);
      setDns(dnsData);
      setLeaks(leakData);
      setPhase("loaded");

      setTimeout(() => setRevealed(true), 200);
    };

    run();
    return () => { if (lineInterval.current) clearInterval(lineInterval.current); };
  }, []);

  const score = ip && browser && leaks ? privacyScore(ip, browser, leaks) : 0;
  const scoreInfo = scoreLabel(score);

  return (
    <div className="border border-bat-concrete bg-bat-graphite overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-bat-concrete bg-bat-dark select-none">
        <span className="w-2 h-2 rounded-full bg-bat-red/80" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
        <span className="w-2 h-2 rounded-full bg-green-500/30" />
        <span className="font-mono text-[0.6rem] text-bat-ash ml-2 tracking-widest">whats-my-ip.sh</span>
        <span className="ml-auto font-mono text-[0.55rem] tracking-[0.15em] uppercase text-bat-red">LIVE</span>
      </div>

      {/* Loading */}
      {phase === "loading" && (
        <div className="p-12 flex flex-col items-center gap-6">
          <div className="font-display text-2xl md:text-4xl text-bat-white tracking-widest">
            IDENTIFYING YOU.
          </div>
          <div className="w-48 h-px bg-bat-concrete relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-bat-red animate-pulse" />
          </div>
          <p className="font-mono text-xs text-bat-ash animate-pulse">{LOADING_LINES[loadLine]}</p>
        </div>
      )}

      {/* Error */}
      {phase === "error" && (
        <div className="p-12 text-center">
          <p className="font-display text-2xl text-bat-red mb-4">COULDN&apos;T REACH THE MOTHERSHIP.</p>
          <p className="font-mono text-xs text-bat-ash">ip-api.com is down or you&apos;re truly a ghost. Respect.</p>
        </div>
      )}

      {/* Loaded */}
      {phase === "loaded" && ip && browser && dns && leaks && (
        <div className={`transition-opacity duration-700 ${revealed ? "opacity-100" : "opacity-0"}`}>

          {/* ── THE BIG REVEAL ─────────────────────────── */}
          <div className="bg-bat-black border-b border-bat-concrete px-8 py-12 text-center relative overflow-hidden">
            {/* Background glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(192,19,26,0.08) 0%, transparent 70%)" }}
            />
            <p className="font-mono text-2xs tracking-[0.3em] uppercase text-bat-ash mb-4 relative z-10">
              {timeRoast()}
            </p>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-bat-red mb-4 relative z-10">
              your f*cking ip is
            </p>
            <div className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-bat-white tracking-wider mb-4 relative z-10 glitch-text" data-text={ip.query}>
              {ip.query}
            </div>
            <p className="font-mono text-xs text-bat-ash relative z-10">
              {flag(ip.countryCode)} {ip.city}, {ip.regionName}, {ip.country}
            </p>
          </div>

          {/* ── VPN / PROXY STATUS ─────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-bat-concrete border-b border-bat-concrete">
            {[
              {
                label: "VPN",
                status: ip.hosting,
                on: "ON — hiding, sort of",
                off: "OFF — naked on the internet",
              },
              {
                label: "PROXY",
                status: ip.proxy,
                on: "ON — double-dipping, nice",
                off: "OFF — at least be consistent",
              },
              {
                label: "MOBILE",
                status: ip.mobile,
                on: "YES — on the move",
                off: "NO — at a desk, probably",
              },
            ].map(({ label, status, on, off }) => (
              <div key={label} className="px-6 py-5 flex flex-col gap-2">
                <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash">{label}</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${status ? "bg-green-400" : "bg-bat-red"}`} />
                  <span className={`font-mono text-xs ${status ? "text-green-400" : "text-bat-red"}`}>
                    {status ? "ON" : "OFF"}
                  </span>
                </div>
                <p className="font-mono text-[0.6rem] text-bat-concrete leading-relaxed">
                  {status ? on : off}
                </p>
              </div>
            ))}
          </div>

          {/* ── MAIN DATA GRID ─────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-bat-concrete border-b border-bat-concrete">

            {/* Location */}
            <div className="p-6">
              <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">Location</p>
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <Row label="IP"       val={ip.query} red />
                <Row label="Country"  val={`${flag(ip.countryCode)} ${ip.country}`} />
                <Row label="Region"   val={ip.regionName} />
                <Row label="City"     val={ip.city} />
                <Row label="ZIP"      val={ip.zip || "—"} />
                <Row label="Lat/Lon"  val={`${ip.lat.toFixed(4)}, ${ip.lon.toFixed(4)}`} dim />
                <Row label="Timezone" val={ip.timezone} dim />
              </div>
              <p className="font-mono text-[0.55rem] text-bat-concrete mt-4 leading-relaxed">
                {countryRoast(ip.countryCode, ip.country)}
              </p>
            </div>

            {/* Network */}
            <div className="p-6">
              <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">Network</p>
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <Row label="ISP"     val={ip.isp} />
                <Row label="Org"     val={ip.org || "—"} />
                <Row label="AS"      val={ip.as || "—"} dim />
                <Row label="DNS"     val={dns.resolver ?? "undetected"} red={!!dns.resolver} />
                <Row label="Type"    val={ip.hosting ? "hosting/VPN" : ip.mobile ? "mobile" : "residential"} />
              </div>
              <p className="font-mono text-[0.55rem] text-bat-concrete mt-4 leading-relaxed">
                {ispRoast(ip.isp)}
              </p>
            </div>

            {/* Browser */}
            <div className="p-6">
              <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">Browser</p>
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <Row label="Screen"   val={browser.screen} />
                <Row label="Language" val={browser.language} />
                <Row label="Platform" val={browser.platform || "—"} />
                <Row label="DNT"      val={browser.doNotTrack === "1" ? "enabled ✓" : browser.doNotTrack === "0" ? "disabled" : "unset"} red={browser.doNotTrack === "1"} />
                <Row label="Cookies"  val={browser.cookiesEnabled ? "enabled" : "disabled"} />
                <Row label="Touch"    val={browser.touchPoints > 0 ? `${browser.touchPoints} points` : "none"} dim />
                <Row label="Timezone" val={browser.timezone} dim />
              </div>
            </div>
          </div>

          {/* ── WEBRTC LEAKS ───────────────────────────── */}
          <div className="border-b border-bat-concrete px-6 py-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-2">
                  WebRTC Leak
                </p>
                {leaks.ips.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    <p className="font-mono text-xs text-red-400">
                      ⚠ LOCAL IPS EXPOSED — your VPN is leaking
                    </p>
                    {leaks.ips.map((ip) => (
                      <p key={ip} className="font-mono text-xs text-bat-red pl-4">→ {ip}</p>
                    ))}
                  </div>
                ) : (
                  <p className="font-mono text-xs text-green-400">✓ No WebRTC leaks detected</p>
                )}
              </div>
              <p className="font-mono text-[0.6rem] text-bat-concrete max-w-xs leading-relaxed">
                {leaks.ips.length > 0
                  ? "Your browser exposed your real local IP via WebRTC. This bypasses VPNs. Disable WebRTC in your browser."
                  : "WebRTC peer connection probed. No local addresses leaked. You might actually know what you're doing."}
              </p>
            </div>
          </div>

          {/* ── VPN VERDICT ────────────────────────────── */}
          <div className="border-b border-bat-concrete px-6 py-5">
            <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-2">
              Detection Summary
            </p>
            <p className="font-mono text-xs text-bat-ghost">{vpnRoast(ip.proxy, ip.hosting)}</p>
          </div>

          {/* ── USER AGENT ─────────────────────────────── */}
          <div className="border-b border-bat-concrete px-6 py-4">
            <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash mb-2">
              User-Agent — what every server sees
            </p>
            <p className="font-mono text-[0.65rem] text-bat-concrete leading-relaxed break-all">
              {browser.userAgent}
            </p>
          </div>

          {/* ── WHO ELSE KNOWS ─────────────────────────── */}
          <div className="border-b border-bat-concrete px-6 py-5">
            <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
              Who else has your IP right now
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 font-mono text-xs">
              {[
                ["Your ISP",                    "obviously. contractually."],
                ["This website",                "you came here voluntarily."],
                ["Every site you visited today","servers keep logs forever."],
                ["2–8 ad trackers",             "rough estimate. probably more."],
                ["Google",                      "even if you didn't visit google."],
                ["Your DNS resolver",           dns.resolver ? `→ ${dns.resolver}` : "unknown, which is worse"],
                [ip.hosting ? "Your VPN provider" : "Your router", ip.hosting ? "they see the real you." : "it definitely logs."],
                ["Governments",                 "if they want to. and they do."],
              ].map(([who, note]) => (
                <div key={who} className="flex gap-3">
                  <span className="text-bat-red flex-shrink-0">→</span>
                  <div>
                    <span className="text-bat-white">{who}</span>
                    <span className="text-bat-concrete ml-2">{note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── PRIVACY SCORE ──────────────────────────── */}
          <div className="px-6 py-6">
            <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-red mb-4">
              Privacy Score
            </p>
            <div className="flex items-center gap-4 mb-3 flex-wrap">
              <span className="font-display text-5xl text-bat-white">{score}</span>
              <span className={`font-mono text-xs tracking-widest uppercase ${scoreInfo.color}`}>
                {scoreInfo.label}
              </span>
            </div>
            <div className="w-full h-1 bg-bat-concrete mb-4">
              <div
                className={`h-full transition-all duration-1000 ${scoreInfo.bar}`}
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="font-mono text-[0.6rem] text-bat-concrete leading-5 space-y-0.5">
              {(
                [
                  [ip.hosting,                  "+30  VPN or hosting detected"],
                  [ip.proxy,                     "+25  Proxy layer active"],
                  [leaks.ips.length === 0,       "+15  No WebRTC leaks"],
                  [browser.doNotTrack === "1",   "+10  Do Not Track: enabled"],
                  [!browser.cookiesEnabled,      "+10  Cookies: disabled"],
                  [!ip.mobile,                   "+5   Fixed connection (not mobile)"],
                  [browser.plugins < 3,          "+5   Low plugin count"],
                ] as [boolean, string][]
              ).map(([active, note]) => (
                <div key={note} className={active ? "text-green-500/60" : "text-bat-concrete/50"}>
                  {active ? "✓" : "✗"} {note}
                </div>
              ))}
            </div>
            <p className="font-mono text-[0.6rem] text-bat-ash mt-6 max-w-xl leading-relaxed">
              This score is not scientific. It is a rough measure of how visible you are to anyone
              paying attention. A score of 100 means you&apos;re invisible, probably. A score of 0 means
              every script on every page you visited today knows where you are sleeping.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

// ─── Row helper ───────────────────────────────────────────
function Row({ label, val, red, dim }: { label: string; val: string; red?: boolean; dim?: boolean }) {
  return (
    <div className="flex gap-2 items-baseline">
      <span className="text-bat-ash w-20 flex-shrink-0 text-[0.6rem] tracking-widest uppercase">{label}</span>
      <span className={`break-all leading-tight ${red ? "text-bat-red" : dim ? "text-bat-concrete" : "text-bat-clinical"}`}>
        {val}
      </span>
    </div>
  );
}
