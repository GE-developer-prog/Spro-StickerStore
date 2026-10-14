import StickerArt from "./StickerArt";

// One sticker: uploaded image, or drawn SVG art.
export default function Sticker({ s, className = "" }) {
  if (s.src) return <img className={"sticker-img " + className} src={s.src} alt="" loading="lazy" />;
  return (
    <svg className={"sticker-svg " + className} viewBox="0 0 100 100" aria-hidden="true">
      <StickerArt s={s} />
    </svg>
  );
}
