import { Outlet, Link } from "react-router-dom";

const Layout = () =>{
    return <div>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/peliculas">Peliculas</Link>
                </li>
                <li>
                    <Link to="/login-admin">Login Admin</Link>
                </li>
            </ul>
        </nav>
        <hr />
        <Outlet />
    </div>;
}

export default Layout;
