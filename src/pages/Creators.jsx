import { Link } from "react-router-dom";
import { usePacks } from "../context/PacksContext";
import Avatar from "../components/Avatar";
import Reveal from "../components/Reveal";
import { Verified } from "../components/Icon";
import { formatCount } from "../utils/format";

export default function Creators() {
  const { creatorNames, getCreator } = usePacks();
  const list = creatorNames.map(getCreator).sort((a, b) => b.followers - a.followers);

  return (
    <div className="container page-top">
      <div className="page-head">
        <h1>Creators</h1>
        <p className="muted">The artists behind your favourite Spyrochat stickers.</p>
      </div>
      <div className="grid creators-grid">
        {list.map((c, i) => (
          <Reveal key={c.name} delay={i * 60}>
            <Link to={`/creator/${c.name}`} className="creator-tile">
              <Avatar name={c.name} size={72} />
              <h3>{c.name} {c.verified && <Verified size={16} />}</h3>
              <p className="muted">{c.handle}</p>
              <div className="mini-stats">
                <span><b>{c.packCount}</b> packs</span>
                <span><b>{formatCount(c.followers)}</b> followers</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
