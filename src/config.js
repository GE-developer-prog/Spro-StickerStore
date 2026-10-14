// ------------------------------------------------------------------
// Connect Spyro StickerStore to your real SpyroChat backend here.
// Leave the values empty to run in DEMO mode (local accounts + local data).
// ------------------------------------------------------------------
export const config = {
  // Where "Continue with SpyroChat" sends the user to sign in.
  // Example: "https://spyrochat.com/oauth/authorize?client_id=XXXX"
  SPYROCHAT_AUTH_URL: "",

  // Link that adds a pack to the user's SpyroChat. {id} is replaced by the pack id.
  // Example: "spyrochat://stickers/add?pack={id}" or "https://spyrochat.com/add-pack/{id}"
  ADD_TO_SPYROCHAT_URL: "",

  PAGE_SIZE: 8,
  MAX_STICKERS_PER_PACK: 30,
  MIN_STICKERS_PER_PACK: 3,
};
