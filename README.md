# Spyro StickerStore

React + Vite. Plain CSS, no UI library.

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # outputs /dist (Netlify ready, _redirects included)

## Pages
- `/`                     Landing page: hero, tabs, categories, packs, pagination
- `/stickers`             Browse all packs (search from the navbar works here)
- `/pack/:id`             Pack details, "Add to SpyroChat", creator card, reviews
- `/pack/:id/reviews`     Reviews & Comments with rating breakdown, write a review
- `/creators`, `/creator/:name`   Creator list and creator profile (Follow, My Packs / Saved / About)
- `/login` Login with SpyroChat only. `/signup` Sign up form (split green/white layout)
- `/dashboard`            Sidebar dashboard: My Packs (delete), Saved Packs, Upload Pack, Reviews, Settings

## Connecting to the real SpyroChat
Open `src/config.js`:
- `SPYROCHAT_AUTH_URL`     where "Continue with SpyroChat" sends users to sign in
- `ADD_TO_SPYROCHAT_URL`   link that adds a pack, `{id}` is replaced by the pack id

Left empty, the app runs in demo mode:
- Clicking "Login with SpyroChat" signs you in as the demo creator "Zenith"
- Accounts and packs are kept in the browser (localStorage)
- Sticker art is drawn with SVG in `src/components/StickerArt.jsx`

For production, replace the functions in `src/context/AuthContext.jsx` (loginWithSpyroChat) and
`src/context/PacksContext.jsx` (addPack, deletePack, countAdd, reviews) with API calls,
and upload sticker files to your server instead of storing them in the browser.
