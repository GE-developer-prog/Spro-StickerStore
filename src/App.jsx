import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { StickerDefs } from "./components/StickerArt";
import Home from "./pages/Home";
import Stickers from "./pages/Stickers";
import PackDetail from "./pages/PackDetail";
import Reviews from "./pages/Reviews";
import Creators from "./pages/Creators";
import Creator from "./pages/Creator";
import AuthPage from "./pages/AuthPage";
import DashboardLayout from "./pages/dashboard/Layout";
import MyPacks from "./pages/dashboard/MyPacks";
import Saved from "./pages/dashboard/Saved";
import Upload from "./pages/dashboard/Upload";
import MyReviews from "./pages/dashboard/MyReviews";
import Settings from "./pages/dashboard/Settings";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const bare = pathname === "/login" || pathname === "/signup";

  return (
    <>
      <StickerDefs />
      <ScrollToTop />
      {!bare && <Navbar />}
      <main key={pathname.split("/").slice(0, 3).join("/")} className="page-fade">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stickers" element={<Stickers />} />
          <Route path="/pack/:id" element={<PackDetail />} />
          <Route path="/pack/:id/reviews" element={<Reviews />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/creator/:name" element={<Creator />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<MyPacks />} />
            <Route path="saved" element={<Saved />} />
            <Route path="upload" element={<Upload />} />
            <Route path="reviews" element={<MyReviews />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<div className="container empty page-top"><h1>Page not found</h1><p className="muted">That page doesn't exist.</p></div>} />
        </Routes>
      </main>
      {!bare && <Footer />}
    </>
  );
}
