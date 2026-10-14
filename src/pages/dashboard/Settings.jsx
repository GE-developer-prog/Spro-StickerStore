import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { usePacks } from "../../context/PacksContext";
import { useToast } from "../../context/ToastContext";
import { useLocalStorage } from "../../utils/storage";
import Avatar from "../../components/Avatar";
import Icon, { Flame } from "../../components/Icon";
import Modal from "../../components/Modal";

const TOGGLES = [
  { key: "newFollower", title: "New followers", text: "Get notified when someone follows you." },
  { key: "newReview", title: "New reviews", text: "Get notified when someone reviews one of your packs." },
  { key: "milestones", title: "Add milestones", text: "Celebrate when a pack reaches 1k, 5k or 10k adds." },
  { key: "publicSaved", title: "Show saved packs on my profile", text: "Let other people see the packs you have saved." },
];

function Switch({ on, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} className={"switch-ui" + (on ? " on" : "")} onClick={onChange}>
      <i />
    </button>
  );
}

export default function Settings() {
  const { user, updateProfile, logout } = useAuth();
  const { packs, deletePack } = usePacks();
  const toast = useToast();
  const navigate = useNavigate();
  const [bio, setBio] = useState(user.bio || "");
  const [prefs, setPrefs] = useLocalStorage("spyro_settings_v2", { newFollower: true, newReview: true, milestones: true, publicSaved: false });
  const [wipe, setWipe] = useState(false);

  const mine = packs.filter((p) => p.creator === user.name);

  const saveProfile = (e) => {
    e.preventDefault();
    updateProfile({ bio: bio.trim() });
    toast("Profile saved");
  };

  const flip = (key) => {
    setPrefs({ ...prefs, [key]: !prefs[key] });
    toast("Preference updated");
  };

  const wipeAll = () => {
    mine.forEach((p) => deletePack(p.id));
    setWipe(false);
    toast("All your packs were deleted");
  };

  return (
    <>
      <div className="dash-head"><div><h1>Settings</h1><p className="muted">Manage your creator profile, alerts and account.</p></div></div>

      <div className="settings">
        <form className="panel" onSubmit={saveProfile}>
          <h3>Profile</h3>
          <div className="set-user">
            <Avatar name={user.name} size={64} />
            <div><strong>{user.name}</strong><span className="muted">{user.handle}</span></div>
          </div>
          <div className="fields">
            <label>Name<input value={user.name} disabled /></label>
            <label>Email<input value={user.email} disabled /></label>
            <label>Bio
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={120} rows={3} placeholder="Tell people about your stickers" />
              <small className="muted">{bio.length}/120</small>
            </label>
          </div>
          <button className="btn btn-primary">Save changes</button>
        </form>

        <div className="panel">
          <h3>Notifications &amp; privacy</h3>
          <div className="toggle-list">
            {TOGGLES.map((t) => (
              <div key={t.key} className="toggle-row">
                <div><strong>{t.title}</strong><span className="muted">{t.text}</span></div>
                <Switch on={!!prefs[t.key]} onChange={() => flip(t.key)} label={t.title} />
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Connected account</h3>
          <div className="connect-row">
            <span className="connect-icon"><Flame size={22} /></span>
            <div><strong>SpyroChat</strong><span className="muted">Signed in as {user.handle}</span></div>
            <span className="status-pill"><i /> Connected</span>
          </div>
          <p className="muted small-note">Stickers you add from the store go straight to this SpyroChat account.</p>
        </div>

        <div className="panel danger-zone">
          <h3>Account</h3>
          <div className="toggle-row">
            <div><strong>Log out</strong><span className="muted">Sign out of Spyro StickerStore on this device.</span></div>
            <button className="btn btn-outline btn-sm" onClick={() => { logout(); navigate("/"); }}><Icon name="logout" size={15} /> Log out</button>
          </div>
          <div className="toggle-row">
            <div><strong>Delete all my packs</strong><span className="muted">{mine.length ? `Remove all ${mine.length} of your packs from the store.` : "You don't have any packs to delete."}</span></div>
            <button className="btn btn-danger-soft btn-sm" disabled={!mine.length} onClick={() => setWipe(true)}><Icon name="trash" size={15} /> Delete</button>
          </div>
        </div>
      </div>

      {wipe && (
        <Modal title="Delete all your packs?" onClose={() => setWipe(false)}>
          <p className="muted">This removes all {mine.length} packs from the store for everyone. This can't be undone.</p>
          <div className="modal-actions">
            <button className="btn btn-outline" onClick={() => setWipe(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={wipeAll}>Delete everything</button>
          </div>
        </Modal>
      )}
    </>
  );
}
