import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <img
          src={logo}
          alt="Spyro StickerStore"
          className="footer-logo"
        />

        <p>Sticker packs made by the Spyrochat community.</p>

        <div className="footer-links">
          <Link to="/stickers">Stickers</Link>
          <Link to="/creators">Creators</Link>
          <Link to="/dashboard/upload">Upload a pack</Link>
          <Link to="/dashboard">My Packs</Link>
        </div>

        <small>
          © {new Date().getFullYear()} Spyro StickerStore. Built by{" "}
          <a
            href="https://gedeveloper.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            GE. developer
          </a>
        </small>
      </div>
    </footer>
  );
}