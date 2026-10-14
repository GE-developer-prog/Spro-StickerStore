# Spyro StickerStore

React + Vite. Plain CSS, no UI library.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

Build for production:

```bash
npm run build
```

The build outputs to `/dist`, ready for Netlify deployment, with `_redirects` included.

## Pages

- `/` — Landing page with hero, tabs, categories, packs, and pagination.
- `/stickers` — Browse all packs. Search from the navbar works here.
- `/pack/:id` — Pack details, "Add to SpyroChat", creator card, and reviews.
- `/pack/:id/reviews` — Reviews and comments, rating breakdown, and write-a-review functionality.
- `/creators` — Browse the creator list.
- `/creator/:name` — Creator profile with Follow, My Packs, Saved, and About sections.
- `/login` — Log in with SpyroChat.
- `/signup` — Sign-up form with a split green-and-white layout.
- `/dashboard` — Sidebar dashboard with My Packs (delete), Saved Packs, Upload Pack, Reviews, and Settings.

## Connecting to the Real SpyroChat

Open `src/config.js` and configure these values:

- `SPYROCHAT_AUTH_URL` — The URL where "Continue with SpyroChat" sends users to sign in.
- `ADD_TO_SPYROCHAT_URL` — The URL used to add a pack. `{id}` is replaced with the pack ID.

### Demo Mode

When these URLs are left empty, the app runs in demo mode:

- Clicking "Login with SpyroChat" signs you in as the demo creator **Zenith**.
- Accounts and packs are stored in the browser using `localStorage`.
- Sticker artwork is drawn with SVG in `src/components/StickerArt.jsx`.

### Production Integration

Before deploying a production version:

- Replace the relevant functions in `src/context/AuthContext.jsx`, including `loginWithSpyroChat`, with API calls for authentication.
- Replace the relevant functions in `src/context/PacksContext.jsx`, including `addPack`, `deletePack`, `countAdd`, and reviews, with API calls.
- Upload sticker files to your server instead of storing them in the browser.
- Configure the actual SpyroChat authentication and pack-integration URLs.

## Tech Stack

- React
- React Router
- Vite
- JavaScript
- Plain CSS
- SVG sticker artwork

## Developer

**GE. developer**

A self-taught frontend developer focused on building responsive, interactive, and user-friendly web applications with modern design and practical functionality.
