import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { routes } from "../../app";

function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.user && !auth.isLoading) {
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
