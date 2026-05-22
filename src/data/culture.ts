export interface Album {
  id: string;
  title: string;
  artist: string;
  year: string;
  genre: string;
  why: string;
}

export interface Film {
  id: string;
  title: string;
  director: string;
  year: string;
  why: string;
}

export const playlist: Album[] = [
  {
    id: "01",
    title: "Lift Your Skinny Fists Like Antennas to Heaven",
    artist: "Godspeed You! Black Emperor",
    year: "2000",
    genre: "post-rock",
    why: "Two hours of building toward something. Every crescendo earns itself. The loudest moments are not about volume — they're about what came before.",
  },
  {
    id: "02",
    title: "Young Team",
    artist: "Mogwai",
    year: "1997",
    genre: "post-rock",
    why: "Taught me that silence is punctuation. The quiet parts aren't waiting for the loud ones. They're the point.",
  },
  {
    id: "03",
    title: "Music for Airports",
    artist: "Brian Eno",
    year: "1978",
    genre: "ambient",
    why: "Background music that commands the foreground of your attention. The architecture of a room made audible.",
  },
  {
    id: "04",
    title: "Ágætis byrjun",
    artist: "Sigur Rós",
    year: "1999",
    genre: "ambient / post-rock",
    why: "A language invented specifically for this album. Some things cannot be said in words that already exist.",
  },
  {
    id: "05",
    title: "The Downward Spiral",
    artist: "Nine Inch Nails",
    year: "1994",
    genre: "industrial / electronic",
    why: "A concept album about collapse that doesn't romanticize it. Honest about the cost of what it describes.",
  },
  {
    id: "06",
    title: "OK Computer",
    artist: "Radiohead",
    year: "1997",
    genre: "alternative rock",
    why: "Predicted what the internet would feel like before most people had it. Systems critique disguised as pop music.",
  },
  {
    id: "07",
    title: "Dummy",
    artist: "Portishead",
    year: "1994",
    genre: "trip-hop",
    why: "The sound of 3am in a city that's still awake. Precisely the right amount of melancholy.",
  },
  {
    id: "08",
    title: "Skeleton Tree",
    artist: "Nick Cave & The Bad Seeds",
    year: "2016",
    genre: "art rock",
    why: "What grief sounds like when the person grieving refuses to look away from it.",
  },
  {
    id: "09",
    title: "Low",
    artist: "David Bowie",
    year: "1977",
    genre: "art rock / ambient",
    why: "Reinvention as a survival mechanism. Side B is pure atmosphere — one of the most underrated experimental records in existence.",
  },
  {
    id: "10",
    title: "A Moon Shaped Pool",
    artist: "Radiohead",
    year: "2016",
    genre: "alternative rock",
    why: "Water imagery throughout. The feeling of something ending quietly without fanfare.",
  },
];

export const films: Film[] = [
  {
    id: "01",
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: "2008",
    why: "Not because of the superhero. Because of what happens when the moral framework collapses and someone has to decide who they are without it.",
  },
  {
    id: "02",
    title: "Blade Runner 2049",
    director: "Denis Villeneuve",
    year: "2017",
    why: "The loneliness of consciousness without validation. The longest establishing shot in modern cinema, and every second of it earned.",
  },
  {
    id: "03",
    title: "Heat",
    director: "Michael Mann",
    year: "1995",
    why: "Two obsessives recognizing each other across the table. The costs of total commitment to a single thing.",
  },
  {
    id: "04",
    title: "Arrival",
    director: "Denis Villeneuve",
    year: "2016",
    why: "The question it asks is not 'what would you do' — it's 'would you choose to know.' Different film after you know the ending.",
  },
  {
    id: "05",
    title: "Drive",
    director: "Nicolas Winding Refn",
    year: "2011",
    why: "Almost no dialogue. Everything communicated through silence, proximity, and what is not said. The score is the interior monologue.",
  },
  {
    id: "06",
    title: "Se7en",
    director: "David Fincher",
    year: "1995",
    why: "The most uncomfortable ending in mainstream cinema. Refuses to offer catharsis because the world it depicts offers none.",
  },
  {
    id: "07",
    title: "No Country for Old Men",
    director: "Coen Brothers",
    year: "2007",
    why: "Evil as a principle, not a person. The film does not resolve because the problem it describes does not resolve.",
  },
  {
    id: "08",
    title: "The Social Network",
    director: "David Fincher",
    year: "2010",
    why: "A film about building something world-changing while destroying everything that mattered. The code is real. The cost is real.",
  },
  {
    id: "09",
    title: "Sicario",
    director: "Denis Villeneuve",
    year: "2015",
    why: "What it actually looks like when good intentions interact with broken systems. The protagonist loses. That's the point.",
  },
  {
    id: "10",
    title: "Interstellar",
    director: "Christopher Nolan",
    year: "2014",
    why: "The most emotionally precise physics lecture ever filmed. The docking scene is about more than docking.",
  },
];

export const xPosts = [
  {
    id: "1",
    content:
      "Systems don't fail because they're complex.\n\nThey fail because complexity was mistaken for sophistication.",
    timestamp: "2h",
    likes: 47,
    reposts: 12,
  },
  {
    id: "2",
    content: "Wrote 400 lines of Go today.\nDeleted 600.\n\nProductivity: undefined.",
    timestamp: "1d",
    likes: 89,
    reposts: 23,
  },
  {
    id: "3",
    content:
      'The interesting question is never "can we build this?"\n\nIt\'s always "should we?"',
    timestamp: "3d",
    likes: 134,
    reposts: 41,
  },
  {
    id: "4",
    content:
      "Security is not a layer you add.\n\nIt is a property of every decision you made before you thought about security.",
    timestamp: "5d",
    likes: 201,
    reposts: 67,
  },
];
