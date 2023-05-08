import logo from '../../logo.svg';
import '../../App.css';
import React, {Component} from "react";
import {UsuarioService} from "../../service/UsuarioService";

import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Fieldset } from 'primereact/fieldset';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { Image } from 'primereact/image';

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Pelicula extends Component{
    constructor() {
        super();
        this.state= {
            usuarios: [],
            visible : false,
            visibleShow : false,
            selectedUsuario : {

            },
            imageUpload : null,
            formData:  new FormData()
        };
        this.items = [
            {
                label : 'Nuevo',
                icon : 'pi pi-fw pi-plus',
                command : () => {this.showSaveDialog()}
            },
            {
                label : 'Mostrar',
                icon : 'pi pi-fw pi-eye',
                command : () => {this.showShowDialog()}
            },
            {
                label : 'Activar / Desactivar',
                icon : 'pi pi-fw pi-trash',
                command : () => {this.delete()}
            }
        ];
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        this.usuarioService.getAll().then(data => this.setState({usuarios: data}));
    }



    render(){
        return(
            <div style={{margin:'2em'}}>
                <Menubar model={this.items}></Menubar>
                <br/>
                <Panel header="Peliculas">
                    <DataTable value={this.state.usuarios} paginator={true} rows={10} rowsPerPageOptions={[5, 10, 25, 50]} removableSort  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                               currentPageReportTemplate="{first} to {last} of {totalRecords}" tableStyle={{ minWidth: '50rem' }} selectionMode={"single"} selection={this.state.selectedUsuario} onSelectionChange={e => this.setState({selectedUsuario: e.value})}>
                        <Column sortable filter field="id_usuario" header="Id Usuario"></Column>
                        <Column sortable filter field="usuario" header="Usuario"></Column>
                        <Column sortable filter field="nombre" header="Nombre"></Column>
                        <Column sortable filter field="apellido" header="Apellido"></Column>
                        <Column sortable filter field="direccion" header="Direccion"></Column>
                        <Column sortable filter field="ciudad" header="Ciudad"></Column>
                        <Column sortable filter field="codigo_postal" header="Codigo Postal"></Column>
                        <Column sortable filter field="estado" header="Estado"></Column>
                    </DataTable>
                </Panel>
                <Toast ref={(el) => this.toast = el} />
            </div>
        );
    }




}
