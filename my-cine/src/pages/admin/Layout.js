import { Outlet, Link } from "react-router-dom";

const LayoutAdmin = () =>{
    return <div>
        <h1>Menu Admin</h1>
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

export default LayoutAdmin;
