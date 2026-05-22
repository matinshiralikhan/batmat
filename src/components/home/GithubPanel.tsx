import { siteConfig } from "@/config";
import GithubAnimated from "./GithubAnimated";

interface GithubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  updated_at: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
  fork: boolean;
}

async function getUser(): Promise<GithubUser | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${siteConfig.github.username}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${siteConfig.github.username}/repos?sort=updated&per_page=12&type=owner`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const repos: GithubRepo[] = await res.json();
    return repos.filter((r) => !r.fork).slice(0, 6);
  } catch {
    return [];
  }
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

const LANG_COLORS: Record<string, string> = {
  Go:         "#00ADD8",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python:     "#3776AB",
  Rust:       "#CE422B",
  Shell:      "#89E051",
  C:          "#555555",
  "C++":      "#F34B7D",
  Dockerfile: "#384D54",
  HTML:       "#E34C26",
  CSS:        "#563D7C",
};

function getLangColor(lang: string | null) {
  if (!lang) return "#2C2C2C";
  return LANG_COLORS[lang] ?? "#888888";
}

export default async function GithubPanel() {
  const [user, repos] = await Promise.all([getUser(), getRepos()]);

  // Build language frequency map
  const langMap: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1;
  });
  const langTotal = Object.values(langMap).reduce((a, b) => a + b, 0);
  const langs = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <section
      className="bg-bat-graphite py-32 px-8 md:px-16 lg:px-24 border-t border-bat-concrete"
      aria-label="GitHub"
    >
      <GithubAnimated>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            data-gh-heading
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <p className="font-mono text-2xs tracking-[0.25em] uppercase text-bat-red mb-4">
                GitHub — {siteConfig.github.username}
              </p>
              <h2 className="font-display text-5xl md:text-6xl text-bat-white tracking-wider leading-none">
                THE WORK
                <br />
                <span className="text-bat-ash">IN PUBLIC.</span>
              </h2>
            </div>

            {/* Stats */}
            {user && (
              <div className="flex gap-10">
                {[
                  { value: user.public_repos, label: "Repos" },
                  { value: user.followers, label: "Followers" },
                ].map(({ value, label }) => (
                  <div key={label} data-gh-stat className="flex flex-col gap-1">
                    <span className="font-display text-4xl text-bat-white">{value}</span>
                    <span className="font-mono text-2xs tracking-[0.15em] uppercase text-bat-ash">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Language breakdown bar */}
          {langs.length > 0 && (
            <div className="mb-12">
              <p className="font-mono text-2xs tracking-[0.2em] uppercase text-bat-ash mb-4">
                Languages
              </p>
              <div className="flex h-2 overflow-hidden rounded-none gap-px">
                {langs.map(([lang, count]) => (
                  <div
                    key={lang}
                    style={{
                      width: `${(count / langTotal) * 100}%`,
                      background: getLangColor(lang),
                    }}
                    title={`${lang}: ${Math.round((count / langTotal) * 100)}%`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                {langs.map(([lang, count]) => (
                  <div key={lang} className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: getLangColor(lang) }}
                    />
                    <span className="font-mono text-[0.6rem] text-bat-ghost tracking-wider">
                      {lang}
                    </span>
                    <span className="font-mono text-[0.6rem] text-bat-concrete">
                      {Math.round((count / langTotal) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Repos */}
          {repos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-bat-concrete">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  data-gh-card
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 flex flex-col gap-3 hover:bg-bat-dark transition-colors duration-200 group border-b border-r border-bat-concrete last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-sm text-bat-white group-hover:text-bat-red transition-colors duration-150 break-all">
                      {repo.name}
                    </span>
                    {repo.stargazers_count > 0 && (
                      <span className="font-mono text-2xs text-bat-ash flex-shrink-0">
                        ★ {repo.stargazers_count}
                      </span>
                    )}
                  </div>

                  {repo.description && (
                    <p className="font-body text-xs text-bat-ash leading-relaxed line-clamp-2">
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-2">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: getLangColor(repo.language) }}
                        />
                        <span className="font-mono text-2xs text-bat-ghost tracking-wider">
                          {repo.language}
                        </span>
                      </div>
                    )}
                    <span className="font-mono text-2xs text-bat-concrete tracking-wider ml-auto">
                      {timeAgo(repo.updated_at)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="border border-bat-concrete p-8">
              <p className="font-mono text-xs text-bat-ash tracking-wider">
                Repositories load from the GitHub API. Check back shortly.
              </p>
            </div>
          )}

          <div className="mt-10 flex justify-end">
            <a
              href={user?.html_url ?? `https://github.com/${siteConfig.github.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-[0.2em] uppercase text-bat-ghost hover:text-bat-red transition-colors duration-150"
            >
              View all repositories →
            </a>
          </div>
        </div>
      </GithubAnimated>
    </section>
  );
}
