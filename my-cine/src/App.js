import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/Home';
import MyProtectedComponent from './pages/MyProtectedComponent';
import RouteProtected from './pages/RouteProtected';
import './App.css';
import Layout  from "./pages/Layout";
import About  from "./pages/About";
import Home  from "./pages/Home";
import Default  from "./pages/Default";
import Dashboard  from "./pages/Dashboard";
import Pelicula  from "./pages/Pelicula";
import LoginAdminForm  from "./pages/Login/LoginAdminForm";

function App() {
    return (
            <Routes>
                <Route exact path="/" element={<Layout />} />
                <Route exact path="/login-admin" element={<LoginAdminForm />} />
                <Route exact path="/home" element={<MyProtectedComponent exact path="/home" allowedRoles={['admin', 'user']}><HomePage /></MyProtectedComponent>} />
                <Route exact path="/admin" element={<MyProtectedComponent exact path="/admin" allowedRoles={['admin', 'user']}><HomePage /></MyProtectedComponent>}>

                </Route>
            </Routes>
    );
}

export default App;
