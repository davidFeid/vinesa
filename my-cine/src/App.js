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
import LoginAdminForm  from "./pages/admin/login/LoginAdminForm";

function App() {
    return (
            <Routes>
                <Route exact path="/" element={<Layout />} />
                <Route exact path="/login-admin" element={<LoginAdminForm />} />
                <Route exact path="/home" element={<MyProtectedComponent exact path="/home" allowedRoles={['admin', 'user']}><HomePage /></MyProtectedComponent>} />
                <Route path="/admin" element={<MyProtectedComponent path="/admin" allowedRoles={['admin']} element={<LayoutAdmin />}></MyProtectedComponent>}>
                    <Route path="peliculas" element={<Pelicula/>} />
                    <Route path="salas" element={<Sala/>} />
                </Route>
            </Routes>
    );
}

export default App;
