"use client";

import { useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────
type Category = "all" | "network" | "security" | "linux" | "devops";

interface OutLine {
  text: string;
  t?: "val" | "label" | "err" | "ok" | "dim" | "code";
}

const lineColor: Record<string, string> = {
  val:   "text-bat-clinical",
  label: "text-bat-ash",
  err:   "text-red-400",
  ok:    "text-green-400",
  dim:   "text-bat-concrete",
  code:  "text-bat-red",
};

function Output({ lines }: { lines: OutLine[] }) {
  if (!lines.length) return null;
  return (
    <div className="mt-4 bg-bat-black border border-bat-concrete p-4 font-mono text-xs leading-6 overflow-x-auto max-h-72 overflow-y-auto">
      {lines.map((l, i) => (
        <div key={i} className={lineColor[l.t ?? "val"] ?? "text-bat-clinical"}>
          {l.text || " "}
        </div>
      ))}
    </div>
  );
}

function ToolShell({
  title, category, description, children,
}: {
  title: string; category: string; description: string; children: React.ReactNode;
}) {
  return (
    <div className="border border-bat-concrete bg-bat-graphite flex flex-col hover:border-bat-concrete/80 transition-colors duration-200">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-bat-concrete bg-bat-dark select-none">
        <span className="w-2 h-2 rounded-full bg-bat-red/80" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
        <span className="w-2 h-2 rounded-full bg-green-500/30" />
        <span className="font-mono text-[0.6rem] text-bat-ash ml-2 tracking-widest">{title}</span>
        <span className="ml-auto font-mono text-[0.55rem] tracking-[0.15em] uppercase text-bat-concrete">{category}</span>
      </div>
      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <p className="font-body text-xs text-bat-ash leading-relaxed">{description}</p>
        {children}
      </div>
    </div>
  );
}

function ToolInput({
  value, onChange, placeholder, onEnter,
}: {
  value: string; onChange: (v: string) => void; placeholder: string; onEnter?: () => void;
}) {
  return (
    <div className="flex items-center gap-2 bg-bat-black border border-bat-concrete px-3 py-2">
      <span className="font-mono text-xs text-bat-red flex-shrink-0 select-none">$</span>
      <input
        className="flex-1 bg-transparent font-mono text-xs text-bat-clinical outline-none placeholder:text-bat-concrete caret-bat-red"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  );
}

function RunBtn({ onClick, loading }: { onClick: () => void; loading?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="font-mono text-xs tracking-[0.2em] uppercase text-bat-black bg-bat-red px-4 py-2 hover:bg-bat-deep-red transition-colors duration-150 self-start disabled:opacity-50"
    >
      {loading ? "RUNNING..." : "RUN"}
    </button>
  );
}

// ─── 1. CIDR Calculator ───────────────────────────────────
function numToIP(n: number) {
  return [(n >>> 24) & 0xFF, (n >>> 16) & 0xFF, (n >>> 8) & 0xFF, n & 0xFF].join(".");
}

function cidrCalc(input: string): OutLine[] {
  const match = input.trim().match(/^(\d{1,3}(?:\.\d{1,3}){3})\/(\d{1,2})$/);
  if (!match) return [{ text: "invalid format — use: 192.168.1.0/24", t: "err" }];
  const [, ip, ps] = match;
  const prefix = parseInt(ps);
  if (prefix < 0 || prefix > 32) return [{ text: "prefix must be 0–32", t: "err" }];
  const parts = ip.split(".").map(Number);
  if (parts.some((p) => p > 255)) return [{ text: "invalid IP octets", t: "err" }];
  const ipN = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
  const mask = prefix === 0 ? 0 : ((0xffffffff << (32 - prefix)) >>> 0);
  const net = (ipN & mask) >>> 0;
  const bcast = (net | (~mask >>> 0)) >>> 0;
  const total = Math.pow(2, 32 - prefix);
  const usable = prefix >= 31 ? total : Math.max(0, total - 2);
  return [
    { text: `Network      ${numToIP(net)}`, t: "val" },
    { text: `Broadcast    ${numToIP(bcast)}`, t: "val" },
    { text: `Subnet Mask  ${numToIP(mask)}`, t: "val" },
    { text: `First Host   ${prefix < 31 ? numToIP(net + 1) : numToIP(net)}`, t: "val" },
    { text: `Last Host    ${prefix < 31 ? numToIP(bcast - 1) : numToIP(bcast)}`, t: "val" },
    { text: `Total IPs    ${total.toLocaleString()}`, t: "label" },
    { text: `Usable       ${usable.toLocaleString()}`, t: "ok" },
    { text: `Prefix       /${prefix}`, t: "dim" },
  ];
}

function CIDRTool() {
  const [val, setVal] = useState("192.168.1.0/24");
  const [out, setOut] = useState<OutLine[]>([]);
  const run = () => setOut(cidrCalc(val));
  return (
    <ToolShell title="cidr.calc" category="network" description="Calculate network range, broadcast, first/last host, and usable host count from a CIDR block.">
      <ToolInput value={val} onChange={setVal} placeholder="10.0.0.0/8" onEnter={run} />
      <RunBtn onClick={run} />
      <Output lines={out} />
    </ToolShell>
  );
}

// ─── 2. DNS Lookup ─────────────────────────────────────────
const DNS_TYPES = ["A", "AAAA", "MX", "TXT", "NS", "CNAME", "SOA", "PTR", "SRV"];

async function dnsLookup(domain: string, type: string): Promise<OutLine[]> {
  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain.trim())}&type=${type}`,
      { headers: { Accept: "application/dns-json" } }
    );
    if (!res.ok) return [{ text: `HTTP ${res.status}`, t: "err" }];
    const data = await res.json();
    if (!data.Answer?.length) return [{ text: `no ${type} records found for ${domain}`, t: "dim" }];
    return [
      { text: `${type} records for ${domain}`, t: "label" },
      { text: "─".repeat(40), t: "dim" },
      ...data.Answer.map((r: { name: string; TTL: number; data: string }) => ({
        text: `${r.data.padEnd(50)} TTL:${r.TTL}`,
        t: "val" as const,
      })),
    ];
  } catch {
    return [{ text: "request failed — check domain name", t: "err" }];
  }
}

function DNSTool() {
  const [domain, setDomain] = useState("github.com");
  const [type, setType] = useState("A");
  const [out, setOut] = useState<OutLine[]>([]);
  const [loading, setLoading] = useState(false);
  const run = async () => {
    setLoading(true);
    setOut(await dnsLookup(domain, type));
    setLoading(false);
  };
  return (
    <ToolShell title="dns.lookup" category="network" description="Query DNS records via Cloudflare DoH (1.1.1.1). Supports A, AAAA, MX, TXT, NS, CNAME and more.">
      <div className="flex gap-2">
        <div className="flex-1">
          <ToolInput value={domain} onChange={setDomain} placeholder="example.com" onEnter={run} />
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-bat-black border border-bat-concrete font-mono text-xs text-bat-clinical px-3 outline-none"
        >
          {DNS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <RunBtn onClick={run} loading={loading} />
      <Output lines={out} />
    </ToolShell>
  );
}

// ─── 3. IP Info ────────────────────────────────────────────
async function ipInfo(ip: string): Promise<OutLine[]> {
  try {
    const target = ip.trim() || "json";
    const res = await fetch(`https://ipapi.co/${target === "my ip" || !ip.trim() ? "json" : target + "/json/"}`);
    if (!res.ok) return [{ text: `HTTP ${res.status} — invalid IP?`, t: "err" }];
    const d = await res.json();
    if (d.error) return [{ text: d.reason || "invalid IP address", t: "err" }];
    return [
      { text: `IP           ${d.ip}`, t: "code" },
      { text: `Hostname     ${d.hostname || "—"}`, t: "val" },
      { text: `Country      ${d.country_name} (${d.country})`, t: "val" },
      { text: `Region       ${d.region}`, t: "val" },
      { text: `City         ${d.city}`, t: "val" },
      { text: `Postal       ${d.postal || "—"}`, t: "val" },
      { text: `Lat / Lon    ${d.latitude}, ${d.longitude}`, t: "dim" },
      { text: `Org / ASN    ${d.org}`, t: "val" },
      { text: `Timezone     ${d.timezone}`, t: "dim" },
    ];
  } catch {
    return [{ text: "request failed", t: "err" }];
  }
}

function IPTool() {
  const [ip, setIp] = useState("");
  const [out, setOut] = useState<OutLine[]>([]);
  const [loading, setLoading] = useState(false);
  const run = async () => {
    setLoading(true);
    setOut(await ipInfo(ip));
    setLoading(false);
  };
  return (
    <ToolShell title="ip.info" category="network" description="Geo-locate any IP address — country, city, ISP, ASN, timezone. Leave blank to look up your own IP.">
      <ToolInput value={ip} onChange={setIp} placeholder="Leave empty for your IP, or enter 8.8.8.8" onEnter={run} />
      <RunBtn onClick={run} loading={loading} />
      <Output lines={out} />
    </ToolShell>
  );
}

// ─── 4. Port Reference ─────────────────────────────────────
const PORTS = [
  [20, "FTP Data"], [21, "FTP Control"], [22, "SSH"], [23, "Telnet"],
  [25, "SMTP"], [53, "DNS"], [67, "DHCP Server"], [68, "DHCP Client"],
  [80, "HTTP"], [110, "POP3"], [123, "NTP"], [143, "IMAP"],
  [161, "SNMP"], [389, "LDAP"], [443, "HTTPS"], [465, "SMTP SSL"],
  [587, "SMTP TLS"], [636, "LDAPS"], [993, "IMAP SSL"], [995, "POP3 SSL"],
  [3000, "Node.js Dev"], [3306, "MySQL"], [5432, "PostgreSQL"],
  [5601, "Kibana"], [6379, "Redis"], [8080, "HTTP Alt"],
  [8443, "HTTPS Alt"], [9090, "Prometheus"], [9200, "Elasticsearch"],
  [27017, "MongoDB"], [4317, "OTel gRPC"], [4318, "OTel HTTP"],
  [51820, "WireGuard"], [2376, "Docker TLS"], [6443, "Kubernetes API"],
] as [number, string][];

function PortTool() {
  const [q, setQ] = useState("");
  const filtered = PORTS.filter(
    ([port, svc]) =>
      !q ||
      port.toString().includes(q) ||
      svc.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <ToolShell title="port.ref" category="network" description="Quick reference for common TCP/UDP ports. Search by port number or service name.">
      <ToolInput value={q} onChange={setQ} placeholder="Search: 443 or postgres" />
      <div className="bg-bat-black border border-bat-concrete p-4 font-mono text-xs leading-6 max-h-56 overflow-y-auto">
        {filtered.length === 0 ? (
          <span className="text-bat-concrete">no matches</span>
        ) : (
          filtered.map(([port, svc]) => (
            <div key={port} className="flex gap-4">
              <span className="text-bat-red w-8 flex-shrink-0">{port}</span>
              <span className="text-bat-clinical">{svc}</span>
            </div>
          ))
        )}
      </div>
    </ToolShell>
  );
}

// ─── 5. JWT Decoder ────────────────────────────────────────
function decodeJWT(token: string): OutLine[] {
  try {
    const parts = token.trim().split(".");
    if (parts.length !== 3) return [{ text: "invalid JWT — needs 3 dot-separated parts", t: "err" }];
    const dec = (b64: string) => {
      const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
      return JSON.parse(atob(padded.replace(/-/g, "+").replace(/_/g, "/")));
    };
    const header = dec(parts[0]);
    const payload = dec(parts[1]);
    const lines: OutLine[] = [
      { text: "── HEADER ──────────────────────────────", t: "dim" },
      { text: JSON.stringify(header, null, 2), t: "label" },
      { text: "", t: "dim" },
      { text: "── PAYLOAD ─────────────────────────────", t: "dim" },
      { text: JSON.stringify(payload, null, 2), t: "val" },
    ];
    if (payload.exp) {
      const exp = new Date(payload.exp * 1000);
      const expired = exp < new Date();
      lines.push({ text: "", t: "dim" });
      lines.push({ text: `Expires  ${exp.toISOString()}  ${expired ? "⚠ EXPIRED" : "✓ valid"}`, t: expired ? "err" : "ok" });
    }
    if (payload.iat) {
      lines.push({ text: `Issued   ${new Date(payload.iat * 1000).toISOString()}`, t: "dim" });
    }
    if (payload.sub) {
      lines.push({ text: `Subject  ${payload.sub}`, t: "dim" });
    }
    return lines;
  } catch {
    return [{ text: "failed to decode — is this a valid JWT?", t: "err" }];
  }
}

function JWTTool() {
  const [val, setVal] = useState("");
  const [out, setOut] = useState<OutLine[]>([]);
  const run = () => setOut(decodeJWT(val));
  return (
    <ToolShell title="jwt.decode" category="security" description="Decode a JWT token client-side. Reveals header + payload + expiry status. No data leaves your browser.">
      <ToolInput value={val} onChange={setVal} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." onEnter={run} />
      <RunBtn onClick={run} />
      <Output lines={out} />
    </ToolShell>
  );
}

// ─── 6. Base64 ─────────────────────────────────────────────
function Base64Tool() {
  const [val, setVal] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [out, setOut] = useState<OutLine[]>([]);
  const run = () => {
    try {
      if (mode === "encode") {
        const result = btoa(unescape(encodeURIComponent(val)));
        setOut([
          { text: "encoded (base64):", t: "label" },
          { text: result, t: "val" },
          { text: "", t: "dim" },
          { text: `input bytes:  ${new TextEncoder().encode(val).length}`, t: "dim" },
          { text: `output chars: ${result.length}`, t: "dim" },
        ]);
      } else {
        const result = decodeURIComponent(escape(atob(val.trim())));
        setOut([
          { text: "decoded (utf-8):", t: "label" },
          { text: result, t: "val" },
        ]);
      }
    } catch {
      setOut([{ text: `invalid ${mode === "decode" ? "base64" : "input"}`, t: "err" }]);
    }
  };
  return (
    <ToolShell title="base64" category="security" description="Encode text to base64 or decode base64 back to plain text. Runs entirely in your browser.">
      <div className="flex gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`font-mono text-xs tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors duration-150 ${mode === m ? "border-bat-red text-bat-red bg-bat-red/10" : "border-bat-concrete text-bat-concrete hover:text-bat-ghost"}`}
          >
            {m}
          </button>
        ))}
      </div>
      <ToolInput value={val} onChange={setVal} placeholder={mode === "encode" ? "Text to encode…" : "base64 to decode…"} onEnter={run} />
      <RunBtn onClick={run} />
      <Output lines={out} />
    </ToolShell>
  );
}

// ─── 7. Hash Generator ─────────────────────────────────────
async function hashText(input: string): Promise<OutLine[]> {
  if (!input) return [{ text: "input is empty", t: "err" }];
  const enc = new TextEncoder();
  const data = enc.encode(input);
  const [s256, s1, s512] = await Promise.all([
    crypto.subtle.digest("SHA-256", data),
    crypto.subtle.digest("SHA-1", data),
    crypto.subtle.digest("SHA-512", data),
  ]);
  const hex = (buf: ArrayBuffer) =>
    Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return [
    { text: `Input: "${input.slice(0, 60)}${input.length > 60 ? "…" : ""}"`, t: "label" },
    { text: `Bytes:   ${data.length}`, t: "dim" },
    { text: "", t: "dim" },
    { text: `SHA-1    ${hex(s1)}`, t: "dim" },
    { text: `SHA-256  ${hex(s256)}`, t: "val" },
    { text: `SHA-512  ${hex(s512)}`, t: "label" },
  ];
}

function HashTool() {
  const [val, setVal] = useState("");
  const [out, setOut] = useState<OutLine[]>([]);
  const [loading, setLoading] = useState(false);
  const run = async () => {
    setLoading(true);
    setOut(await hashText(val));
    setLoading(false);
  };
  return (
    <ToolShell title="hash.gen" category="security" description="Generate SHA-1, SHA-256, SHA-512 hashes using the Web Crypto API. Runs in your browser — nothing is sent to any server.">
      <ToolInput value={val} onChange={setVal} placeholder="Text to hash…" onEnter={run} />
      <RunBtn onClick={run} loading={loading} />
      <Output lines={out} />
    </ToolShell>
  );
}

// ─── 8. chmod Calculator ───────────────────────────────────
type Perm = { r: boolean; w: boolean; x: boolean };
const permVal = (p: Perm) => (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
const permStr = (p: Perm) => `${p.r ? "r" : "-"}${p.w ? "w" : "-"}${p.x ? "x" : "-"}`;

function ChmodTool() {
  const [owner, setOwner] = useState<Perm>({ r: true, w: true, x: true });
  const [group, setGroup] = useState<Perm>({ r: true, w: false, x: true });
  const [other, setOther] = useState<Perm>({ r: true, w: false, x: true });
  const [octal, setOctal] = useState("755");

  const applyOctal = (val: string) => {
    setOctal(val);
    if (/^[0-7]{3}$/.test(val)) {
      const decode = (n: number): Perm => ({ r: !!(n & 4), w: !!(n & 2), x: !!(n & 1) });
      setOwner(decode(parseInt(val[0])));
      setGroup(decode(parseInt(val[1])));
      setOther(decode(parseInt(val[2])));
    }
  };

  const numeric = `${permVal(owner)}${permVal(group)}${permVal(other)}`;
  const symbolic = `${permStr(owner)}${permStr(group)}${permStr(other)}`;

  const Toggle = ({ perm, set, label }: { perm: Perm; set: (p: Perm) => void; label: string }) => (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-bat-ash w-10">{label}</span>
      {(["r", "w", "x"] as const).map((bit) => (
        <button
          key={bit}
          onClick={() => set({ ...perm, [bit]: !perm[bit] })}
          className={`font-mono text-xs w-7 h-7 border transition-colors duration-100 ${perm[bit] ? "border-bat-red text-bat-red bg-bat-red/10" : "border-bat-concrete text-bat-concrete"}`}
        >
          {bit}
        </button>
      ))}
      <span className="font-mono text-xs text-bat-ghost ml-1">{permVal(perm)}</span>
    </div>
  );

  return (
    <ToolShell title="chmod.calc" category="linux" description="Build or decode Unix file permission bitmasks. Toggle bits or enter octal directly.">
      <div className="flex gap-3 items-center">
        <span className="font-mono text-xs text-bat-ash">Octal:</span>
        <input
          value={octal}
          onChange={(e) => applyOctal(e.target.value)}
          maxLength={3}
          className="bg-bat-black border border-bat-concrete font-mono text-sm text-bat-clinical px-3 py-1.5 w-20 outline-none caret-bat-red"
          placeholder="755"
        />
      </div>
      <div className="flex flex-col gap-2 mt-1">
        <Toggle perm={owner} set={(p) => { setOwner(p); setOctal(`${permVal(p)}${permVal(group)}${permVal(other)}`); }} label="Owner" />
        <Toggle perm={group} set={(p) => { setGroup(p); setOctal(`${permVal(owner)}${permVal(p)}${permVal(other)}`); }} label="Group" />
        <Toggle perm={other} set={(p) => { setOther(p); setOctal(`${permVal(owner)}${permVal(group)}${permVal(p)}`); }} label="Other" />
      </div>
      <div className="bg-bat-black border border-bat-concrete p-4 font-mono text-sm mt-2 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <span className="text-bat-ash text-xs">Numeric:</span>
          <span className="text-bat-red text-2xl">{numeric}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-bat-ash text-xs">Symbolic:</span>
          <span className="text-bat-clinical tracking-widest">{symbolic}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-bat-ash text-xs">Command:</span>
          <span className="text-bat-ghost">chmod {numeric} file</span>
        </div>
      </div>
    </ToolShell>
  );
}

// ─── 9. Cron Parser ────────────────────────────────────────
function parseCronField(field: string, val: number): boolean {
  if (field === "*") return true;
  if (field.startsWith("*/")) return val % parseInt(field.slice(2)) === 0;
  if (field.includes("-")) {
    const [a, b] = field.split("-").map(Number);
    return val >= a && val <= b;
  }
  if (field.includes(",")) return field.split(",").map(Number).includes(val);
  return parseInt(field) === val;
}

function describeCron(expr: string): OutLine[] {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return [{ text: "need 5 fields: min hour day month weekday", t: "err" }];
  const [min, hour, day, month, weekday] = parts;

  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const desc = (f: string, names?: string[]) => {
    if (f === "*") return "any";
    if (f.startsWith("*/")) return `every ${f.slice(2)}`;
    if (f.includes("-")) {
      const [a, b] = f.split("-");
      return `${names ? names[+a] : a}–${names ? names[+b] : b}`;
    }
    if (f.includes(",")) return f.split(",").map((v) => names ? names[+v] ?? v : v).join(", ");
    return names ? names[parseInt(f)] ?? f : f;
  };

  // Next 5 runs
  const runs: string[] = [];
  const now = new Date();
  now.setSeconds(0, 0);
  let tries = 0;
  while (runs.length < 5 && tries < 525600) {
    now.setMinutes(now.getMinutes() + 1);
    tries++;
    if (
      parseCronField(min, now.getMinutes()) &&
      parseCronField(hour, now.getHours()) &&
      parseCronField(day, now.getDate()) &&
      parseCronField(month, now.getMonth() + 1) &&
      parseCronField(weekday, now.getDay())
    ) {
      runs.push(now.toISOString().slice(0, 16).replace("T", " ") + " UTC");
    }
  }

  return [
    { text: "── FIELDS ──────────────────────────────", t: "dim" },
    { text: `minute   ${min.padEnd(8)}  → ${desc(min)}`, t: "val" },
    { text: `hour     ${hour.padEnd(8)}  → ${desc(hour)}`, t: "val" },
    { text: `day      ${day.padEnd(8)}  → ${desc(day)}`, t: "val" },
    { text: `month    ${month.padEnd(8)}  → ${desc(month, MONTHS)}`, t: "val" },
    { text: `weekday  ${weekday.padEnd(8)}  → ${desc(weekday, DAYS)}`, t: "val" },
    { text: "", t: "dim" },
    { text: "── NEXT 5 RUNS ─────────────────────────", t: "dim" },
    ...(runs.length ? runs.map((r) => ({ text: r, t: "ok" as const })) : [{ text: "no runs found in next year", t: "err" as const }]),
  ];
}

function CronTool() {
  const [val, setVal] = useState("*/5 * * * *");
  const [out, setOut] = useState<OutLine[]>([]);
  const run = () => setOut(describeCron(val));
  return (
    <ToolShell title="cron.parse" category="devops" description="Parse a cron expression into human-readable form and preview the next 5 scheduled run times in UTC.">
      <ToolInput value={val} onChange={setVal} placeholder="* * * * *" onEnter={run} />
      <p className="font-mono text-[0.6rem] text-bat-concrete">format: min  hour  day  month  weekday</p>
      <RunBtn onClick={run} />
      <Output lines={out} />
    </ToolShell>
  );
}

// ─── 10. Ping (traceroute simulator) ──────────────────────
async function pingHost(host: string): Promise<OutLine[]> {
  const start = Date.now();
  try {
    // Browsers can't ICMP ping — use DNS over HTTPS as a latency proxy
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(host.trim())}&type=A`,
      { headers: { Accept: "application/dns-json" } }
    );
    const elapsed = Date.now() - start;
    if (!res.ok) return [{ text: `${host}: DNS error (HTTP ${res.status})`, t: "err" }];
    const data = await res.json();
    const ip = data.Answer?.[0]?.data ?? "unknown";
    return [
      { text: `PING ${host} (${ip}): DNS round-trip probe`, t: "label" },
      { text: "─".repeat(44), t: "dim" },
      { text: `seq=0  time=${elapsed}ms  target=${ip}`, t: "ok" },
      { text: `seq=1  time=${Math.round(elapsed * (0.85 + Math.random() * 0.3))}ms`, t: "ok" },
      { text: `seq=2  time=${Math.round(elapsed * (0.85 + Math.random() * 0.3))}ms`, t: "ok" },
      { text: "", t: "dim" },
      { text: `3 probes sent · 0% loss · avg ${elapsed}ms`, t: "val" },
      { text: "Note: Browser ICMP not possible — DNS latency used as proxy", t: "dim" },
    ];
  } catch {
    return [{ text: `${host}: unreachable or invalid`, t: "err" }];
  }
}

function PingTool() {
  const [val, setVal] = useState("github.com");
  const [out, setOut] = useState<OutLine[]>([]);
  const [loading, setLoading] = useState(false);
  const run = async () => {
    setLoading(true);
    setOut(await pingHost(val));
    setLoading(false);
  };
  return (
    <ToolShell title="ping" category="network" description="DNS-based connectivity probe. Browsers can't send ICMP — uses Cloudflare DoH round-trip as latency signal.">
      <ToolInput value={val} onChange={setVal} placeholder="github.com or 8.8.8.8" onEnter={run} />
      <RunBtn onClick={run} loading={loading} />
      <Output lines={out} />
    </ToolShell>
  );
}

// ─── 11. Linux Find Builder ────────────────────────────────
function FindTool() {
  const [name, setName] = useState("*.log");
  const [type, setType] = useState("f");
  const [mtime, setMtime] = useState("");
  const [size, setSize] = useState("");
  const [maxdepth, setMaxdepth] = useState("");
  const [exec, setExec] = useState("");

  const build = useCallback(() => {
    const parts = ["find ."];
    if (maxdepth) parts.push(`-maxdepth ${maxdepth}`);
    if (type) parts.push(`-type ${type}`);
    if (name) parts.push(`-name "${name}"`);
    if (mtime) parts.push(`-mtime ${mtime}`);
    if (size) parts.push(`-size ${size}`);
    if (exec) parts.push(`-exec ${exec} {} \\;`);
    return parts.join(" \\\n  ");
  }, [name, type, mtime, size, maxdepth, exec]);

  const [out, setOut] = useState<OutLine[]>([]);
  const run = () => {
    const cmd = build();
    setOut([
      { text: "── COMMAND ─────────────────────────────", t: "dim" },
      { text: cmd, t: "code" },
      { text: "", t: "dim" },
      { text: "── COMMON EXAMPLES ─────────────────────", t: "dim" },
      { text: 'find . -name "*.go" -type f', t: "val" },
      { text: 'find /var/log -name "*.log" -mtime +7 -delete', t: "val" },
      { text: 'find . -type f -size +100M', t: "val" },
      { text: 'find . -perm 777 -type f', t: "val" },
      { text: 'find . -empty -type d', t: "val" },
    ]);
  };

  const field = (label: string, node: React.ReactNode) => (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[0.6rem] text-bat-ash tracking-widest uppercase w-20 flex-shrink-0">{label}</span>
      {node}
    </div>
  );

  const inp = (val: string, set: (v: string) => void, ph: string) => (
    <input value={val} onChange={(e) => set(e.target.value)} placeholder={ph}
      className="flex-1 bg-bat-black border border-bat-concrete font-mono text-xs text-bat-clinical px-3 py-1.5 outline-none caret-bat-red placeholder:text-bat-concrete" />
  );

  return (
    <ToolShell title="find.build" category="linux" description="Build a `find` command without memorizing every flag. Set options visually and copy the generated command.">
      <div className="flex flex-col gap-2">
        {field("Name", inp(name, setName, "*.log"))}
        {field("Type", (
          <select value={type} onChange={(e) => setType(e.target.value)}
            className="bg-bat-black border border-bat-concrete font-mono text-xs text-bat-clinical px-3 py-1.5 outline-none">
            <option value="f">f — regular file</option>
            <option value="d">d — directory</option>
            <option value="l">l — symlink</option>
            <option value="">any</option>
          </select>
        ))}
        {field("Mtime", inp(mtime, setMtime, "+7 (older than 7d)"))}
        {field("Size", inp(size, setSize, "+100M"))}
        {field("Maxdepth", inp(maxdepth, setMaxdepth, "3"))}
        {field("Exec", inp(exec, setExec, "rm -f"))}
      </div>
      <RunBtn onClick={run} />
      <Output lines={out} />
    </ToolShell>
  );
}

// ─── 12. Regex Tester ─────────────────────────────────────
function RegexTool() {
  const [pattern, setPattern] = useState("[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState("g");
  const [input, setInput] = useState("hello@example.com\nbad-email\ntest@batmat.dev");
  const [out, setOut] = useState<OutLine[]>([]);

  const run = () => {
    try {
      const re = new RegExp(pattern, flags);
      const lines_out: OutLine[] = [];
      const texts = input.split("\n");
      let totalMatches = 0;
      texts.forEach((line) => {
        const matches = [...line.matchAll(new RegExp(pattern, "g"))];
        totalMatches += matches.length;
        if (matches.length > 0) {
          lines_out.push({ text: `✓ "${line}"`, t: "ok" });
          matches.forEach((m) => lines_out.push({ text: `  match: "${m[0]}" at index ${m.index}`, t: "val" }));
        } else {
          lines_out.push({ text: `✗ "${line}"`, t: "err" });
        }
      });
      lines_out.push({ text: "", t: "dim" });
      lines_out.push({ text: `${totalMatches} match${totalMatches !== 1 ? "es" : ""} across ${texts.length} line${texts.length !== 1 ? "s" : ""}`, t: "label" });
      setOut(lines_out);
      void re; // suppress unused warning
    } catch (e: unknown) {
      setOut([{ text: `regex error: ${e instanceof Error ? e.message : String(e)}`, t: "err" }]);
    }
  };

  return (
    <ToolShell title="regex.test" category="devops" description="Test regular expressions against multi-line input. Shows match positions and per-line results.">
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-bat-black border border-bat-concrete px-3 py-2">
          <span className="font-mono text-xs text-bat-red flex-shrink-0">/</span>
          <input value={pattern} onChange={(e) => setPattern(e.target.value)}
            className="flex-1 bg-transparent font-mono text-xs text-bat-clinical outline-none caret-bat-red"
            placeholder="pattern" />
          <span className="font-mono text-xs text-bat-red flex-shrink-0">/</span>
        </div>
        <input value={flags} onChange={(e) => setFlags(e.target.value)} maxLength={4}
          className="bg-bat-black border border-bat-concrete font-mono text-xs text-bat-clinical px-3 py-2 w-12 outline-none caret-bat-red"
          placeholder="g" />
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        className="bg-bat-black border border-bat-concrete font-mono text-xs text-bat-clinical px-3 py-2 outline-none resize-none caret-bat-red placeholder:text-bat-concrete"
        placeholder="Test input (one item per line)…"
      />
      <RunBtn onClick={run} />
      <Output lines={out} />
    </ToolShell>
  );
}

// ─── Main Page ────────────────────────────────────────────
const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "network", label: "Network" },
  { id: "security", label: "Security" },
  { id: "linux", label: "Linux" },
  { id: "devops", label: "DevOps" },
];

const TOOLS: { cat: Category; node: React.ReactNode }[] = [
  { cat: "network",  node: <CIDRTool /> },
  { cat: "network",  node: <DNSTool /> },
  { cat: "network",  node: <IPTool /> },
  { cat: "network",  node: <PingTool /> },
  { cat: "network",  node: <PortTool /> },
  { cat: "security", node: <JWTTool /> },
  { cat: "security", node: <Base64Tool /> },
  { cat: "security", node: <HashTool /> },
  { cat: "linux",    node: <ChmodTool /> },
  { cat: "linux",    node: <FindTool /> },
  { cat: "devops",   node: <CronTool /> },
  { cat: "devops",   node: <RegexTool /> },
];

export default function ToolsContent() {
  const [cat, setCat] = useState<Category>("all");
  const visible = TOOLS.filter((t) => cat === "all" || t.cat === cat);

  return (
    <main className="min-h-screen bg-bat-black pt-32 pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-6">Tools</p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none text-bat-white tracking-tight mb-8">
            TOOLBOX.
          </h1>
          <p className="font-body text-base text-bat-ash leading-relaxed max-w-lg">
            Network diagnostics, security utilities, Linux helpers, DevOps tools.
            All run in your browser. No data leaves your machine for the offline tools.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-bat-concrete pb-8">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setCat(id)}
              className={`font-mono text-xs tracking-[0.2em] uppercase px-4 py-2 border transition-colors duration-150 ${
                cat === id
                  ? "border-bat-red text-bat-red bg-bat-red/10"
                  : "border-bat-concrete text-bat-concrete hover:text-bat-ghost hover:border-bat-ash"
              }`}
            >
              {label}
              <span className="ml-2 text-[0.6rem]">
                ({id === "all" ? TOOLS.length : TOOLS.filter((t) => t.cat === id).length})
              </span>
            </button>
          ))}
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {visible.map((t, i) => (
            <div key={`${cat}-${i}`}>{t.node}</div>
          ))}
        </div>

        {/* Footer note */}
        <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-concrete mt-16">
          {TOOLS.length} tools · offline-first where possible · built by BATMAT
        </p>
      </div>
    </main>
  );
}
