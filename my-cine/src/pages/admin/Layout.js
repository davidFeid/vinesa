import { Outlet, Link } from "react-router-dom";
import { MegaMenu } from 'primereact/megamenu';
import { TabMenu } from 'primereact/tabmenu';
import { Menubar } from 'primereact/menubar';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import React from "react";

// eslint-disable-next-line react-hooks/rules-of-hooks


const LayoutAdmin = () =>{


    const items = [
        {
            label: "Peliculas",
            icon: "pi pi-fw pi-video",
            url: "/admin/peliculas"
        },
        {
            label: "Salas",
            icon: "pi pi-fw pi-ticket",
            url: "/admin/salas"
        },
        {
            label: "Funciones",
            icon: "pi pi-fw pi-calendar",
            url: "/admin/funciones"
        },
        {
            label: "Usuarios",
            icon: "pi pi-fw pi-users",
            url: "/admin/usuarios"
        },
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;

    return <div>
        <div className="card">
                <Menubar model={items} orientation="horizontal" start={start} end={end} breakpoint="960px" ></Menubar>
        </div>
        <hr />
        <Outlet />
    </div>;
}

export default LayoutAdmin;
