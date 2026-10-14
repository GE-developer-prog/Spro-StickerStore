import { Link, useParams } from "react-router-dom";
import { usePacks } from "../context/PacksContext";
import { useToast } from "../context/ToastContext";
import AddButton from "../components/AddButton";
import Avatar from "../components/Avatar";
import Icon, { Stars, Verified } from "../components/Icon";
import { HeartButton } from "../components/PackCard";
import Sticker from "../components/Sticker";
import Reveal from "../components/Reveal";
import EmptyState from "../components/EmptyState";
import { ReviewItem } from "./Reviews";
import { formatCount } from "../utils/format";

export default function PackDetail() {
  const { id } = useParams();
  const { packs, ratingOf, getReviews, getCreator, isFollowing, toggleFollow, likeReview, replyReview } = usePacks();
  const toast = useToast();
  const pack = packs.find((p) => p.id === id);

  if (!pack) {
    return (
      <div className="container empty page-top">
        <h1>Pack not found</h1>
        <p className="muted">It may have been removed by its creator.</p>
        <Link to="/stickers" className="btn btn-primary">Back to stickers</Link>
      </div>
    );
  }

  const { avg, count } = ratingOf(pack);
  const creator = getCreator(pack.creator);
  const reviews = getReviews(pack);
  const following = isFollowing(pack.creator);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: pack.name, url });
      else {
        await navigator.clipboard.writeText(url);
        toast("Link copied");
      }
    } catch {}
  };

  return (
    <div className="container detail page-top">
      <Link to="/stickers" className="back"><Icon name="left" size={16} /> Back to packs</Link>

      <div className="detail-top">
        <div className="detail-cover">
          <span className="spark s1"><Icon name="sparkle" size={20} fill="currentColor" /></span>
          <span className="spark s2"><Icon name="sparkle" size={14} fill="currentColor" /></span>
          <div className="detail-big"><Sticker s={pack.stickers[0]} /></div>
        </div>

        <div className="detail-info">
          <div className="detail-title">
            <h1>{pack.name}</h1>
            <HeartButton id={pack.id} />
          </div>
          <p className="creator-line">
            <Avatar name={pack.creator} size={22} /> by <Link to={`/creator/${pack.creator}`}>{pack.creator}</Link>
            {creator.verified && <Verified size={15} />}
          </p>
          <p className="desc">{pack.description}</p>
          <p className="meta big">
            <Icon name="star" size={16} fill="currentColor" className="star" />
            <b>{avg ? avg.toFixed(1) : "New"}</b>
            {count > 0 && <span>({formatCount(count)} reviews)</span>}
            <span className="dot">·</span>
            <span>{formatCount(pack.adds)} adds</span>
          </p>
          <div className="tag-row">{pack.tags?.map((t) => <span key={t} className="tag">{t}</span>)}</div>

          <div className="detail-actions">
            <AddButton pack={pack} big />
            <button className="btn btn-outline btn-lg" onClick={share}><Icon name="share" size={17} /> Share</button>
          </div>

          <div className="creator-card">
            <Avatar name={pack.creator} size={42} />
            <div>
              <strong>{pack.creator}</strong>
              <span>Sticker Creator</span>
            </div>
            <button className={"btn btn-sm " + (following ? "btn-primary" : "btn-outline-green")} onClick={() => toggleFollow(pack.creator)}>
              {following ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </div>

      <div className="section-head"><h2>Stickers in this pack ({pack.stickers.length})</h2></div>
      <div className="sticker-grid">
        {pack.stickers.map((s, i) => (
          <Reveal key={i} delay={(i % 12) * 35} className="sticker-tile"><Sticker s={s} /></Reveal>
        ))}
      </div>

      <div className="section-head">
        <h2>Reviews {count > 0 && <span className="muted">({formatCount(count)})</span>}</h2>
        <Link to={`/pack/${pack.id}/reviews`} className="link-arrow">Write a review</Link>
      </div>
      {reviews.length ? (
        <div className="review-list">
          {reviews.slice(0, 1).map((r) => <ReviewItem key={r.id} r={r} onLike={() => likeReview(pack, r.id)} onReply={(user, text) => replyReview(pack, r.id, user, text)} />)}
          {reviews.length > 1 && <Link to={`/pack/${pack.id}/reviews`} className="link-arrow center">See all reviews <Icon name="right" size={15} /></Link>}
        </div>
      ) : (
        <EmptyState compact variant="reviews" title="No reviews yet" text="Be the first to tell people what you think of this pack." actions={[{ to: `/pack/${pack.id}/reviews`, label: "Write a review" }]} />
      )}
    </div>
  );
}
