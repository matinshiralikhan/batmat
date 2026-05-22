const en = {
  lang: "en",
  dir: "ltr" as "ltr" | "rtl",

  nav: {
    work: "Work",
    systems: "Systems",
    signal: "Signal",
    transmissions: "Transmissions",
    contact: "Contact",
    reading: "Reading",
    cinema: "Cinema",
    frequencies: "Frequencies",
    manifesto: "Manifesto",
    archive: "Archive",
    menu: "MENU",
    close: "CLOSE",
    quiet: "Quiet until it isn't.",
  },

  theme: {
    toLightLabel: "LIGHT",
    toDarkLabel: "DARK",
  },

  langToggle: {
    label: "FA",
  },

  hero: {
    tagline1: "Built in the dark.",
    tagline2: "Works in the light.",
    scroll: "Scroll",
  },

  manifesto: {
    eyebrow: "Manifesto — Daxson",
    title1: "THIS IS NOT",
    title2: "A PORTFOLIO.",
    intro:
      "This is a transmission. It carries a signal. The signal is not about skills or experience or impressive clients. The signal is about who built this, why, and what they refuse.",
    section1Title: "WHAT I BELIEVE",
    section1: [
      "Systems are how power operates. Understanding them is not optional for anyone who builds them.",
      "The most important infrastructure is invisible until it isn't. Build it anyway.",
      "Security is a property of every decision made before you thought about security. It cannot be added after the fact.",
      "Freedom is infrastructure. If it is not built, it does not exist. Someone has to build it.",
      "Caring too much is not a weakness. It is the only honest position available to someone who understands the stakes.",
      "Clever code is a liability. Clear code is a gift to the future.",
    ],
    section2Title: "HOW I WORK",
    section2: [
      "I do not wait to be asked. If something needs to exist, I build it.",
      "I understand what you need before you finish saying it. This is not a gift. It is the result of paying close attention for a long time.",
      "I work until it is right, not until it is done. These are different conditions and most organizations confuse them.",
      "I carry the weight of what I build. Not in the ticket system. In my actual memory, at 3am, asking whether it is holding.",
      "I manage teams and write code. Both. Anyone who tells you these activities are in conflict has not done both seriously.",
    ],
    section3Title: "WHAT I REFUSE",
    section3: [
      "I will not build surveillance tools.",
      "I will not write code that exists to control people rather than serve them.",
      "I will not produce work that requires pretending about what it does.",
      "I will not work with people who confuse arrogance with competence.",
      "I will not deliver something I am not proud of because someone needed it fast.",
      "I will not be professionally neutral about things that matter.",
    ],
    underTitle: "The thing underneath everything",
    hidden1: "EVERYONE TELLS YOU NOT TO TRY TO BE LOVED.",
    hidden2: "BUT TRY ANYWAY.",
    hidden3: "LIE, FAIL, MAKE MISTAKES IF YOU MUST —",
    hidden4: "JUST BECOME SOMEONE PEOPLE ARE PROUD TO BELIEVE IN.",
    hidden5: "THAT’S THE REAL CODE UNDERNEATH EVERYTHING.",
    endLine1: "This is not advice.",
    endLine2: "This is how I work.",
    ending: "THIS IS BATMAT.",
  },

  contact: {
    eyebrow: "Contact",
    title1: "OPEN THE",
    title2: "CHANNEL.",
    intro1:
      "Not for the usual reasons. If something here resonated — the work, the approach, the fact that a person bothered to mean something with their website — that is enough.",
    intro2:
      "Collaboration. Consultation. Conversation. I am available for the right things. I understand what you need before you finish saying it.",
    emailLabel: "Email",
    emailDesc: "For direct contact. I read everything. I respond to the ones that matter.",
    githubLabel: "GitHub",
    githubDesc: "Where the actual work lives. The public parts, at least.",
    twitterLabel: "X / Twitter",
    twitterDesc: "Thinking out loud. Occasionally precise.",
    telegramLabel: "Telegram",
    telegramDesc: "For the conversations that need to stay private.",
    availableFor: "Available for",
    availableItems: [
      "Security infrastructure consulting",
      "Go systems development",
      "Technical leadership advising",
      "Anti-censorship tooling",
      "Architecture review",
      "The right conversation",
    ],
    notAvailableFor: "Not available for",
    notAvailableDesc:
      "Things that don’t matter. Generic consulting. Projects that wouldn’t exist if someone weren’t paying for them.",
  },

  contactSignal: {
    eyebrow: "05 — Open Channel",
    title: "TRANSMIT.",
    body: "If something here resonates — the work, the approach, the uncomfortable honesty of the thing — reach out. Not for the usual reasons. For the real ones.",
    cta: "Open the channel",
    hoverHint: "[ hover to read ]",
    hidden:
      "Everyone tells you not to try to be loved. But try anyway. Lie, fail, make mistakes if you must — just become someone people are proud to believe in. That’s the real code underneath everything.",
    supportBody:
      "Some of what I build is freely available. If it has been useful to you, there is a way to say so.",
    supportCta: "Support the work →",
  },
};

export default en;
export type Translations = typeof en;
