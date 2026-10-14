import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { usePacks } from "../../context/PacksContext";
import Avatar from "../../components/Avatar";
import { Stars } from "../../components/Icon";
import { timeAgo } from "../../utils/format";
import EmptyState from "../../components/EmptyState";

export default function MyReviews() {
  const { user } = useAuth();
  const { packs, getReviews } = usePacks();
  const rows = packs
    .filter((p) => p.creator === user.name)
    .flatMap((p) => getReviews(p).map((r) => ({ ...r, pack: p })))
    .sort((a, b) => b.at - a.at);

  return (
    <>
      <div className="dash-head"><div><h1>Reviews</h1><p className="muted">What people are saying about your packs.</p></div></div>
      {rows.length ? (
        <div className="panel review-list">
          {rows.map((r) => (
            <article key={r.pack.id + r.id} className="review">
              <Avatar name={r.user} size={42} />
              <div className="review-body">
                <div className="review-head"><strong>{r.user}</strong><span className="muted">on <Link to={`/pack/${r.pack.id}/reviews`}>{r.pack.name}</Link> · {timeAgo(r.at)}</span></div>
                <Stars value={r.rating} size={14} />
                <p>{r.text}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState variant="reviews" title="No reviews yet" text="When people review your sticker packs, their comments will show up here. Share your packs to get the first one." actions={[{ to: "/dashboard/upload", label: "Upload a pack" }, { to: "/stickers", label: "Browse stickers", ghost: true }]} />
      )}
    </>
  );
}
