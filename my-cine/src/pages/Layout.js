import {Outlet, Link, Navigate} from "react-router-dom";
import "./Layout.css";
import sadRobot from '../assets/images/logo-ocine-mag.png';
import React from "react";


const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const Layout = () => {
    return (
        <div className="menu">
            <h1><img src={sadRobot} alt="Sad robot illustration" /></h1>
            <nav>
                <ul className="menu-list">
                    <li>
                        <Link to="/home" className="menu-item">Cartelera</Link>
                    </li>
                    <li>
                        <Link to="/about" className="menu-item">About</Link>
                    </li>
                    {!userInfo || !userInfo.authenticated ? (
                        <li>
                            <Link to="/login" className="menu-item">Login</Link>
                        </li>
                    ) : null}
                    {userInfo && userInfo.authenticated ? (
                        <li>
                            <Link to="/CerrarSesion" className="menu-item">Cerrar Sesión</Link>
                        </li>
                    ) : null}
                </ul>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}

export default Layout;
