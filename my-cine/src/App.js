import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/Home';
import MyProtectedComponent from './pages/MyProtectedComponent';
import RouteProtected from './pages/RouteProtected';
import Layout  from "./pages/Layout";
import LayoutAdmin  from "./pages/admin/Layout";
import About  from "./pages/About";
import Home  from "./pages/Home";
import Default  from "./pages/Default";
import Dashboard  from "./pages/Dashboard";
import Pelicula  from "./pages/admin/Pelicula";
import Sala from "./pages/admin/Sala";
import Butaca from "./pages/admin/Butaca";
import LoginAdminForm  from "./pages/admin/login/LoginAdminForm";
<<<<<<< Updated upstream
import Funcion from "./pages/admin/Funcion";
import Error404 from "./pages/Error404";

=======
import { Outlet, Link } from "react-router-dom";
>>>>>>> Stashed changes

function App() {
    return (
            <Routes>
                <Route exact path="/" element={<Layout />}>
                </Route>
                <Route exact path="/login-admin" element={<LoginAdminForm />} />
                <Route exact path="/home" element={<MyProtectedComponent exact path="/home" allowedRoles={['admin', 'user']}><HomePage /></MyProtectedComponent>} />
<<<<<<< Updated upstream
                <Route path="/admin" element={<MyProtectedComponent path="/admin" allowedRoles={['admin']} element={<LayoutAdmin />}></MyProtectedComponent>}>
                    <Route path="peliculas" element={<Pelicula/>} />
                    <Route path="salas" element={<Sala/>} />
                    <Route path="butacas" element={<Butaca/>} />
                    <Route path="funciones" element={<Funcion/>} />
=======
                <Route path="/admin" element={<MyProtectedComponent path="/admin" allowedRoles={'admin'}></MyProtectedComponent>}>
                    <Route path="peliculas" element={<Pelicula />} />
>>>>>>> Stashed changes
                </Route>
                <Route path="*" element={<Error404/>}/>
            </Routes>
    );
}

export default App;
