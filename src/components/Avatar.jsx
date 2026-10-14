const colors = ["#14b866", "#3b82f6", "#8b5cf6", "#ff8a1f", "#ff4d79", "#0ea5a4"];

export default function Avatar({ name = "?", size = 36 }) {
  const c = colors[name.charCodeAt(0) % colors.length];
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.42, background: `linear-gradient(135deg, ${c}, #0a3d29)` }} aria-hidden="true">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
