import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";
import Icon from "./Icon";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  const search = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/stickers?q=${encodeURIComponent(q.trim())}` : "/stickers");
    setQ("");
  };

  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo"><img src={logo} alt="Spyro StickerStore" /></Link>

        <nav className={"nav-links" + (open ? " open" : "")}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/stickers">Stickers</NavLink>
          <NavLink to="/creators">Creators</NavLink>
          <NavLink to="/dashboard">My Packs</NavLink>
        </nav>

        <form className="nav-search" onSubmit={search}>
          <Icon name="search" size={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sticker packs..." aria-label="Search sticker packs" />
        </form>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <button className="icon-btn" onClick={() => setMenu(!menu)} aria-label="Account menu" aria-expanded={menu}>
                <Avatar name={user.name} size={36} />
              </button>
              <Link to="/dashboard/upload" className="plus-btn" aria-label="Upload a pack"><Icon name="plus" size={16} strokeWidth={2.6} /></Link>
              {menu && (
                <div className="dropdown">
                  <div className="dd-head"><strong>{user.name}</strong><span>{user.handle}</span></div>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to={`/creator/${user.name}`}>My profile</Link>
                  <Link to="/dashboard/upload">Upload pack</Link>
                  <button onClick={() => { logout(); navigate("/"); }}>Log out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">Log In</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
