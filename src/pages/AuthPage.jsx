import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Icon, { Flame } from "../components/Icon";
import Sticker from "../components/Sticker";
import logo from "../assets/logo.png";
import icon from "../assets/icon.png";

const floaters = [
  { kind: "girl", hair: "#ff8fb8", skin: "#ffe3cf", shirt: "#14b866", mood: "happy", acc: "bow" },
  { kind: "cat", fur: "#f5a54a", mood: "wink" },
  { kind: "boy", hair: "#f4f1ea", skin: "#ffe3cf", shirt: "#1f2a44", mood: "blind" },
  { kind: "text", text: "Good Vibes", c1: "#14b866", rot: -10 },
  { kind: "heart", c1: "#ff4d79" },
  { kind: "dog", fur: "#d9a066", mood: "happy", acc: "glasses" },
];

// Split layout: green side with stickers + white side with the form.
// Log In = SpyroChat button only. Sign Up = form.
export default function AuthPage({ mode }) {
  const signupMode = mode === "signup";
  const { user, signup, loginWithSpyroChat } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from || "/dashboard";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  if (user) return <Navigate to={from} replace />;

  const spyro = () => {
    loginWithSpyroChat();
    navigate(from, { replace: true });
  };

  const submit = (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!name.trim()) throw new Error("Please enter your full name.");
      if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Please enter a valid email.");
      if (password.length < 6) throw new Error("Password must be at least 6 characters.");
      signup({ name, email });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <aside className="login-art">
        <span className="login-ring r1" /><span className="login-ring r2" />
        <div className="login-floaters" aria-hidden="true">
          {floaters.map((s, i) => (
            <div key={i} className={"lf lf" + (i + 1)}><Sticker s={s} /></div>
          ))}
        </div>
        <div className="login-art-text">
          <h1>{signupMode ? "Join the sticker community." : "Your stickers, one tap from SpyroChat."}</h1>
          <p>{signupMode ? "Create an account to publish packs, save favourites and grow your audience." : "Publish packs, grow your audience and see who's adding your stickers."}</p>
        </div>
      </aside>

      <section className="login-panel">
        <div className="login-card">
          <Link to="/"><img src={logo} alt="Spyro StickerStore" className="login-logo" /></Link>

          {signupMode ? (
            <>
              <h2>Sign Up</h2>
              <p className="muted">Create your account and start sharing amazing sticker packs.</p>
              <form onSubmit={submit} className="auth-form" noValidate>
                <label>Full Name
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" autoComplete="name" />
                </label>
                <label>Email Address
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" autoComplete="email" />
                </label>
                <label>Password
                  <span className="pw">
                    <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" autoComplete="new-password" />
                    <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}><Icon name={show ? "eyeoff" : "eye"} size={18} /></button>
                  </span>
                </label>
                {error && <p className="error" role="alert">{error}</p>}
                <button className="btn btn-primary btn-lg btn-block">Sign Up</button>
              </form>
              <div className="or"><span>Or continue with</span></div>
              <button className="btn btn-spyro btn-block" onClick={spyro}><Flame size={18} /> Continue with SpyroChat</button>
              <p className="switch">Already have an account? <Link to="/login">Log in</Link></p>
            </>
          ) : (
            <>
              <h2>Welcome Back</h2>
              <p className="muted">Log in with your Spyrochat account to publish packs and manage your stickers.</p>
              <button className="btn btn-spyro btn-lg btn-block auth-main" onClick={spyro}>
                <Flame size={20} /> Login with Spyrochat
              </button>
              <p className="fine">We only read your Spyrochat name and avatar.</p>
              <p className="switch">Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </>
          )}
          <img src={icon} alt="" className="login-mascot" />
        </div>
      </section>
    </div>
  );
}
