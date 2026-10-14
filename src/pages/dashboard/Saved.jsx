import { usePacks } from "../../context/PacksContext";
import PackCard from "../../components/PackCard";
import EmptyState from "../../components/EmptyState";

export default function Saved() {
  const { packs, favs } = usePacks();
  const saved = packs.filter((p) => favs.includes(p.id));
  return (
    <>
      <div className="dash-head"><div><h1>Saved Packs</h1><p className="muted">Packs you've saved with the heart button.</p></div></div>
      {saved.length ? (
        <div className="grid grid-3">{saved.map((p) => <PackCard key={p.id} pack={p} />)}</div>
      ) : (
        <EmptyState variant="saved" title="Nothing saved yet" text="Tap the heart on any sticker pack to keep it here so you can find it again fast." actions={[{ to: "/stickers", label: "Find packs to save" }]} />
      )}
    </>
  );
}
