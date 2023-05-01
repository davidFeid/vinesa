import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

function MyProtectedComponent() {
    // Obtener la información del usuario del sessionStorage
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
    if (!userInfo || !userInfo.authenticated) {
        return <Navigate to="/login-admin" />;
    }

    // Si el usuario no tiene el rol adecuado, mostrar un mensaje de error
    if (userInfo.role !== 'admin') {
        return <div>No tienes permiso para acceder a esta página.</div>;
    }

    // Si el usuario está autenticado y tiene el rol adecuado, mostrar el componente protegido
    return <Outlet />;
}

export default MyProtectedComponent;
