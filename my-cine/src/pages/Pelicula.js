import logo from '../logo.svg';
import '../App.css';
import React, {Component} from "react";
import {PeliculaService} from "../service/PeliculaService";

import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Pelicula extends Component{
    constructor() {
        super();
        this.state= {
            peliculas: [],
            visible : false,
            pelicula : {
                idPelicula: null,
                titulo: null,
                directores: null,
                actores: null,
                descripcion: null,
                genero: null,
                imagen: null,
                video: null,
                estado: null
            },
            selectedPelicula : {

            }
        };
        this.items = [
            {
                label : 'Nuevo',
                icon : 'pi pi-fw pi-plus',
                command : () => {this.showSaveDialog()}
            },
            {
                label : 'Editar',
                icon : 'pi pi-fw pi-pencil',
                command : () => {this.showEditDialog()}
            },
            {
                label : 'Eliminar',
                icon : 'pi pi-fw pi-trash',
                command : () => {this.delete()}
            }
        ];
        this.peliculaService = new PeliculaService();
        this.save = this.save.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.footerSave = (
            <div>
                <Button type="submit" label="Guardar" icon="pi pi-check" onClick={this.save}/>
            </div>
        );
        this.footerEdit = (
            <div>
                <Button type="submit" label="Editar" icon="pi pi-check" onClick={this.edit}/>
            </div>
        );
    }

    componentDidMount() {
        this.peliculaService.getAll().then(data => this.setState({peliculas: data}));
    }

    save() {
        const { titulo, directores, actores, descripcion, genero, imagen, video } = this.state.pelicula;
        if (!titulo || !directores || !actores || !descripcion || !genero || !imagen || !video) { // Si faltan campos por rellenar
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, rellene todos los campos' });
            return; // Detenemos la ejecución del método save()
        }
        this.peliculaService.save(this.state.pelicula)
            .then(data => {
                this.setState({
                    visible : false
                });
                this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                this.peliculaService.getAll().then(data => this.setState({peliculas: data}));
            })
            .catch(error => {
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la película' });
            });
    }

    edit(){
        const { titulo, directores, actores, descripcion, genero, imagen, video } = this.state.pelicula;
        if (!titulo || !directores || !actores || !descripcion || !genero || !imagen || !video) { // Si faltan campos por rellenar
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, rellene todos los campos' });
            return; // Detenemos la ejecución del método save()
        }
        this.peliculaService.edit(this.state.pelicula)
            .then(data => {
                this.setState({
                    visible : false
                });
                this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                this.peliculaService.getAll().then(data => this.setState({peliculas: data}));
            })
            .catch(error => {
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la película' });
            });
    }

    delete() {
        if (this.state.selectedPelicula && this.state.selectedPelicula.idPelicula) {
            if(window.confirm("¿Realmente desea eliminar el registro '"+ this.state.selectedPelicula.titulo +"' ?")){
                this.peliculaService.delete(this.state.selectedPelicula.idPelicula)
                    .then(data => {
                        this.setState({
                            visible : false
                        });
                        this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                        this.peliculaService.getAll().then(data => this.setState({peliculas: data}));
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
                    <DataTable value={this.state.peliculas} paginator={true} rows={10} rowsPerPageOptions={[5, 10, 25, 50]} removableSort  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                               currentPageReportTemplate="{first} to {last} of {totalRecords}" tableStyle={{ minWidth: '50rem' }} selectionMode={"single"} selection={this.state.selectedPelicula} onSelectionChange={e => this.setState({selectedPelicula: e.value, footer: this.footerEdit})}>
                        <Column sortable filter field="idPelicula" header="Id Pelicula"></Column>
                        <Column sortable filter field="titulo" header="Titulo"></Column>
                        <Column sortable filter field="directores" header="Directores"></Column>
                        <Column sortable filter field="actores" header="Actores"></Column>
                        <Column sortable filter field="descripcion" header="Descripcion"></Column>
                        <Column sortable filter field="genero" header="Genero"></Column>
                        <Column sortable filter field="imagen" header="Imagen"></Column>
                        <Column sortable filter field="video" header="Video"></Column>
                        <Column sortable filter field="estado" header="Estado"></Column>
                    </DataTable>
                </Panel>
                <Dialog header="Crear Pelicula" visible={this.state.visible} style={{ width: '400px' }} footer={this.state.footer} modal={true} onHide={() => this.setState({visible : false})}>
                    <form id="pelicula-form">
                        <br/>
                        <span className="p-float-label">
                        <InputText value={this.state.pelicula.titulo} style={{width: '100%'}} required id="titulo" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let pelicula = Object.assign({}, prevState.pelicula);
                                pelicula.titulo = val;
                                return { pelicula };
                            })}
                        }></InputText>
                        <label htmlFor="titulo">Titulo</label>
                    </span>
                        <br/>
                        <span className="p-float-label">
                        <InputText value={this.state.pelicula.directores} style={{width: '100%'}} id="directores" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let pelicula = Object.assign({}, prevState.pelicula);
                                pelicula.directores = val;

                                return { pelicula };
                            })}
                        }></InputText>
                        <label htmlFor="directores">Directores</label>
                    </span>
                        <br/>
                        <span className="p-float-label">
                        <InputText value={this.state.pelicula.actores} style={{width: '100%'}} id="actores" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let pelicula = Object.assign({}, prevState.pelicula);
                                pelicula.actores = val;

                                return { pelicula };
                            })}
                        }></InputText>
                        <label htmlFor="actores">Actores</label>
                    </span>
                        <br/>
                        <span className="p-float-label">
                        <InputText value={this.state.pelicula.descripcion} style={{width: '100%'}} id="descripcion" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let pelicula = Object.assign({}, prevState.pelicula);
                                pelicula.descripcion = val;

                                return { pelicula };
                            })}
                        }></InputText>
                        <label htmlFor="descripcion">Descripcion</label>
                    </span>
                        <br/>
                        <span className="p-float-label">
                        <InputText value={this.state.pelicula.genero} style={{width: '100%'}} id="genero" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let pelicula = Object.assign({}, prevState.pelicula);
                                pelicula.genero = val;

                                return { pelicula };
                            })}
                        }></InputText>
                        <label htmlFor="genero">Genero</label>
                    </span>
                        <br/>
                        <span className="p-float-label">
                        <InputText value={this.state.pelicula.imagen} style={{width: '100%'}} id="imagen" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let pelicula = Object.assign({}, prevState.pelicula);
                                pelicula.imagen = val;

                                return { pelicula };
                            })}
                        }></InputText>
                        <label htmlFor="imagen">Imagen</label>
                    </span>
                        <br/>
                        <span className="p-float-label">
                        <InputText value={this.state.pelicula.video} style={{width: '100%'}} id="video" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let pelicula = Object.assign({}, prevState.pelicula);
                                pelicula.video = val;

                                return { pelicula };
                            })}
                        }></InputText>
                        <label htmlFor="video">Video</label>
                    </span>
                    </form>
                </Dialog>
                <Toast ref={(el) => this.toast = el} />
            </div>
        );
    }

    showSaveDialog(){
        this.setState({
            visible : true,
            pelicula : {
                idPelicula: null,
                titulo: null,
                directores: null,
                actores: null,
                descripcion: null,
                genero: null,
                imagen: null,
                video: null,
                estado: null
            },
            footer: this.footerSave
        });
    }

    showEditDialog() {
        if (this.state.selectedPelicula && this.state.selectedPelicula.idPelicula) {
            this.setState({
                visible: true,
                pelicula: {
                    idPelicula: this.state.selectedPelicula.idPelicula,
                    titulo: this.state.selectedPelicula.titulo,
                    directores: this.state.selectedPelicula.directores,
                    actores: this.state.selectedPelicula.actores,
                    descripcion: this.state.selectedPelicula.descripcion,
                    genero: this.state.selectedPelicula.genero,
                    imagen: this.state.selectedPelicula.imagen,
                    video: this.state.selectedPelicula.video,
                    estado: this.state.selectedPelicula.estado
                },
                footer: this.footerEdit
            });
        } else {
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, seleccione una película' });
        }
    }

}
