// Hand-drawn style sticker characters made with SVG (no image files needed).
const INK = "#1c1b2e";

function Face({ mood = "happy", cx = 50, ey = 52, my = 65, blush = true }) {
  const lx = cx - 13;
  const rx = cx + 13;
  const arc = (x) => (
    <path d={`M${x - 6} ${ey + 2} Q${x} ${ey - 6} ${x + 6} ${ey + 2}`} stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
  );
  const eye = (x, r = 4.4) => (
    <g>
      <ellipse cx={x} cy={ey} rx={r} ry={r * 1.3} fill={INK} />
      <circle cx={x + 1.4} cy={ey - 2} r={r * 0.36} fill="#fff" />
    </g>
  );
  const smile = <path d={`M${cx - 6} ${my} Q${cx} ${my + 6} ${cx + 6} ${my}`} stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />;
  const open = <path d={`M${cx - 7} ${my - 1} Q${cx} ${my + 11} ${cx + 7} ${my - 1} Z`} fill="#8a2433" stroke={INK} strokeWidth="2" strokeLinejoin="round" />;
  const smirk = <path d={`M${cx - 6} ${my + 1} Q${cx + 2} ${my + 5} ${cx + 7} ${my - 2}`} stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />;
  let eyes = (<>{eye(lx)}{eye(rx)}</>);
  let mouth = smile;

  if (mood === "happy") { eyes = <>{arc(lx)}{arc(rx)}</>; mouth = open; }
  if (mood === "wink") { eyes = <>{arc(lx)}{eye(rx)}</>; mouth = open; }
  if (mood === "open") { mouth = open; }
  if (mood === "cool") {
    eyes = (
      <g>
        <rect x={lx - 10} y={ey - 6} width="19" height="12" rx="4.5" fill={INK} />
        <rect x={rx - 9} y={ey - 6} width="19" height="12" rx="4.5" fill={INK} />
        <path d={`M${lx + 8} ${ey - 3} H${rx - 8}`} stroke={INK} strokeWidth="2.6" />
        <path d={`M${lx - 6} ${ey - 3} l5 0 M${rx - 5} ${ey - 3} l5 0`} stroke="#fff" strokeWidth="1.8" strokeLinecap="round" opacity=".7" />
      </g>
    );
    mouth = smirk;
  }
  if (mood === "blind") {
    eyes = (
      <g>
        <rect x={cx - 28} y={ey - 8} width="56" height="15" rx="7" fill={INK} />
        <path d={`M${cx - 20} ${ey - 4} l8 0`} stroke="#fff" strokeWidth="1.8" strokeLinecap="round" opacity=".5" />
      </g>
    );
    mouth = smirk;
  }
  if (mood === "smug") {
    eyes = (
      <g stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d={`M${lx - 6} ${ey} Q${lx} ${ey + 5} ${lx + 6} ${ey}`} />
        <path d={`M${rx - 6} ${ey} Q${rx} ${ey + 5} ${rx + 6} ${ey}`} />
      </g>
    );
    mouth = smirk;
  }
  if (mood === "sad") {
    eyes = (
      <g>
        {eye(lx)}{eye(rx)}
        <path d={`M${lx - 7} ${ey - 9} L${lx + 5} ${ey - 12} M${rx + 7} ${ey - 9} L${rx - 5} ${ey - 12}`} stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      </g>
    );
    mouth = <path d={`M${cx - 6} ${my + 3} Q${cx} ${my - 3} ${cx + 6} ${my + 3}`} stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />;
  }
  if (mood === "angry") {
    eyes = (
      <g>
        {eye(lx, 3.8)}{eye(rx, 3.8)}
        <path d={`M${lx - 8} ${ey - 12} L${lx + 5} ${ey - 6} M${rx + 8} ${ey - 12} L${rx - 5} ${ey - 6}`} stroke={INK} strokeWidth="3" strokeLinecap="round" />
      </g>
    );
    mouth = <path d={`M${cx - 6} ${my + 3} Q${cx} ${my - 2} ${cx + 6} ${my + 3}`} stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />;
  }
  if (mood === "shock") {
    const big = (x) => (
      <g>
        <circle cx={x} cy={ey} r="6.4" fill="#fff" stroke={INK} strokeWidth="2" />
        <circle cx={x} cy={ey} r="2.6" fill={INK} />
      </g>
    );
    eyes = <>{big(lx)}{big(rx)}</>;
    mouth = <ellipse cx={cx} cy={my + 3} rx="4" ry="5.5" fill="#8a2433" stroke={INK} strokeWidth="2" />;
  }

  return (
    <g>
      {blush && (
        <g fill="#ff8fa8" opacity=".55">
          <ellipse cx={lx - 4} cy={ey + 9} rx="4.5" ry="2.8" />
          <ellipse cx={rx + 4} cy={ey + 9} rx="4.5" ry="2.8" />
        </g>
      )}
      {eyes}
      {mouth}
    </g>
  );
}

function Headphones({ y = 48 }) {
  return (
    <g>
      <path d={`M22 ${y} C20 14 80 14 78 ${y}`} stroke="#14b866" strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="15" y={y - 6} width="12" height="22" rx="6" fill="#0f2e22" />
      <rect x="73" y={y - 6} width="12" height="22" rx="6" fill="#0f2e22" />
      <rect x="18" y={y - 2} width="5" height="14" rx="2.5" fill="#14b866" />
      <rect x="77" y={y - 2} width="5" height="14" rx="2.5" fill="#14b866" />
    </g>
  );
}

function Bow({ x = 70, y = 20 }) {
  return (
    <g fill="#ff5c8a">
      <path d={`M${x} ${y} L${x - 12} ${y - 8} L${x - 12} ${y + 8} Z`} />
      <path d={`M${x} ${y} L${x + 12} ${y - 8} L${x + 12} ${y + 8} Z`} />
      <circle cx={x} cy={y} r="3.6" fill="#d83a6a" />
    </g>
  );
}

function Boy({ s }) {
  const { hair = INK, skin = "#ffe3cf", shirt = "#1f2a44", mood, acc } = s;
  return (
    <g>
      <path d="M20 52 C16 22 34 8 50 10 C66 8 84 22 80 52 Z" fill={hair} />
      <path d="M16 100 C16 82 32 78 50 78 C68 78 84 82 84 100 Z" fill={shirt} />
      <path d="M44 80 L50 90 L56 80 Z" fill="#fff" opacity=".85" />
      <rect x="43" y="68" width="14" height="14" rx="5" fill={skin} />
      <rect x="43" y="68" width="14" height="14" rx="5" fill="#000" opacity=".1" />
      <path d="M26 50 C26 31 36 23 50 23 C64 23 74 31 74 50 C74 66 64 77 50 77 C36 77 26 66 26 50 Z" fill={skin} />
      <path d="M23 48 L19 30 L33 34 L32 14 L44 26 L52 8 L58 26 L70 14 L69 32 L81 30 L77 48 C74 38 64 34 50 36 C36 34 26 38 23 48 Z" fill={hair} />
      <path d="M32 34 L40 30 M58 30 L68 33" stroke="#000" strokeOpacity=".12" strokeWidth="3" strokeLinecap="round" />
      <Face mood={mood} ey={55} my={67} />
      {acc === "headphones" && <Headphones y={50} />}
    </g>
  );
}

function Girl({ s }) {
  const { hair = INK, skin = "#ffe3cf", shirt = "#14b866", mood, acc } = s;
  return (
    <g>
      <path d="M17 62 C12 22 30 6 50 6 C70 6 88 22 83 62 L86 98 L14 98 Z" fill={hair} />
      <path d="M22 100 C22 84 34 80 50 80 C66 80 78 84 78 100 Z" fill={shirt} />
      <rect x="44" y="68" width="12" height="14" rx="5" fill={skin} />
      <rect x="44" y="68" width="12" height="14" rx="5" fill="#000" opacity=".1" />
      <path d="M27 50 C27 32 37 24 50 24 C63 24 73 32 73 50 C73 66 64 77 50 77 C36 77 27 66 27 50 Z" fill={skin} />
      <path d="M24 52 C22 28 38 18 50 20 C62 18 78 28 76 52 C72 40 64 34 56 32 C48 38 34 38 24 52 Z" fill={hair} />
      <path d="M44 22 C46 30 40 34 34 36" stroke="#000" strokeOpacity=".1" strokeWidth="3" fill="none" />
      <Face mood={mood} ey={54} my={66} />
      {acc === "headphones" && <Headphones y={48} />}
      {acc === "bow" && <Bow x={68} y={20} />}
      {acc === "cat-ears" && (
        <g fill={hair}>
          <path d="M26 30 L24 6 L42 20 Z" />
          <path d="M74 30 L76 6 L58 20 Z" />
          <path d="M28 24 L28 12 L36 19 Z M72 24 L72 12 L64 19 Z" fill="#ff8fa8" />
        </g>
      )}
    </g>
  );
}

function Cat({ s }) {
  const { fur = "#f5a54a", mood, acc } = s;
  return (
    <g>
      <path d="M20 46 L22 10 L46 28 Z" fill={fur} />
      <path d="M80 46 L78 10 L54 28 Z" fill={fur} />
      <path d="M26 36 L26 20 L38 29 Z M74 36 L74 20 L62 29 Z" fill="#ff9bb3" />
      <ellipse cx="50" cy="58" rx="33" ry="28" fill={fur} />
      <ellipse cx="50" cy="68" rx="15" ry="11" fill="#fff" opacity=".7" />
      <path d="M44 32 V40 M50 30 V39 M56 32 V40" stroke="#000" strokeOpacity=".18" strokeWidth="3" strokeLinecap="round" />
      <Face mood={mood} ey={55} my={69} />
      <path d="M46 63 H54 L50 67 Z" fill="#ff7a9a" />
      <path d="M12 60 L26 62 M12 68 L26 66 M88 60 L74 62 M88 68 L74 66" stroke={INK} strokeWidth="1.8" strokeLinecap="round" opacity=".6" />
      {acc === "glasses" && (
        <g>
          <circle cx="37" cy="55" r="9" fill="#9be7ff" fillOpacity=".4" stroke={INK} strokeWidth="2.4" />
          <circle cx="63" cy="55" r="9" fill="#9be7ff" fillOpacity=".4" stroke={INK} strokeWidth="2.4" />
          <path d="M46 55 H54" stroke={INK} strokeWidth="2.4" />
        </g>
      )}
    </g>
  );
}

function Dog({ s }) {
  const { fur = "#d9a066", mood, acc } = s;
  return (
    <g>
      <ellipse cx="22" cy="50" rx="12" ry="26" fill="#6b4226" transform="rotate(14 22 50)" />
      <ellipse cx="78" cy="50" rx="12" ry="26" fill="#6b4226" transform="rotate(-14 78 50)" />
      <ellipse cx="50" cy="52" rx="29" ry="29" fill={fur} />
      <ellipse cx="50" cy="66" rx="17" ry="13" fill="#fff" opacity=".8" />
      <Face mood={mood} ey={50} my={72} blush={false} />
      <ellipse cx="50" cy="62" rx="6" ry="4.4" fill={INK} />
      <ellipse cx="48.5" cy="60.8" rx="1.8" ry="1" fill="#fff" opacity=".7" />
      {(mood === "happy" || mood === "wink" || mood === "open") && <path d="M45 76 Q50 90 55 76 Z" fill="#ff7a9a" />}
      {acc === "glasses" && (
        <g>
          <rect x="24" y="43" width="22" height="13" rx="5" fill={INK} />
          <rect x="54" y="43" width="22" height="13" rx="5" fill={INK} />
          <path d="M46 47 H54" stroke={INK} strokeWidth="2.6" />
        </g>
      )}
    </g>
  );
}

function Txt({ s }) {
  const { text = "Nice!", c1 = "#14b866", rot = -8 } = s;
  const lines = text.split(" ");
  const longest = Math.max(...lines.map((l) => l.length));
  const fs = longest <= 3 ? 34 : longest <= 5 ? 28 : 22;
  const lh = fs * 1.05;
  const startY = 50 - ((lines.length - 1) * lh) / 2;
  return (
    <g transform={`rotate(${rot} 50 50)`}>
      <text textAnchor="middle" dominantBaseline="central" fontFamily="'Plus Jakarta Sans','Nunito',system-ui,sans-serif" fontWeight="900" fontStyle="italic" fontSize={fs} fill={c1} stroke="#0a3d29" strokeWidth="2.2" paintOrder="stroke" strokeLinejoin="round">
        {lines.map((l, i) => (
          <tspan key={i} x="50" y={startY + i * lh}>{l}</tspan>
        ))}
      </text>
    </g>
  );
}

function Heart({ s }) {
  return (
    <g>
      <path d="M50 86 C14 58 12 30 32 24 C42 21 48 28 50 34 C52 28 58 21 68 24 C88 30 86 58 50 86 Z" fill={s.c1 || "#ff4d79"} />
      <path d="M30 34 C34 28 40 28 43 32" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".7" />
    </g>
  );
}

export default function StickerArt({ s }) {
  const body = { boy: Boy, girl: Girl, cat: Cat, dog: Dog, text: Txt, heart: Heart }[s.kind] || Boy;
  const Comp = body;
  return (
    <g filter="url(#sticker-outline)">
      <Comp s={s} />
    </g>
  );
}

// Put once in the page so every sticker can share the white sticker outline
export function StickerDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="sticker-outline" x="-25%" y="-25%" width="150%" height="150%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="dil" />
          <feFlood floodColor="#ffffff" result="white" />
          <feComposite in="white" in2="dil" operator="in" result="outline" />
          <feDropShadow in="outline" dx="0" dy="1.4" stdDeviation="1.1" floodColor="#06281a" floodOpacity="0.28" result="sh" />
          <feMerge>
            <feMergeNode in="sh" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
