"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const ROUTES: Record<string, string> = {
  work: "/work",
  systems: "/systems",
  signal: "/signal",
  transmissions: "/transmissions",
  contact: "/contact",
  manifesto: "/manifesto",
  reading: "/reading",
  cinema: "/cinema",
  frequencies: "/frequencies",
  archive: "/archive",
  home: "/",
  "~": "/",
  "/": "/",
  "/work": "/work",
  "/systems": "/systems",
  "/signal": "/signal",
  "/transmissions": "/transmissions",
  "/contact": "/contact",
  "/manifesto": "/manifesto",
  "/reading": "/reading",
  "/cinema": "/cinema",
  "/frequencies": "/frequencies",
  "/archive": "/archive",
};

const LS_OUTPUT = `
<span class="text-bat-red">work/</span>        <span class="text-bat-ghost">systems/</span>     <span class="text-bat-red">signal/</span>
<span class="text-bat-ghost">transmissions/</span> <span class="text-bat-ghost">frequencies/</span> <span class="text-bat-ghost">cinema/</span>
<span class="text-bat-ghost">reading/</span>     <span class="text-bat-ghost">manifesto/</span>   <span class="text-bat-ghost">contact/</span>`.trim();

const HELP_OUTPUT = `
<span class="text-bat-red">Available commands:</span>
  <span class="text-bat-clinical">ls</span>              list pages
  <span class="text-bat-clinical">cd &lt;page&gt;</span>       navigate to page
  <span class="text-bat-clinical">whoami</span>          about Daxson
  <span class="text-bat-clinical">pwd</span>             current location
  <span class="text-bat-clinical">uname</span>           system info
  <span class="text-bat-clinical">clear</span>           clear terminal
  <span class="text-bat-clinical">ping batman</span>     you know why
  <span class="text-bat-clinical">cat manifesto</span>   read the manifesto excerpt
  <span class="text-bat-clinical">history</span>         command history`.trim();

const WHOAMI_OUTPUT = `<span class="text-bat-clinical">daxson</span>
Technical manager. Go developer. Security infrastructure engineer.
Builder of systems that run in the dark.
Anti-censorship. Anti-surveillance. Pro-craft.
<span class="text-bat-red">Obsession as method.</span>`;

const UNAME_OUTPUT = `BATMAT OS  v1.0.0  x86_64  Go/TypeScript  kernel: obsession`;

const MANIFESTO_OUTPUT = `<span class="text-bat-red">"Freedom is infrastructure.</span>
<span class="text-bat-red"> If it is not built, it does not exist.</span>
<span class="text-bat-red"> Someone has to build it."</span>
<span class="text-bat-ghost">— /manifesto</span>`;

const PING_OUTPUT = `PING batman (192.168.0.1): 56 data bytes
64 bytes from batman: icmp_seq=0 ttl=64 time=0.001 ms
64 bytes from batman: icmp_seq=1 ttl=64 time=0.001 ms
<span class="text-bat-red">--- batman ping statistics ---</span>
2 packets transmitted, 2 received, 0% packet loss
<span class="text-bat-ghost">He always answers.</span>`;

type Line = { type: "input" | "output" | "error"; content: string };

const WELCOME: Line[] = [
  { type: "output", content: `<span class="text-bat-red">BATMAT</span> terminal v1.0.0` },
  { type: "output", content: `Type <span class="text-bat-clinical">help</span> for commands. Try <span class="text-bat-clinical">cd work</span> to navigate.` },
  { type: "output", content: "" },
];

export default function HomeTerminal() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const focusInput = () => inputRef.current?.focus();

  const push = useCallback((newLines: Line[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      const inputLine: Line = { type: "input", content: raw };

      if (!cmd) { push([inputLine]); return; }

      setHistory((h) => [raw, ...h]);
      setHistIdx(-1);

      if (cmd === "clear") { setLines([...WELCOME]); return; }

      if (cmd === "ls" || cmd === "ls -la" || cmd === "ls -l") {
        push([inputLine, { type: "output", content: LS_OUTPUT }]);
        return;
      }

      if (cmd === "help" || cmd === "--help" || cmd === "-h") {
        push([inputLine, { type: "output", content: HELP_OUTPUT }]);
        return;
      }

      if (cmd === "whoami") {
        push([inputLine, { type: "output", content: WHOAMI_OUTPUT }]);
        return;
      }

      if (cmd === "pwd") {
        push([inputLine, { type: "output", content: "/home/daxson/batmat" }]);
        return;
      }

      if (cmd === "uname" || cmd === "uname -a") {
        push([inputLine, { type: "output", content: UNAME_OUTPUT }]);
        return;
      }

      if (cmd === "ping batman") {
        push([inputLine, { type: "output", content: PING_OUTPUT }]);
        return;
      }

      if (cmd === "cat manifesto") {
        push([inputLine, { type: "output", content: MANIFESTO_OUTPUT }]);
        return;
      }

      if (cmd === "history") {
        const hist = history.length
          ? history.map((c, i) => `  ${i + 1}  ${c}`).join("\n")
          : "  (no history yet)";
        push([inputLine, { type: "output", content: hist }]);
        return;
      }

      if (cmd === "date") {
        push([inputLine, { type: "output", content: new Date().toString() }]);
        return;
      }

      if (cmd === "exit" || cmd === "q") {
        push([inputLine, { type: "output", content: '<span class="text-bat-ghost">There is no exit. Only deeper in.</span>' }]);
        return;
      }

      // cd command
      if (cmd.startsWith("cd ") || cmd === "cd" || cmd === "cd~" || cmd === "cd /") {
        const arg = cmd === "cd" ? "~" : cmd.slice(3).trim();
        const target = ROUTES[arg] ?? ROUTES[arg.replace(/^\//, "")];
        if (target !== undefined) {
          push([
            inputLine,
            { type: "output", content: `<span class="text-bat-red">→</span> navigating to <span class="text-bat-clinical">${target || "/"}</span>` },
          ]);
          setTimeout(() => router.push(target || "/"), 500);
        } else {
          push([inputLine, { type: "error", content: `cd: ${arg}: no such directory` }]);
        }
        return;
      }

      push([inputLine, { type: "error", content: `command not found: ${raw.trim()}. Try <span class="text-bat-clinical">help</span>` }]);
    },
    [history, push, router]
  );

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.min(i + 1, history.length - 1);
        setInput(history[next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.max(i - 1, -1);
        setInput(next === -1 ? "" : (history[next] ?? ""));
        return next;
      });
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.toLowerCase();
      if (partial.startsWith("cd ")) {
        const arg = partial.slice(3);
        const match = Object.keys(ROUTES).find(
          (k) => k.startsWith(arg) && !k.startsWith("/") && k !== "~"
        );
        if (match) setInput(`cd ${match}`);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([...WELCOME]);
    }
  };

  return (
    <section className="bg-bat-black border-t border-bat-concrete py-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-8">
          Terminal
        </p>
        <h2 className="font-display text-4xl md:text-5xl tracking-wider text-bat-white mb-12">
          NAVIGATE THE SYSTEM.
        </h2>

        {/* Terminal window */}
        <div
          ref={containerRef}
          className="border border-bat-concrete bg-bat-graphite overflow-hidden"
          onClick={focusInput}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-bat-concrete bg-bat-dark select-none">
            <span className="w-3 h-3 rounded-full bg-bat-red/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <span className="w-3 h-3 rounded-full bg-green-500/40" />
            <span className="font-mono text-[0.6rem] tracking-[0.15em] text-bat-concrete mx-auto">
              daxson@batmat — ~/portfolio
            </span>
          </div>

          {/* Output */}
          <div className="h-72 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-0.5 scroll-smooth">
            {lines.map((line, i) => (
              <div key={i} className="flex gap-2">
                {line.type === "input" && (
                  <>
                    <span className="text-bat-red flex-shrink-0 select-none">
                      <span className="hidden sm:inline">daxson@batmat:~$</span>
                      <span className="sm:hidden">$</span>
                    </span>
                    <span className="text-bat-clinical">{line.content}</span>
                  </>
                )}
                {line.type === "output" && (
                  <span
                    className="text-bat-ash"
                    dangerouslySetInnerHTML={{ __html: line.content }}
                  />
                )}
                {line.type === "error" && (
                  <span
                    className="text-bat-red/80"
                    dangerouslySetInnerHTML={{ __html: line.content }}
                  />
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input line */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-bat-concrete">
            <span className="font-mono text-xs text-bat-red flex-shrink-0 select-none">
              <span className="hidden sm:inline">daxson@batmat:~$</span>
              <span className="sm:hidden">$</span>
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 bg-transparent font-mono text-xs text-bat-clinical outline-none caret-bat-red"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
            <span className="w-2 h-4 bg-bat-red cursor-blink flex-shrink-0" />
          </div>
        </div>

        <p className="font-mono text-2xs text-bat-concrete mt-4 tracking-widest">
          TAB to autocomplete · ↑↓ history · Ctrl+K for command palette
        </p>
      </div>
    </section>
  );
}
