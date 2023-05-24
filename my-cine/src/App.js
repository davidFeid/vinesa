import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';
import MyProtectedComponent from './pages/MyProtectedComponent';
import RouteProtected from './pages/RouteProtected';
import Layout  from "./pages/Layout";
import LayoutAdmin  from "./pages/admin/Layout";
import About  from "./pages/About";
import Home from './pages/Home';
import Default  from "./pages/Default";

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
                <Route path="/funciones" >
                    <Route path={":id"}  element={<FuncionPage />} />
                </Route>
             </Route>

            <Route path="/admin" element={<MyProtectedComponent path="/admin" allowedRoles={['admin']} element={<LayoutAdmin />}></MyProtectedComponent>}>
                <Route path="peliculas" element={<Pelicula/>} />
                <Route path="salas" element={<Sala/>} />
                <Route path="butacas" element={<Butaca/>} />
                <Route path="funciones" element={<Funcion/>} />
                <Route path="usuarios" element={<Usuario/>} />
            </Route>
            <Route path="/registro" element={<RegisterUsuarioForm/>}/>
            <Route path="/login" element={<LoginUsuarioForm/>}/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
    );
}

export default App;
