import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../components/Avatar";
import Icon from "../../components/Icon";

const links = [
  { to: "/dashboard", label: "My Packs", icon: "grid", end: true },
  { to: "/dashboard/saved", label: "Saved Packs", icon: "bookmark" },
  { to: "/dashboard/upload", label: "Upload Pack", icon: "upload" },
  { to: "/dashboard/reviews", label: "Reviews", icon: "chat" },
  { to: "/dashboard/settings", label: "Settings", icon: "sliders" },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="container dash page-top">
      <aside className="sidebar">
        <div className="side-user">
          <Avatar name={user.name} size={46} />
          <div><strong>{user.name}</strong><span>Creator</span></div>
        </div>
        <nav>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              <Icon name={l.icon} size={18} /> {l.label}
            </NavLink>
          ))}
        </nav>
        <button className="side-logout" onClick={() => { logout(); navigate("/"); }}><Icon name="logout" size={18} /> Log Out</button>
      </aside>
      <section className="dash-main"><Outlet /></section>
    </div>
  );
}
