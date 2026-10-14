import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePacks } from "../context/PacksContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Avatar from "../components/Avatar";
import Icon, { Flame, Verified } from "../components/Icon";
import { ProfilePackCard } from "../components/PackCard";
import Modal from "../components/Modal";
import Reveal from "../components/Reveal";
import EmptyState from "../components/EmptyState";
import { formatCount } from "../utils/format";

const TABS = ["My Packs", "Saved", "About"];

function PackMenu({ onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  return (
    <div className="pack-menu" ref={ref}>
      <button className="icon-btn dots" onClick={() => setOpen(!open)} aria-label="Pack options"><Icon name="dots" size={18} /></button>
      {open && (
        <div className="dropdown small">
          <button className="danger" onClick={() => { setOpen(false); onDelete(); }}><Icon name="trash" size={15} /> Delete pack</button>
        </div>
      )}
    </div>
  );
}

export default function Creator() {
  const { name } = useParams();
  const { packs, favs, getCreator, isFollowing, toggleFollow, deletePack } = usePacks();
  const { user } = useAuth();
  const toast = useToast();
  const [tab, setTab] = useState("My Packs");
  const [toDelete, setToDelete] = useState(null);

  const exists = packs.some((p) => p.creator === name) || user?.name === name;
  if (!exists) {
    return (
      <div className="container empty page-top">
        <h1>Creator not found</h1>
        <Link to="/creators" className="btn btn-primary">See all creators</Link>
      </div>
    );
  }

  const c = getCreator(name);
  const own = user?.name === name;
  const bio = own && user.bio ? user.bio : c.bio;
  const mine = packs.filter((p) => p.creator === name);
  const saved = packs.filter((p) => favs.includes(p.id));
  const following = isFollowing(name);
  const cats = [...new Set(mine.map((p) => p.category))];

  const confirm = () => {
    deletePack(toDelete.id);
    setToDelete(null);
    toast("Pack deleted");
  };

  return (
    <div className="container profile-page page-top">
      <div className="profile-card">
        <div className="banner">
          <span className="banner-flame"><Flame size={150} /></span>
        </div>
        <div className="profile-main">
          <div className="profile-avatar"><Avatar name={name} size={104} /></div>
          <div className="profile-info">
            <h1>{name} {c.verified && <Verified size={20} />}</h1>
            <p className="muted">Sticker Creator · {formatCount(c.followers)} followers</p>
            <p className="bio">{bio || "No bio yet."}</p>
          </div>
          <div className="profile-actions">
            {own ? (
              <Link to="/dashboard" className="btn btn-primary">Open dashboard</Link>
            ) : (
              <>
                <button className={"btn " + (following ? "btn-primary" : "btn-primary")} onClick={() => toggleFollow(name)}>
                  <Icon name={following ? "check" : "plus"} size={16} strokeWidth={2.6} /> {following ? "Following" : "Follow"}
                </button>
                <button className="icon-box" onClick={() => toast("Messaging opens inside SpyroChat")} aria-label="Message"><Icon name="mail" size={18} /></button>
              </>
            )}
          </div>
        </div>

        <div className="profile-stats">
          <div><strong>{c.packCount}</strong><span>Sticker Packs</span></div>
          <div><strong>{formatCount(c.followers)}</strong><span>Followers</span></div>
          <div><strong>{formatCount(c.following)}</strong><span>Following</span></div>
        </div>
      </div>

      <div className="profile-tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === "My Packs" && (
        <>
          <div className="section-head">
            <h2>{own ? "My Sticker Packs" : `${name}'s Sticker Packs`}</h2>
            <Link to="/dashboard/upload" className="btn btn-primary btn-sm"><Icon name="plus" size={15} strokeWidth={2.6} /> Upload New Pack</Link>
          </div>
          {mine.length ? (
            <div className="grid grid-3">
              {mine.map((p, i) => (
                <Reveal key={p.id} delay={i * 60}>
                  <ProfilePackCard pack={p} menu={own ? <PackMenu onDelete={() => setToDelete(p)} /> : null} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState variant="packs" title="No packs published yet" text={own ? "Upload your first sticker pack and it will appear on your profile." : `${name} hasn't published any packs yet.`} actions={[{ to: "/dashboard/upload", label: "Upload New Pack" }]} />
          )}
        </>
      )}

      {tab === "Saved" && (
        <>
          <div className="section-head"><h2>Saved Packs</h2></div>
          {!own ? (
            <EmptyState variant="private" title="Saved packs are private" text={`${name} keeps their saved packs to themselves. Save your own favourites with the heart button.`} actions={[{ to: "/stickers", label: "Browse stickers" }]} />
          ) : saved.length ? (
            <div className="grid grid-3">{saved.map((p) => <ProfilePackCard key={p.id} pack={p} />)}</div>
          ) : (
            <EmptyState variant="saved" title="Nothing saved yet" text="Tap the heart on any pack to keep it here." actions={[{ to: "/stickers", label: "Find packs to save" }]} />
          )}
        </>
      )}

      {tab === "About" && (
        <div className="about">
          <div className="panel">
            <h2>About {name}</h2>
            <p className="bio-lg">{bio || "This creator hasn't written a bio yet."}</p>
            <p className="muted">{c.handle}</p>
            {cats.length > 0 && <div className="tag-row">{cats.map((t) => <span key={t} className="tag">{t}</span>)}</div>}
          </div>
          <div className="stat-cards">
            <div><strong>{c.packCount}</strong><span>Packs</span></div>
            <div><strong>{mine.reduce((n, p) => n + p.stickers.length, 0)}</strong><span>Stickers</span></div>
            <div><strong>{formatCount(c.totalAdds)}</strong><span>Total adds</span></div>
          </div>
        </div>
      )}

      {toDelete && (
        <Modal title="Delete this pack?" onClose={() => setToDelete(null)}>
          <p className="muted">"{toDelete.name}" will be removed from the store for everyone. This can't be undone.</p>
          <div className="modal-actions">
            <button className="btn btn-outline" onClick={() => setToDelete(null)}>Cancel</button>
            <button className="btn btn-danger" onClick={confirm}>Delete</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
