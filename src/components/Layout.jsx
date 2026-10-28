import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed.js";

function Layout() {
  const recentlyViewedData = useRecentlyViewed();

  return (
    <>
      <Header />

      <main className="container">
        <Outlet context={recentlyViewedData} />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
