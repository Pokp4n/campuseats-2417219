import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

import { useAuth } from "../hooks/useAuth.js";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed.js";

// Used only when a user is signed in
function UserHistoryOutlet({ userId }) {
  const recentlyViewedData = useRecentlyViewed(userId);

  return <Outlet context={recentlyViewedData} />;
}

// Guests can browse, but their history is not saved
const guestHistory = {
  recentlyViewed: [],
  recordView: () => {},
  clearRecentlyViewed: () => {},
};

function Layout() {
  const { user } = useAuth();

  return (
    <>
      <Header />

      <main className="container">
        {user?.uid ? (
          <UserHistoryOutlet key={user.uid} userId={user.uid} />
        ) : (
          <Outlet context={guestHistory} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default Layout;
