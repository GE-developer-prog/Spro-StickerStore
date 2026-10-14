export const CATEGORIES = [
  { name: "Anime", icon: "sparkle" },
  { name: "Memes", icon: "smile" },
  { name: "Animals", icon: "paw" },
  { name: "Cartoons", icon: "zap" },
  { name: "Gaming", icon: "gamepad" },
  { name: "Love", icon: "heart" },
];

const SKINS = ["#ffe3cf", "#f8cfae", "#e8b48c", "#b98260"];
const TEXT_COLORS = ["#14b866", "#ff4d79", "#ff8a1f", "#3b82f6", "#8b5cf6", "#0f2e22"];

const themes = {
  anime: { kinds: ["boy", "girl", "boy", "text", "girl", "boy"], hairs: ["#f4f1ea", "#1d1b2b", "#ffb02e", "#ff8fb8", "#8b6cff", "#34c58a"], moods: ["blind", "cool", "happy", "wink", "smug", "shock", "angry", "sad"], accs: ["none", "headphones", "none", "bow", "none"], shirts: ["#1f2a44", "#14b866", "#e5484d", "#4b5563"], texts: ["Nice!", "GG", "Wow", "Yes!", "OK", "Mood"] },
  cats: { kinds: ["cat"], furs: ["#f5a54a", "#9aa3ad", "#2b2b33", "#f4efe6", "#c98a5a"], moods: ["happy", "shock", "smug", "wink", "sad", "cool", "angry", "open"], accs: ["none", "glasses", "none", "none"] },
  dark: { kinds: ["boy", "girl", "boy", "girl"], hairs: ["#1d1b2b", "#2b2540", "#3a1f3d", "#f4f1ea"], moods: ["sad", "smug", "blind", "angry", "cool", "smug"], accs: ["none", "none", "headphones"], shirts: ["#111827", "#3b2a55", "#1f1f2e"] },
  tropical: { kinds: ["dog", "text", "cat", "girl", "text", "boy"], hairs: ["#ff8a1f", "#34c58a", "#ff8fb8", "#5aa9ff"], furs: ["#d9a066", "#f5a54a"], moods: ["happy", "wink", "cool", "open"], accs: ["glasses", "none", "bow"], shirts: ["#ff8a1f", "#14b866", "#3b82f6"], texts: ["Aloha", "Chill", "Summer", "Beach"] },
  naruto: { kinds: ["boy", "boy", "girl", "text"], hairs: ["#ffb02e", "#1d1b2b", "#ff8fb8", "#f4f1ea"], moods: ["happy", "angry", "wink", "shock", "open", "smug"], accs: ["headphones", "none", "none"], shirts: ["#ff8a1f", "#1f2a44", "#14b866"], texts: ["Believe it!", "Ramen", "Hokage"] },
  kawaii: { kinds: ["girl", "cat", "girl", "text", "heart", "girl"], hairs: ["#ff8fb8", "#ffd1e1", "#c9a7ff", "#9be7ff"], furs: ["#f4efe6", "#ffd1e1"], moods: ["happy", "wink", "shock", "open"], accs: ["bow", "cat-ears", "headphones", "bow"], shirts: ["#ff8fb8", "#c9a7ff", "#9be7ff"], texts: ["Kawaii", "UwU", "Yay!"] },
  gaming: { kinds: ["boy", "girl", "text", "boy", "cat"], hairs: ["#1d1b2b", "#8b6cff", "#34c58a", "#5aa9ff"], furs: ["#2b2b33", "#9aa3ad"], moods: ["cool", "angry", "smug", "shock", "happy"], accs: ["headphones", "none", "glasses"], shirts: ["#3b2a55", "#111827", "#14b866"], texts: ["GG", "Noob", "Level Up", "AFK"] },
  animals: { kinds: ["dog", "cat", "dog", "cat"], furs: ["#d9a066", "#f5a54a", "#9aa3ad", "#f4efe6", "#c98a5a"], moods: ["happy", "wink", "shock", "open", "sad", "smug"], accs: ["none", "glasses", "none"] },
  memes: { kinds: ["boy", "text", "girl", "text", "cat", "boy"], hairs: ["#1d1b2b", "#3a2a22", "#ffb02e", "#f4f1ea"], furs: ["#f5a54a", "#9aa3ad"], moods: ["shock", "smug", "sad", "happy", "angry", "open", "cool"], accs: ["none", "glasses", "none"], shirts: ["#e5484d", "#3b82f6", "#14b866", "#4b5563"], texts: ["LOL", "Bruh", "No way", "Sheesh", "Facts", "Mood", "Cap"] },
  love: { kinds: ["girl", "text", "cat", "heart", "boy", "text", "heart"], hairs: ["#ff8fb8", "#1d1b2b", "#ffb02e", "#8b6cff"], furs: ["#f4efe6", "#ffd1e1", "#f5a54a"], moods: ["happy", "wink", "open", "smug"], accs: ["bow", "none", "cat-ears"], shirts: ["#ff4d79", "#ff8fb8", "#14b866"], texts: ["Love U", "XOXO", "Miss U", "Be Mine"] },
};

// small seeded random generator so every pack looks different but stays the same on each load
function rng(seed) {
  let a = seed * 9301 + 49297;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeStickers(themeName, n, seed = 0) {
  const t = themes[themeName];
  const rand = rng(seed + 11);
  const pick = (arr) => (arr && arr.length ? arr[Math.floor(rand() * arr.length)] : undefined);
  let last = "";
  return Array.from({ length: n }, (_, k) => {
    let kind = pick(t.kinds);
    if (kind === last && t.kinds.length > 1) kind = pick(t.kinds); // avoid long repeats
    last = kind;
    return {
      kind,
      hair: pick(t.hairs),
      skin: pick(SKINS),
      shirt: pick(t.shirts),
      fur: pick(t.furs),
      mood: pick(t.moods),
      acc: pick(t.accs),
      text: pick(t.texts),
      c1: pick(TEXT_COLORS),
      rot: [-10, 6, -6, 9][k % 4],
    };
  });
}

const tagsBy = {
  Anime: ["Anime", "Manga", "Funny", "Reaction"],
  Memes: ["Memes", "Funny", "Reaction", "Chat"],
  Animals: ["Animals", "Cute", "Funny", "Pets"],
  Cartoons: ["Cartoons", "Cute", "Colorful", "Fun"],
  Gaming: ["Gaming", "Gamer", "GG", "Reaction"],
  Love: ["Love", "Cute", "Romantic", "Heart"],
};

const descBy = {
  Anime: "A collection of the best anime stickers for your daily chats. From iconic characters to funny reactions.",
  Memes: "The funniest reactions and meme moments, ready for every group chat.",
  Animals: "Cute and chaotic animals to brighten up any conversation.",
  Cartoons: "Playful cartoon stickers with a lot of personality.",
  Gaming: "Level up your chats with stickers every gamer will get.",
  Love: "Sweet little stickers for the people you care about.",
};

// name, creator, category, theme, count, rating, adds, reviews
const raw = [
  ["Anime Vibes", "Zenith", "Anime", "anime", 24, 4.8, 12400, 1200],
  ["Funny Cats", "PixelPaws", "Animals", "cats", 18, 4.7, 9860, 820],
  ["Dark Mood", "Zenith", "Anime", "dark", 20, 4.9, 10300, 960],
  ["Tropical Vibes", "SunnySticks", "Cartoons", "tropical", 16, 4.6, 7600, 540],
  ["Naruto Reactions", "Zenith", "Anime", "naruto", 15, 4.7, 8100, 690],
  ["Kawaii", "Zenith", "Cartoons", "kawaii", 18, 4.5, 6400, 430],
  ["Gaming Legends", "Zenith", "Gaming", "gaming", 22, 4.8, 9100, 780],
  ["Funny Animals", "Zenith", "Animals", "animals", 16, 4.4, 4200, 310],
  ["Naija Banter", "NaijaVibes", "Memes", "memes", 20, 4.9, 15200, 1400],
  ["Reaction Faces", "MemeLord", "Memes", "memes", 18, 4.6, 11800, 900],
  ["Love Notes", "MochiMaker", "Love", "love", 16, 4.7, 5300, 410],
  ["Good Morning", "NaijaVibes", "Love", "love", 14, 4.5, 3900, 260],
  ["Retro Arcade", "PixelPaws", "Gaming", "gaming", 20, 4.3, 2800, 190],
  ["Spooky Season", "SunnySticks", "Cartoons", "dark", 16, 4.6, 4700, 350],
  ["Football Fever", "NaijaVibes", "Memes", "memes", 18, 4.8, 13600, 1100],
  ["Study Buddies", "MochiMaker", "Cartoons", "kawaii", 12, 4.2, 1900, 120],
  ["Samurai Spirit", "SunnySticks", "Anime", "anime", 18, 4.6, 5600, 400],
  ["Pet Parade", "PixelPaws", "Animals", "animals", 18, 4.5, 3300, 240],
  ["Bestie Mode", "MochiMaker", "Love", "love", 14, 4.4, 2600, 170],
  ["Boss Level", "MemeLord", "Gaming", "gaming", 16, 4.7, 6900, 520],
];

export const seedPacks = raw.map(([name, creator, category, theme, count, rating, adds, reviewCount], i) => ({
  id: `seed-${i + 1}`,
  name,
  creator,
  category,
  tags: tagsBy[category],
  description: descBy[category],
  stickers: makeStickers(theme, count, i),
  rating,
  reviewCount,
  adds,
  featured: rating >= 4.7,
  createdAt: Date.now() - i * 86400000 * 2,
}));

export const seedCreators = {
  Zenith: { handle: "@zenith", bio: "Anime, memes and more. Just stickers. ✨", followers: 5200, following: 1400, verified: true },
  PixelPaws: { handle: "@pixelpaws", bio: "Cute pixel pets and chaotic cats.", followers: 3100, following: 220, verified: true },
  NaijaVibes: { handle: "@naijavibes", bio: "Naija banter, football and everyday gist.", followers: 8800, following: 310, verified: true },
  SunnySticks: { handle: "@sunnysticks", bio: "Bright, happy stickers for sunny chats.", followers: 1900, following: 180, verified: false },
  MochiMaker: { handle: "@mochimaker", bio: "Kawaii things made with love.", followers: 2400, following: 410, verified: false },
  MemeLord: { handle: "@memelord", bio: "Reaction faces for every situation.", followers: 4300, following: 95, verified: true },
};

const day = 86400000;
export const seedReviews = () => [
  { id: "r1", user: "DarkSoul", rating: 5, text: "This pack is fire! The stickers are high quality and work perfectly in SpyroChat. Definitely worth adding!", at: Date.now() - 2 * day, likes: 12, replies: [] },
  { id: "r2", user: "Luna_Star", rating: 5, text: "Scrolling the pack I just love the variety and the colors. Keep it up!", at: Date.now() - 4 * day, likes: 8, replies: [] },
  { id: "r3", user: "Kairo", rating: 4, text: "Great pack overall. Some stickers could be more unique, but still really good!", at: Date.now() - 7 * day, likes: 5, replies: [] },
];
