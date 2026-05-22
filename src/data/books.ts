export interface Book {
  id: string;
  title: string;
  author: string;
  year: string;
  why: string;
}

export const books: Book[] = [
  {
    id: "01",
    title: "1984",
    author: "George Orwell",
    year: "1949",
    why: "The most precise technical specification ever written for a surveillance state. Not dystopian fiction — infrastructure documentation. Read it like an engineer, not a literary critic.",
  },
  {
    id: "02",
    title: "Snow Crash",
    author: "Neal Stephenson",
    year: "1992",
    why: "Invented the metaverse before anyone had the word for it. The Deliverator scene is the best opening in science fiction. Also: the most accurate depiction of how language itself can be an exploit.",
  },
  {
    id: "03",
    title: "The Phoenix Project",
    author: "Gene Kim, Kevin Behr, George Spafford",
    year: "2013",
    why: "What happens when you treat software deployment as a physical manufacturing line. DevOps as systems thinking. If you manage engineering teams and haven't read this, you are operating blind.",
  },
  {
    id: "04",
    title: "Gödel, Escher, Bach",
    author: "Douglas Hofstadter",
    year: "1979",
    why: "Self-reference, recursion, and what it means for a system to become aware of itself. The longest and most rewarding book about consciousness ever written. Also the strangest.",
  },
  {
    id: "05",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    year: "1988",
    why: "Bad design is never the user's fault. Applies to doors, APIs, security systems, organizations, relationships. Once you see affordances and signifiers, you cannot stop seeing them.",
  },
  {
    id: "06",
    title: "Brave New World",
    author: "Aldous Huxley",
    year: "1932",
    why: "The dystopia we actually built. Control through comfort rather than fear. Read next to 1984 — together they describe the full range of how freedom ends.",
  },
  {
    id: "07",
    title: "Meditations",
    author: "Marcus Aurelius",
    year: "~170–180 AD",
    why: "Private writing never meant to be published, by a man with more power than he wanted. The best kind of philosophy: functional, not performative. He was asking himself the same questions you are.",
  },
  {
    id: "08",
    title: "The Shallows",
    author: "Nicholas Carr",
    year: "2010",
    why: "What the internet is doing to the architecture of how we think. Essential reading before building anything that lives there. We optimized for engagement. We destroyed attention.",
  },
  {
    id: "09",
    title: "An Introduction to General Systems Thinking",
    author: "Gerald Weinberg",
    year: "1975",
    why: "Everything is a system. This book teaches you to see them. Once you read it, you stop troubleshooting symptoms and start understanding structure. Required reading for anyone who builds anything.",
  },
  {
    id: "10",
    title: "Zero to One",
    author: "Peter Thiel",
    year: "2014",
    why: "I disagree with half of it. That is exactly why it is valuable. The chapter on competition as ideology is the most important piece of business writing of the last 20 years.",
  },
  {
    id: "11",
    title: "Invisible Cities",
    author: "Italo Calvino",
    year: "1972",
    why: "55 cities that are all the same city. A meditation on memory, desire, and what we build and why. Not a systems book. Somehow explains systems better than most systems books.",
  },
  {
    id: "12",
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    year: "1999",
    why: "The craft, not the framework. Still the most honest book about what good software engineering actually requires day to day. Everything in it has aged better than most code written the year it was published.",
  },
];
