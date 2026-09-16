import { Outlet, ScrollRestoration, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AmbientGlow, BackgroundShapes, CustomCursor, ScrollProgress, SmoothScroller } from "../components/effects";
import { isPublicPath } from "../lib/routeKind";

export default function Root() {
  const { pathname } = useLocation();
  // The public experience (landing, about, onboarding, login) is navbar-free and
  // immersive. The student portal navbar only appears on authenticated routes.
  const isPublic = isPublicPath(pathname);

  return (
    <div className="relative min-h-screen grid-paper">
      <SmoothScroller />
      <BackgroundShapes />
      <AmbientGlow />
      <CustomCursor />
      <ScrollProgress />
      <ScrollRestoration />
      {!isPublic && <Navbar />}
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
