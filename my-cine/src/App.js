import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';
import MyProtectedComponent from './pages/MyProtectedComponent';
import MyProtectedComponentUser from './pages/MyProtectedComponentUser';
import RouteProtected from './pages/RouteProtected';
import Layout  from "./pages/Layout";
import LayoutAdmin  from "./pages/admin/Layout";
import Home from './pages/Home';
import Pelicula  from "./pages/admin/Pelicula";
import Sala from "./pages/admin/Sala";
import Butaca from "./pages/admin/Butaca";
import LoginAdminForm  from "./pages/admin/login/LoginAdminForm";
import LoginUsuarioForm  from "./pages/usuario/LoginUsuarioForm";
import RegisterUsuarioForm  from "./pages/usuario/RegisterUsuarioForm";
import Funcion from "./pages/admin/Funcion";
import Usuario from "./pages/admin/Usuario";
import PeliculaPage from './pages/PeliculaPage';
import FuncionPage from './pages/FuncionPage';
import CerrarSesion from './pages/CerrarSesion';
import Error404 from "./pages/Error404";
import * as PropTypes from "prop-types";



function Switch(props) {
    return null;
}

Switch.propTypes = {children: PropTypes.node};

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Layout />} >
                <Route exact path="/login-admin" element={<LoginAdminForm />} />
                <Route exact path="/home" element={<Home />} />

                <Route path="/peliculas" >
                   <Route path={":id"}  element={<PeliculaPage />} />
                </Route>
                <Route path="/funciones" element={<MyProtectedComponentUser path="/funciones" allowedRoles={['user']}></MyProtectedComponentUser>}>
                    <Route path={":id"}  element={<FuncionPage />} />
                </Route>
                <Route path = "cerrarSesion" element={<CerrarSesion/>} />
             </Route>

            <Route path="/admin" element={<MyProtectedComponent path="/admin" allowedRoles={['admin']} element={<LayoutAdmin />}></MyProtectedComponent>}>
                <Route path="peliculas" element={<Pelicula/>} />
                <Route path="salas" element={<Sala/>} />
                <Route path="butacas" element={<Butaca/>} />
                <Route path="funciones" element={<Funcion/>} />
                <Route path="usuarios" element={<Usuario/>} />
                <Route path = "cerrarSesion" element={<CerrarSesion/>} />
            </Route>
            <Route path="/registro" element={<RegisterUsuarioForm/>}/>
            <Route path="/login" element={<LoginUsuarioForm/>}/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
    );
}

export default App;
