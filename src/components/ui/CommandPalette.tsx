"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Command {
  cmd: string;
  description: string;
  action: "navigate" | "response" | "close";
  target?: string;
  response?: string;
}

const commands: Command[] = [
  { cmd: "help",              description: "List all commands",           action: "response",  response: "Available: ls, cd <path>, whoami, ping batman, clear, exit" },
  { cmd: "ls",               description: "List all pages",              action: "response",  response: "/  /work  /systems  /signal  /transmissions  /frequencies  /cinema  /reading  /manifesto  /contact" },
  { cmd: "whoami",           description: "Identify the operator",       action: "response",  response: "Daxson. Technical manager. Go developer. Builder of infrastructure for the invisible." },
  { cmd: "cd /",            description: "Navigate to home",            action: "navigate",  target: "/" },
  { cmd: "cd /work",        description: "Navigate to work",            action: "navigate",  target: "/work" },
  { cmd: "cd /systems",     description: "Technical identity",          action: "navigate",  target: "/systems" },
  { cmd: "cd /signal",      description: "About",                       action: "navigate",  target: "/signal" },
  { cmd: "cd /transmissions", description: "Writing / blog",            action: "navigate",  target: "/transmissions" },
  { cmd: "cd /frequencies", description: "Music",                       action: "navigate",  target: "/frequencies" },
  { cmd: "cd /cinema",      description: "Films",                       action: "navigate",  target: "/cinema" },
  { cmd: "cd /reading",     description: "Reading list",                action: "navigate",  target: "/reading" },
  { cmd: "cd /manifesto",   description: "The manifesto",               action: "navigate",  target: "/manifesto" },
  { cmd: "cd /contact",     description: "Open the channel",            action: "navigate",  target: "/contact" },
  { cmd: "ping batman",     description: "Ping the signal",             action: "response",  response: "Pong. 8ms. He is watching. He is always watching." },
  { cmd: "bat-signal",      description: "Activate the signal",         action: "response",  response: "Signal activated. Someone noticed." },
  { cmd: "clear",           description: "Close palette",               action: "close" },
  { cmd: "exit",            description: "Close palette",               action: "close" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    setInput("");
    setOutput(null);
    setHistIdx(-1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const matches = input.trim()
    ? commands.filter(
        (c) =>
          c.cmd.startsWith(input.toLowerCase()) ||
          c.description.toLowerCase().includes(input.toLowerCase())
      )
    : commands.slice(0, 8);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim().toLowerCase();
      const found = commands.find((c) => c.cmd === trimmed);

      if (!found) {
        setOutput(`command not found: ${trimmed}. Type 'help' for available commands.`);
        return;
      }

      setHistory((h) => [raw, ...h]);
      setHistIdx(-1);

      if (found.action === "navigate" && found.target) {
        close();
        router.push(found.target);
      } else if (found.action === "response" && found.response) {
        setOutput(found.response);
      } else if (found.action === "close") {
        close();
      }
    },
    [close, router]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (matches.length > 0) setInput(matches[0].cmd);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 palette-backdrop bg-bat-black/60"
      onClick={(e) => e.target === e.currentTarget && close()}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="w-full max-w-2xl bg-bat-graphite border border-bat-concrete shadow-2xl">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-bat-concrete">
          <div className="w-2.5 h-2.5 rounded-full bg-bat-concrete" />
          <div className="w-2.5 h-2.5 rounded-full bg-bat-concrete" />
          <div className="w-2.5 h-2.5 rounded-full bg-bat-red" />
          <span className="font-mono text-2xs text-bat-ash ml-3 tracking-wider">
            batmat@darknet ~ cmd+k
          </span>
          <button
            onClick={close}
            className="ml-auto font-mono text-2xs text-bat-ash hover:text-bat-red transition-colors duration-150 tracking-wider"
          >
            ESC
          </button>
        </div>

        {/* Input line */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-bat-concrete">
          <span className="font-mono text-xs text-bat-red flex-shrink-0">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); setOutput(null); }}
            onKeyDown={onKeyDown}
            placeholder="type a command or search…"
            className="flex-1 bg-transparent font-mono text-sm text-bat-white placeholder-bat-concrete outline-none"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        {output && (
          <div className="px-5 py-3 border-b border-bat-concrete">
            <p className="font-mono text-xs text-bat-red leading-relaxed">{output}</p>
          </div>
        )}

        {/* Command list */}
        <div className="max-h-72 overflow-y-auto">
          {matches.length > 0 ? (
            matches.map((c) => (
              <button
                key={c.cmd}
                onClick={() => { setInput(c.cmd); runCommand(c.cmd); }}
                className="w-full flex items-center justify-between gap-4 px-5 py-3 hover:bg-bat-dark transition-colors duration-100 group text-left"
              >
                <span className="font-mono text-xs text-bat-white group-hover:text-bat-red transition-colors duration-100">
                  {c.cmd}
                </span>
                <span className="font-mono text-2xs text-bat-ash">
                  {c.description}
                </span>
              </button>
            ))
          ) : (
            <p className="px-5 py-4 font-mono text-xs text-bat-ash">
              No command matches. Try &apos;help&apos;.
            </p>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-6 px-5 py-3 border-t border-bat-concrete">
          {[
            ["↵", "run"],
            ["Tab", "autocomplete"],
            ["↑↓", "history"],
          ].map(([key, label]) => (
            <span key={key} className="flex items-center gap-1.5">
              <kbd className="font-mono text-[0.55rem] text-bat-ghost border border-bat-border px-1.5 py-0.5">
                {key}
              </kbd>
              <span className="font-mono text-2xs text-bat-ash">{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
