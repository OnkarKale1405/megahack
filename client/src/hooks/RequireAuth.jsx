import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAccount } from "../app/AuthSlice";

const RequireAuth = ({ allowedRoles }) => {
    const acc = useSelector(selectAccount);
    const location = useLocation();
    
    return (
        allowedRoles?.includes(acc?.role) ? (
            <Outlet />
        ) : acc ? (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    );
};

export default RequireAuth;