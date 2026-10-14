import { Link } from "react-router-dom";
import Sticker from "./Sticker";

const ART = {
  packs: [{ kind: "girl", hair: "#ff8fb8", skin: "#ffe3cf", shirt: "#14b866", mood: "happy", acc: "bow" }, { kind: "text", text: "New!", c1: "#14b866", rot: -8 }, { kind: "cat", fur: "#f5a54a", mood: "wink" }],
  saved: [{ kind: "cat", fur: "#f4efe6", mood: "happy" }, { kind: "heart", c1: "#ff4d79" }, { kind: "dog", fur: "#d9a066", mood: "wink" }],
  reviews: [{ kind: "boy", hair: "#1d1b2b", skin: "#ffe3cf", shirt: "#14b866", mood: "happy" }, { kind: "text", text: "Wow", c1: "#ff8a1f", rot: -8 }, { kind: "girl", hair: "#8b6cff", skin: "#f8cfae", shirt: "#1f2a44", mood: "shock" }],
  search: [{ kind: "cat", fur: "#9aa3ad", mood: "shock" }, { kind: "text", text: "Oops", c1: "#3b82f6", rot: 8 }, { kind: "dog", fur: "#d9a066", mood: "sad" }],
  private: [{ kind: "boy", hair: "#f4f1ea", skin: "#ffe3cf", shirt: "#1f2a44", mood: "blind" }, { kind: "text", text: "Shh", c1: "#8b5cf6", rot: -8 }, { kind: "cat", fur: "#2b2b33", mood: "cool", acc: "glasses" }],
};

// A friendly designed page for any list that has nothing in it yet
export default function EmptyState({ variant = "packs", title, text, actions = [], compact = false }) {
  return (
    <div className={"empty-state" + (compact ? " compact" : "")}>
      <div className="es-art" aria-hidden="true">
        <span className="es-blob" />
        {ART[variant].map((s, i) => (
          <div key={i} className={"es-s es-s" + (i + 1)}><Sticker s={s} /></div>
        ))}
      </div>
      <h3>{title}</h3>
      <p className="muted">{text}</p>
      {actions.length > 0 && (
        <div className="es-actions">
          {actions.map((a) => (
            <Link key={a.to} to={a.to} state={a.state} className={"btn " + (a.ghost ? "btn-outline" : "btn-primary")}>{a.label}</Link>
          ))}
        </div>
      )}
    </div>
  );
}
