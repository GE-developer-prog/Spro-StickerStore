import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePacks } from "../context/PacksContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Avatar from "../components/Avatar";
import Icon, { Stars } from "../components/Icon";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import { formatCount, timeAgo } from "../utils/format";

const SPLIT = [74, 17, 4, 2, 3]; // % of 5, 4, 3, 2, 1 star reviews

export function ReviewItem({ r, onLike, onReply }) {
  const { user } = useAuth();
  const [replying, setReplying] = useState(false);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const send = (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (!text.trim()) return;
    onReply(user.name, text.trim());
    setText("");
    setReplying(false);
  };

  return (
    <article className="review">
      <Avatar name={r.user} size={42} />
      <div className="review-body">
        <div className="review-head"><strong>{r.user}</strong><span className="muted">{timeAgo(r.at)}</span></div>
        <Stars value={r.rating} size={14} />
        <p>{r.text}</p>
        <div className="review-actions">
          <button onClick={() => setReplying(!replying)}><Icon name="reply" size={14} /> Reply</button>
          <button className={r.liked ? "on" : ""} onClick={onLike}><Icon name="like" size={14} fill={r.liked ? "currentColor" : "none"} /> {r.likes}</button>
        </div>
        {r.replies.map((x, i) => (
          <div key={i} className="reply"><Avatar name={x.user} size={26} /><div><strong>{x.user}</strong> <span className="muted">{timeAgo(x.at)}</span><p>{x.text}</p></div></div>
        ))}
        {replying && (
          <form className="reply-form" onSubmit={send}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a reply..." autoFocus />
            <button className="btn btn-primary btn-sm">Send</button>
          </form>
        )}
      </div>
    </article>
  );
}

export default function Reviews() {
  const { id } = useParams();
  const { packs, ratingOf, getReviews, addReview, likeReview, replyReview } = usePacks();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [writing, setWriting] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const pack = packs.find((p) => p.id === id);
  if (!pack) return <div className="container empty page-top"><h1>Pack not found</h1></div>;

  const { avg, count } = ratingOf(pack);
  const reviews = getReviews(pack);

  const open = () => (user ? setWriting(true) : navigate("/login", { state: { from: `/pack/${id}/reviews` } }));
  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addReview(pack, { user: user.name, rating, text: text.trim() });
    setText("");
    setRating(5);
    setWriting(false);
    toast("Thanks for your review!");
  };

  return (
    <div className="container reviews-page page-top">
      <Link to={`/pack/${pack.id}`} className="back"><Icon name="left" size={16} /> Back to pack</Link>

      <div className="section-head">
        <h1>Reviews &amp; Comments</h1>
        <button className="btn btn-primary" onClick={open}><Icon name="star" size={16} /> Write a review</button>
      </div>

      <div className="rating-panel">
        <div className="rating-big">
          <strong>{avg ? avg.toFixed(1) : "–"}</strong>
          <Stars value={avg} size={20} />
          <span className="muted">{formatCount(count)} reviews</span>
        </div>
        <div className="rating-bars">
          {SPLIT.map((pct, i) => (
            <div key={i} className="bar-row">
              <span>{5 - i} <Icon name="star" size={12} fill="currentColor" className="star" /></span>
              <div className="bar"><i style={{ width: count ? pct + "%" : 0 }} /></div>
              <span className="muted">{count ? `${Math.round((count * pct) / 100)} (${pct}%)` : "0"}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="review-list">
        {reviews.length ? (
          reviews.map((r) => (
            <ReviewItem key={r.id} r={r} onLike={() => likeReview(pack, r.id)} onReply={(u, t) => replyReview(pack, r.id, u, t)} />
          ))
        ) : (
          <EmptyState compact variant="reviews" title="No reviews yet" text="Be the first to review this pack. Your words help other people find great stickers." />
        )}
      </div>

      {writing && (
        <Modal title={`Review ${pack.name}`} onClose={() => setWriting(false)}>
          <form onSubmit={submit} className="stack">
            <div className="star-pick" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} stars`} className={n <= rating ? "on" : ""}>
                  <Icon name="star" size={28} fill={n <= rating ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} maxLength={300} placeholder="What did you think of this pack?" autoFocus />
            <button className="btn btn-primary btn-block btn-lg">Post review</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
