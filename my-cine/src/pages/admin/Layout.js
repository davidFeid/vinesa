import { Outlet, Link } from "react-router-dom";
import { MegaMenu } from 'primereact/megamenu';
import { InputText } from 'primereact/inputtext';

// eslint-disable-next-line react-hooks/rules-of-hooks


const LayoutAdmin = () =>{


    const items = [
        {
            label: "Peliculas",
            icon: "pi pi-fw pi-video",
            url: "admin/peliculas"
        },
        {
            label: "Salas",
            icon: "pi pi-fw pi-ticket",
            url: "/peliculas"
        },
        {
            label: "Funciones",
            icon: "pi pi-fw pi-calendar",
            url: "/peliculas"
        },
        {
            label: "Usuarios",
            icon: "pi pi-fw pi-users",
            url: "/peliculas"
        },
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;

    return <div>
        <div className="card">
            <MegaMenu model={items} orientation="horizontal" start={start} end={end} breakpoint="960px" />
        </div>
        <hr />
        <Outlet />
    </div>;
}

export default LayoutAdmin;
