import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { usePacks } from "../../context/PacksContext";
import { useToast } from "../../context/ToastContext";
import Icon from "../../components/Icon";
import Modal from "../../components/Modal";
import EmptyState from "../../components/EmptyState";
import Reveal from "../../components/Reveal";
import { PackCover } from "../../components/PackCard";
import { formatCount } from "../../utils/format";

export default function MyPacks() {
  const { user } = useAuth();
  const { packs, deletePack, ratingOf } = usePacks();
  const toast = useToast();
  const [toDelete, setToDelete] = useState(null);

  const mine = packs.filter((p) => p.creator === user.name);
  const adds = mine.reduce((s, p) => s + p.adds, 0);
  const stickers = mine.reduce((s, p) => s + p.stickers.length, 0);

  const confirm = () => {
    deletePack(toDelete.id);
    setToDelete(null);
    toast("Pack deleted");
  };

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>My Packs</h1>
          <p className="muted">Everything you've published. Delete a pack any time.</p>
        </div>
        <Link to="/dashboard/upload" className="btn btn-primary"><Icon name="plus" size={16} strokeWidth={2.6} /> Upload Pack</Link>
      </div>

      <div className="stat-cards">
        <div><strong>{mine.length}</strong><span>Packs</span></div>
        <div><strong>{stickers}</strong><span>Stickers</span></div>
        <div><strong>{formatCount(adds)}</strong><span>Total adds</span></div>
      </div>

      {mine.length ? (
        <div className="grid grid-3">
          {mine.map((p, i) => (
            <Reveal key={p.id} delay={i * 50}>
              <article className="card card-wide">
                <Link to={`/pack/${p.id}`}><PackCover pack={p} layout="wide" /></Link>
                <h3>{p.name}</h3>
                <p className="meta"><span>{p.stickers.length} stickers</span><span className="dot">·</span><span>{formatCount(p.adds)} adds</span><span className="dot">·</span>
                  <Icon name="star" size={13} fill="currentColor" className="star" /><b>{ratingOf(p).avg ? ratingOf(p).avg.toFixed(1) : "New"}</b></p>
                <div className="card-btns">
                  <Link to={`/pack/${p.id}`} className="btn btn-outline btn-sm">View</Link>
                  <button className="btn btn-danger-soft btn-sm" onClick={() => setToDelete(p)}><Icon name="trash" size={14} /> Delete</button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <EmptyState variant="packs" title="You haven't published any packs yet" text="Upload your first sticker pack and it will show up here, ready for everyone to add to SpyroChat." actions={[{ to: "/dashboard/upload", label: "Upload your first pack" }, { to: "/stickers", label: "Browse stickers", ghost: true }]} />
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
    </>
  );
}
