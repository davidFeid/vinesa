import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CerrarSesion = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Limpiar los datos de sesión o realizar cualquier acción necesaria para cerrar la sesión aquí

        // Eliminar la información de sesión del almacenamiento local
        localStorage.removeItem('userInfo');

        // Redirigir a la página de inicio después del cierre de sesión
        window.location.replace('/home');
    }, [navigate]);

    return (
        <div>
            <h2>Cerrar Sesión</h2>
            <p>Cerrando sesión...</p>
        </div>
    );
};

export default CerrarSesion;
