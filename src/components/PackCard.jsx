import { Link } from "react-router-dom";
import Sticker from "./Sticker";
import AddButton from "./AddButton";
import Icon, { Stars } from "./Icon";
import { usePacks } from "../context/PacksContext";
import { formatCount } from "../utils/format";

const LAYOUTS = {
  square: [[2, 6, 46, -6], [50, 2, 48, 5], [4, 50, 44, 5], [52, 48, 46, -6]],
  wide: [[2, 14, 33, -5], [33, 4, 36, 4], [66, 12, 33, -4]],
};

export function PackCover({ pack, layout = "square", className = "" }) {
  const pos = LAYOUTS[layout];
  return (
    <div className={`cover ${layout} ${className}`}>
      {pack.stickers.slice(0, pos.length).map((s, i) => (
        <div key={i} className="cover-s" style={{ left: pos[i][0] + "%", top: pos[i][1] + "%", width: pos[i][2] + "%", "--r": pos[i][3] + "deg" }}>
          <Sticker s={s} />
        </div>
      ))}
    </div>
  );
}

export function HeartButton({ id }) {
  const { isFav, toggleFav } = usePacks();
  const on = isFav(id);
  return (
    <button className={"heart" + (on ? " on" : "")} onClick={() => toggleFav(id)} aria-pressed={on} aria-label={on ? "Remove from saved" : "Save pack"}>
      <Icon name="heart" size={17} fill={on ? "currentColor" : "none"} />
    </button>
  );
}

export default function PackCard({ pack }) {
  const { ratingOf } = usePacks();
  const { avg, count } = ratingOf(pack);
  return (
    <article className="card">
      <HeartButton id={pack.id} />
      <Link to={`/pack/${pack.id}`} className="card-link">
        <PackCover pack={pack} />
        <h3>{pack.name}</h3>
        <p className="by">{pack.creator}</p>
        <p className="meta">
          <Icon name="star" size={14} fill="currentColor" className="star" />
          <b>{avg ? avg.toFixed(1) : "New"}</b>
          {count > 0 && <span>({formatCount(count)})</span>}
          <span className="dot">·</span>
          <span>{formatCount(pack.adds)} adds</span>
        </p>
      </Link>
      <AddButton pack={pack} />
    </article>
  );
}

// Smaller card used on creator profiles and the dashboard
export function ProfilePackCard({ pack, menu }) {
  const { ratingOf } = usePacks();
  const { avg } = ratingOf(pack);
  return (
    <article className="card card-wide">
      <Link to={`/pack/${pack.id}`} className="card-link">
        <PackCover pack={pack} layout="wide" />
      </Link>
      <div className="card-row">
        <div>
          <h3><Link to={`/pack/${pack.id}`}>{pack.name}</Link></h3>
          <p className="meta"><span>{pack.stickers.length} stickers</span><span className="dot">·</span><span>{formatCount(pack.adds)} adds</span></p>
          <p className="meta"><Icon name="star" size={14} fill="currentColor" className="star" /><b>{avg ? avg.toFixed(1) : "New"}</b></p>
        </div>
        {menu}
      </div>
    </article>
  );
}
export { Stars };
