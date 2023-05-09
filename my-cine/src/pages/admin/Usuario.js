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
            usuario : {
                id_usuario: null,
                usuario: null,
                nombre: null,
                apellido: null,
                dni: null,
                direccion: null,
                ciudad: null,
                codigo_postal: null
            },
            selectedUsuario : {

            },
            imageUpload : null,
            formData:  new FormData()
        };
        this.items = [
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
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.usuarioService.getAll().then(data => this.setState({usuarios: data}));
    }

    delete() {
        if (this.state.selectedUsuario && this.state.selectedUsuario.id_usuario) {
            if(window.confirm("¿Realmente desea Activar/Desactivar el registro '"+ this.state.selectedUsuario.usuario +"' ?")){
                this.usuarioService.delete(this.state.selectedUsuario.id_usuario)
                    .then(data => {
                        this.setState({
                            visible : false
                        });
                        this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                        this.usuarioService.getAll().then(data => this.setState({usuarios: data}));
                    })
                    .catch(error => {
                        this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la película' });
                    });
            }
        } else {
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, seleccione una película' });
        }
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
                <Dialog header="Mostrar Usuario" visible={this.state.visibleShow} style={{ width: '70%' }} modal={true} onHide={() => this.setState({visibleShow : false})}>
                    <Fieldset legend={"Usuario: "+this.state.usuario.id_usuario}>
                        <label htmlFor="usuario"><b>Usuario:</b></label>
                        <p id="usuario">{this.state.usuario.usuario}</p>
                        <label htmlFor="nombre"><b>Nombre:</b></label>
                        <p id="nombre">{this.state.usuario.nombre}</p>
                        <label htmlFor="apellido"><b>Apellido::</b></label>
                        <p id="apellido">{this.state.usuario.apellido}</p>
                        <label htmlFor="dni"><b>DNI::</b></label>
                        <p id="dni">{this.state.usuario.dni}</p>
                        <label htmlFor="direccion"><b>Direccion:</b></label>
                        <p id="direccion">{this.state.usuario.direccion}</p>
                        <label htmlFor="ciudad"><b>Ciudad:</b></label>
                        <p id="ciudad">{this.state.usuario.ciudad}</p>
                        <label htmlFor="codigoPostal"><b>Codigo Postal:</b></label>
                        <p id="codigoPostal">{this.state.usuario.codigo_postal}</p>
                        <label htmlFor="estado"><b>Estado:</b></label>
                        <p id="estado">{this.state.usuario.estado}</p>
                    </Fieldset>
                </Dialog>
                <Toast ref={(el) => this.toast = el} />
            </div>
        );
    }

    showShowDialog() {
        if (this.state.selectedUsuario && this.state.selectedUsuario.id_usuario) {
            this.setState({
                visibleShow: true,
                usuario: {
                    id_usuario: this.state.selectedUsuario.id_usuario,
                    usuario: this.state.selectedUsuario.usuario,
                    nombre: this.state.selectedUsuario.nombre,
                    apellido: this.state.selectedUsuario.apellido,
                    dni: this.state.selectedUsuario.dni,
                    direccion: this.state.selectedUsuario.direccion,
                    ciudad: this.state.selectedUsuario.ciudad,
                    codigo_postal: this.state.selectedUsuario.codigo_postal,
                    estado: this.state.selectedUsuario.estado
                }
            });
        } else {
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, seleccione un Usuario' });
        }
    }


}
