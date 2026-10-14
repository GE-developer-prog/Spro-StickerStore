import { createContext, useContext } from "react";
import { seedCreators, seedPacks, seedReviews } from "../data/seed";
import { useLocalStorage } from "../utils/storage";
import { slug } from "../utils/format";

const PacksContext = createContext(null);
export const usePacks = () => useContext(PacksContext);

export function PacksProvider({ children }) {
  const [packs, setPacks] = useLocalStorage("spyro_packs_v2", seedPacks);
  const [favs, setFavs] = useLocalStorage("spyro_favs_v3", ["seed-1", "seed-9", "seed-2", "seed-7"]);
  const [follows, setFollows] = useLocalStorage("spyro_follows_v2", []);
  const [reviewMap, setReviewMap] = useLocalStorage("spyro_reviews_v2", {});

  /* ---------- packs ---------- */
  const addPack = (data) => {
    const pack = { id: "p-" + Date.now(), rating: 0, reviewCount: 0, adds: 0, featured: false, createdAt: Date.now(), ...data };
    setPacks((p) => [pack, ...p]);
    return pack;
  };
  const deletePack = (id) => {
    setPacks((p) => p.filter((x) => x.id !== id));
    setFavs((f) => f.filter((x) => x !== id));
  };
  const countAdd = (id) => setPacks((p) => p.map((x) => (x.id === id ? { ...x, adds: x.adds + 1 } : x)));

  /* ---------- favourites (saved packs) ---------- */
  const isFav = (id) => favs.includes(id);
  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  /* ---------- creators ---------- */
  const getCreator = (name) => {
    const base = seedCreators[name] || { handle: "@" + slug(name), bio: "", followers: 0, following: 0, verified: false };
    const mine = packs.filter((p) => p.creator === name);
    return {
      name,
      ...base,
      followers: base.followers + (follows.includes(name) ? 1 : 0),
      packCount: mine.length,
      totalAdds: mine.reduce((s, p) => s + p.adds, 0),
    };
  };
  const creatorNames = [...new Set(packs.map((p) => p.creator))];
  const isFollowing = (name) => follows.includes(name);
  const toggleFollow = (name) => setFollows((f) => (f.includes(name) ? f.filter((x) => x !== name) : [...f, name]));

  /* ---------- reviews ---------- */
  const getReviews = (pack) => {
    if (reviewMap[pack.id]) return reviewMap[pack.id];
    return pack.reviewCount > 0 ? seedReviews() : [];
  };
  const saveReviews = (pack, list) => setReviewMap((m) => ({ ...m, [pack.id]: list }));

  const addReview = (pack, { user, rating, text }) => {
    const list = getReviews(pack);
    saveReviews(pack, [{ id: "r-" + Date.now(), user, rating, text, at: Date.now(), likes: 0, replies: [], mine: true }, ...list]);
  };
  const likeReview = (pack, id) =>
    saveReviews(pack, getReviews(pack).map((r) => (r.id === id ? { ...r, liked: !r.liked, likes: r.likes + (r.liked ? -1 : 1) } : r)));
  const replyReview = (pack, id, user, text) =>
    saveReviews(pack, getReviews(pack).map((r) => (r.id === id ? { ...r, replies: [...r.replies, { user, text, at: Date.now() }] } : r)));

  // average rating including reviews written on this site
  const ratingOf = (pack) => {
    const mine = getReviews(pack).filter((r) => r.mine);
    const n = pack.reviewCount + mine.length;
    if (!n) return { avg: 0, count: 0 };
    const sum = pack.rating * pack.reviewCount + mine.reduce((s, r) => s + r.rating, 0);
    return { avg: sum / n, count: n };
  };

  return (
    <PacksContext.Provider
      value={{ packs, addPack, deletePack, countAdd, favs, isFav, toggleFav, getCreator, creatorNames, isFollowing, toggleFollow, getReviews, addReview, likeReview, replyReview, ratingOf }}
    >
      {children}
    </PacksContext.Provider>
  );
}
