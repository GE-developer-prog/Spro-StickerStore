import { createContext, useContext } from "react";
import { config } from "../config";
import { useLocalStorage } from "../utils/storage";
import { slug } from "../utils/format";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// DEMO ONLY: the signed-in user is stored in the browser. Replace loginWithSpyroChat with your real SpyroChat sign-in.
const demoUser = { id: "u-zenith", name: "Zenith", handle: "@zenith", email: "zenith@spyrochat.com", bio: "Anime, memes and more. Just stickers. ✨" };

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage("spyro_users_v2", [demoUser]);
  const [session, setSession] = useLocalStorage("spyro_session_v2", null);
  const user = users.find((u) => u.email === session) || null;

  // Sign up form. DEMO: the password is NOT stored here. Send it to your SpyroChat API instead.
  const signup = ({ name, email }) => {
    const mail = email.trim().toLowerCase();
    if (users.some((u) => u.email === mail)) throw new Error("An account with this email already exists.");
    const u = { id: "u-" + Date.now(), name: name.trim(), handle: "@" + slug(name), email: mail, bio: "" };
    setUsers([...users, u]);
    setSession(mail);
  };

  // "Login with SpyroChat" - redirects to your real auth when configured
  const loginWithSpyroChat = () => {
    if (config.SPYROCHAT_AUTH_URL) {
      window.location.href = config.SPYROCHAT_AUTH_URL;
      return;
    }
    setSession(demoUser.email);
  };

  const logout = () => setSession(null);

  const updateProfile = (patch) => setUsers(users.map((u) => (u.email === session ? { ...u, ...patch } : u)));

  return (
    <AuthContext.Provider value={{ user, signup, loginWithSpyroChat, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
