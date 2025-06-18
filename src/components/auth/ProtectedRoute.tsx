import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { useLocation } from "react-router-dom";
import { type ReactNode } from "react";

interface ProtectedRouteProps{
    children:ReactNode
}

function ProtectedRoute({children}:ProtectedRouteProps){
    const {isAuthenticated}=useSelector((state:RootState)=>state.auth);
    // const isAuthenticated=true;
    const location=useLocation();

    return isAuthenticated?(
        <>{children}</>
    ) :<Navigate to="/login" replace state={{from:location}} />
}

export default ProtectedRoute;