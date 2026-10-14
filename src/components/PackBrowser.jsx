import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { usePacks } from "../context/PacksContext";
import { CATEGORIES } from "../data/seed";
import { config } from "../config";
import PackCard from "./PackCard";
import Pagination from "./Pagination";
import Reveal from "./Reveal";
import Icon from "./Icon";
import EmptyState from "./EmptyState";

const TABS = ["Featured", "Trending", "New"];

// Tabs + category chips + grid + pagination (used on Home and on /stickers)
export default function PackBrowser({ q = "", viewAll = false }) {
  const { packs } = usePacks();
  const [tab, setTab] = useState("Featured");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [q, tab, category]);

  const list = useMemo(() => {
    let r = packs.filter((p) => {
      const text = (p.name + " " + p.creator + " " + p.category + " " + (p.tags || []).join(" ")).toLowerCase();
      return (!q || text.includes(q.toLowerCase())) && (!category || p.category === category);
    });
    if (tab === "Featured") r = [...r].sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
    if (tab === "Trending") r = [...r].sort((a, b) => b.adds - a.adds);
    if (tab === "New") r = [...r].sort((a, b) => b.createdAt - a.createdAt);
    return r;
  }, [packs, q, tab, category]);

  const pages = Math.ceil(list.length / config.PAGE_SIZE);
  const shown = list.slice((page - 1) * config.PAGE_SIZE, page * config.PAGE_SIZE);

  const changePage = (n) => {
    setPage(n);
    document.querySelector("#packs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="container browser" id="packs">
      <div className="toolbar">
        <div className="tabs" role="tablist">
          {TABS.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="chips">
          {CATEGORIES.map((c) => (
            <button key={c.name} className={category === c.name ? "active" : ""} onClick={() => setCategory(category === c.name ? "" : c.name)}>
              <Icon name={c.icon} size={15} /> {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="section-head">
        <h2>{q ? `Results for "${q}"` : `${tab} Packs`}</h2>
        {viewAll ? <Link to="/stickers" className="link-arrow">View all <Icon name="right" size={15} /></Link> : <span className="muted">{list.length} packs</span>}
      </div>

      {shown.length ? (
        <div className="grid" key={tab + category + q + page}>
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}><PackCard pack={p} /></Reveal>
          ))}
        </div>
      ) : (
        <EmptyState variant="search" title="No packs found" text="We couldn't find anything for that. Try a different search or pick another category." actions={[{ to: "/stickers", label: "See all stickers" }]} />
      )}

      <Pagination page={page} pages={pages} onChange={changePage} />
    </section>
  );
}
