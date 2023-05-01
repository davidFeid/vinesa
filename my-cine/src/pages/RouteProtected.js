import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const RouteProtected = ({ allowedRoles }) => {
    const userRoles = JSON.parse(sessionStorage.getItem("userInfo"));

    if (!userRoles || !allowedRoles.includes(userRoles.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default RouteProtected;
