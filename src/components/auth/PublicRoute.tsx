import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { type ReactNode } from "react";

interface PublicRouteProps{
    children:ReactNode
}
function PublicRoute({children}:PublicRouteProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

export default PublicRoute;
