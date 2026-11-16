import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until Firebase finishes checking the login session
  if (loading) {
    return (
      <p className="muted" role="status">
        Checking login session...
      </p>
    );
  }

  // Redirect guests to login and remember their destination
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Allow signed-in users to access the requested page
  return <Outlet />;
}

export default ProtectedRoute;
