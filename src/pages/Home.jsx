import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PackBrowser from "../components/PackBrowser";
import Reveal from "../components/Reveal";
import Sticker from "../components/Sticker";
import Icon from "../components/Icon";
import { usePacks } from "../context/PacksContext";
import { formatCount } from "../utils/format";

const hero = {
  a: { kind: "cat", fur: "#9aa3ad", mood: "cool", acc: "glasses" },
  b: { kind: "girl", hair: "#3a2a22", skin: "#ffe3cf", shirt: "#14b866", mood: "happy", acc: "headphones" },
  c: { kind: "text", text: "Good Vibes", c1: "#14b866", rot: -12 },
  d: { kind: "girl", hair: "#1d1b2b", skin: "#ffe3cf", shirt: "#111827", mood: "smug" },
  e: { kind: "heart", c1: "#ff4d79" },
};

export default function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { packs, creatorNames } = usePacks();

  const submit = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/stickers?q=${encodeURIComponent(q.trim())}` : "/stickers");
  };

  const totalAdds = packs.reduce((s, p) => s + p.adds, 0);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <h1>Discover amazing sticker packs for Spyrochat.</h1>
            <p>Express yourself with the best stickers from our community. Add them to Spyrochat and make your chats more fun!</p>
            <form className="hero-search" onSubmit={submit}>
              <Icon name="search" size={18} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for sticker packs, creators..." aria-label="Search" />
              <button className="hero-search-btn" aria-label="Search"><Icon name="search" size={18} strokeWidth={2.5} /></button>
            </form>
            <div className="hero-stats">
              <div><strong>{packs.length}</strong><span>Packs</span></div>
              <div><strong>{creatorNames.length}</strong><span>Creators</span></div>
              <div><strong>{formatCount(totalAdds)}</strong><span>Adds</span></div>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <span className="blob" />
            <span className="spark s1"><Icon name="sparkle" size={22} fill="currentColor" /></span>
            <span className="spark s2"><Icon name="sparkle" size={16} fill="currentColor" /></span>
            <span className="spark s3"><Icon name="sparkle" size={26} fill="currentColor" /></span>
            <div className="hs hs-a"><Sticker s={hero.a} /></div>
            <div className="hs hs-b"><Sticker s={hero.b} /></div>
            <div className="hs hs-c"><Sticker s={hero.c} /></div>
            <div className="hs hs-d"><Sticker s={hero.d} /></div>
            <div className="hs hs-e"><Sticker s={hero.e} /></div>
          </div>
        </div>
      </section>

      <PackBrowser viewAll />

      <section className="container cta-wrap">
        <Reveal>
          <div className="cta">
            <div>
              <h2>Made stickers? Share them with everyone.</h2>
              <p>Publish your own pack and let the whole community add it to their Spyrochat.</p>
            </div>
            <Link to="/dashboard/upload" className="btn btn-light btn-lg">Upload a pack</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
