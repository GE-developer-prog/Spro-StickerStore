import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { usePacks } from "../../context/PacksContext";
import { useToast } from "../../context/ToastContext";
import { CATEGORIES } from "../../data/seed";
import { config } from "../../config";
import { fileToSticker } from "../../utils/image";
import Icon, { Flame } from "../../components/Icon";
import Sticker from "../../components/Sticker";

export default function Upload() {
  const { user } = useAuth();
  const { addPack } = usePacks();
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stickers, setStickers] = useState([]);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);

  const pick = async (fileList) => {
    setError("");
    const files = [...fileList].filter((f) => f.type.startsWith("image/"));
    const room = config.MAX_STICKERS_PER_PACK - stickers.length;
    if (files.length > room) setError(`A pack can hold up to ${config.MAX_STICKERS_PER_PACK} stickers.`);
    try {
      const made = await Promise.all(files.slice(0, room).map(fileToSticker));
      setStickers((s) => [...s, ...made]);
    } catch (e) {
      setError(e.message);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Give your pack a name.");
    if (!category) return setError("Choose a category.");
    if (stickers.length < config.MIN_STICKERS_PER_PACK) return setError(`Add at least ${config.MIN_STICKERS_PER_PACK} stickers.`);
    addPack({
      name: name.trim(),
      description: description.trim() || "A sticker pack for SpyroChat.",
      category,
      tags: [category],
      stickers,
      creator: user.name,
    });
    toast("Pack published");
    navigate("/dashboard");
  };

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Upload Sticker Pack</h1>
          <p className="muted">Share your creativity with the SpyroChat community. Upload your sticker pack and let everyone use it in their chats.</p>
        </div>
      </div>

      <form onSubmit={submit}>
        <label
          className={"drop" + (drag ? " over" : "")}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files); }}
        >
          <input type="file" accept="image/*" multiple hidden onChange={(e) => { pick(e.target.files); e.target.value = ""; }} />
          <span className="drop-icon"><Icon name="upload" size={34} /></span>
          <strong>Drag &amp; drop your stickers here</strong>
          <span className="drop-link">or click to browse</span>
          <small>Supported formats: PNG, WEBP, JPG · up to {config.MAX_STICKERS_PER_PACK} stickers</small>
        </label>

        <div className="upload-grid">
          <div className="panel">
            <h3>Pack Details</h3>
            <div className="fields">
              <label>Pack Name
                <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder="Enter pack name" />
              </label>
              <label>Description
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={160} rows={3} placeholder="Tell people what this pack is about" />
              </label>
              <label>Category
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}
                </select>
              </label>
            </div>
            {error && <p className="error" role="alert">{error}</p>}
            <button className="btn btn-primary btn-lg btn-block"><Icon name="upload" size={18} /> Upload Pack</button>
          </div>

          <div className="panel">
            <h3>Preview <span className="muted">({stickers.length} {stickers.length === 1 ? "sticker" : "stickers"})</span></h3>
            {stickers.length ? (
              <div className="sticker-grid small">
                {stickers.map((s, i) => (
                  <div key={i} className="sticker-tile">
                    <Sticker s={s} />
                    <button type="button" className="remove" aria-label="Remove sticker" onClick={() => setStickers(stickers.filter((_, x) => x !== i))}>×</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="preview-empty">
                <span className="ghost-flame"><Flame size={64} /></span>
                <p>Your stickers will appear here once you upload them.</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
