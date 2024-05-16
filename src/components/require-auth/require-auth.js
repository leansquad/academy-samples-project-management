import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user && !auth.isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
