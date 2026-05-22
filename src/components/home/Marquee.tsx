const words = [
  "INFRASTRUCTURE",
  "SECURITY",
  "FREEDOM",
  "SYSTEMS",
  "PRECISION",
  "SILENCE",
  "DEPTH",
  "RESISTANCE",
  "GO",
  "CONTROL",
  "ANTI-CENSORSHIP",
  "OBSESSION",
  "INTENT",
  "THE DARK",
  "INVISIBLE WORK",
];

const SEP = <span className="mx-6 text-bat-red" aria-hidden="true">—</span>;

function Track() {
  return (
    <div className="flex items-center whitespace-nowrap">
      {words.map((word, i) => (
        <span key={i} className="flex items-center">
          <span className="font-mono text-xs tracking-[0.22em] text-bat-ash">
            {word}
          </span>
          {SEP}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="w-full overflow-hidden bg-bat-graphite border-y border-bat-concrete py-4"
      aria-hidden="true"
    >
      <div className="marquee-track">
        <Track />
        <Track />
      </div>
    </div>
  );
}
