import logo from '../../logo.svg';
import '../../App.css';
import React, {Component} from "react";
import {SalaService} from "../../service/SalaService";

import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Fieldset } from 'primereact/fieldset';


import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Sala extends Component{
    constructor() {
        super();
        this.state= {
            salas: [],
            visible : false,
            visibleShow : false,
            visibleImage : false,
            sala : {
                id_sala:null,
                nombre:null,
                tipo: null,
                filas: null,
                butacasporfila:null,
                estado:null
            },
            selectedSala : {

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
                label : 'Mostrar',
                icon : 'pi pi-fw pi-eye',
                command : () => {this.showShowDialog()}
            },
            /*{
                label : 'Mostrar Imagen',
                icon : 'pi pi-fw pi-image',
                command : () => {this.showImageDialog()}
            },*/
            {
                label : 'Activar / Desactivar',
                icon : 'pi pi-fw pi-trash',
                command : () => {this.delete()}
            }
        ];
        this.salaService =new SalaService();
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
        this.salaService.getAll().then(data => this.setState({salas: data}))
    }

    save(){
        const { nombre,tipo,filas,butacasporfila} = this.state.sala;
        if ( !nombre || !tipo || !filas || !butacasporfila){
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, rellene todos los campos' });
            return; // Detenemos la ejecución del método save()
        }
        this.salaService.save(this.state.sala)
            .then(data =>{
                this.setState({
                    visible : false
                });
                this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                this.salaService.getAll().then(data => this.setState({salas: data}));
            })
            .catch(error => {
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la sala' });
            });
    }

    edit() {
        const {nombre, tipo, filas, butacasporfila} = this.state.sala;
        if (!nombre || !tipo || !filas || !butacasporfila) {
            this.toast.show({severity: 'warn', summary: 'Advertencia', detail: 'Por favor, rellene todos los campos'});
            return; // Detenemos la ejecución del método save()
        }
        this.salaService.edit(this.state.sala)
            .then(data => {
                this.setState({
                    visible: false
                });
                this.toast.show({severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente'});
                this.salaService.getAll().then(data => this.setState({sala : data}));
            })
            .catch(error => {
                this.toast.show({severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la sala'
                });
            });
    }

    delete() {
        if (this.state.selectedSala && this.state.selectedSala.id_sala) {
            if(window.confirm("¿Realmente desea eliminar el registro '"+ this.state.selectedSala.nombre +"' ?")){
                this.salaService.delete(this.state.selectedSala.id_sala)
                    .then(data => {
                        this.setState({
                            visible : false
                        });
                        this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                        this.salaService.getAll().then(data => this.setState({salas: data}));
                    })
                    .catch(error => {
                        this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la sala' });
                    });
            }
        } else {
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, seleccione una sala' });
        }
    }
    render(){
        return(
            <div style={{margin:'2em'}}>
                <Menubar model={this.items}></Menubar>
                <br/>
                <Panel header="Salas">
                    <DataTable value={this.state.salas} paginator={true} rows={10} rowsPerPageOptions={[5, 10, 25, 50]} removableSort  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                               currentPageReportTemplate="{first} to {last} of {totalRecords}" tableStyle={{ minWidth: '50rem' }} selectionMode={"single"} selection={this.state.selectedSala} onSelectionChange={e => this.setState({selectedSala: e.value, footer: this.footerEdit})}>
                        <Column sortable filter field="id_sala" header="Id Sala"></Column>
                        <Column sortable filter field="nombre" header="Nombre"></Column>
                        <Column sortable filter field="tipo" header="Tipos de Sala"></Column>
                        <Column sortable filter field="filas" header="Filas"></Column>
                        <Column sortable filter field="butacasporfila" header="Butacas por Fila"></Column>
                        <Column sortable filter field="estado" header="Estado"></Column>
                    </DataTable>
                </Panel>
                <Dialog header="Crear Sala" visible={this.state.visible} style={{ width: '400px' }} footer={this.state.footer} modal={true} onHide={() => this.setState({visible : false})}>
                    <form id="sala-form">
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.sala.nombre} style={{width: '100%'}} required id="nombre" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState =>{
                                    let sala = Object.assign({}, prevState.sala);
                                    sala.nombre = val;
                                    return { sala };
                                })}
                            }></InputText>
                            <label htmlFor="nombre">Nombre de la Sala</label>
                        </span>
                        <br/>

                        <span className="p-float-label">
                            <InputText value={this.state.sala.tipo} style={{width: '100%'}} id="tipo" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState =>{
                                    let sala = Object.assign({}, prevState.sala);
                                    sala.tipo = val;

                                    return { sala };
                                })}
                            }></InputText>
                            <label htmlFor="tipo">Tipo de salas</label>
                        </span>
                        <br/>

                        <span className="p-float-label">
                            <InputText value={this.state.sala.filas} style={{width: '100%'}} id="filas" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState =>{
                                    let sala = Object.assign({}, prevState.sala);
                                    sala.filas = val;

                                    return { sala };
                                })}
                            }></InputText>
                            <label htmlFor="filas">Filas</label>
                        </span>
                        <br/>

                        <span className="p-float-label">
                            <InputText value={this.state.sala.butacasporfila} style={{width: '100%'}} id="butacasporfila" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState =>{
                                    let sala = Object.assign({}, prevState.sala);
                                    sala.butacasporfila = val;

                                    return { sala };
                                })}
                            }></InputText>
                            <label htmlFor="butacasporfila">ButacasFila</label>
                        </span>
                        <br/>

                    </form>
                </Dialog>
                <Dialog header="Mostrar Sala" visible={this.state.visibleShow} style={{ width: '70%' }} modal={true} onHide={() => this.setState({visibleShow : false})}>
                    <Fieldset legend={this.state.sala.titulo}>
                        <label htmlFor="nombre"><b>Nombre de la Sala:</b></label>
                        <p id="nombre">{this.state.sala.nombre}</p>
                        <label htmlFor="tipo"><b>Tipo de Sala:</b></label>
                        <p id="tipo">{this.state.sala.tipo}</p>
                        <label htmlFor="filas"><b>Filas:</b></label>
                        <p id="filas">{this.state.sala.filas}</p>
                        <label htmlFor="butacasporfila"><b>butacas por fila:</b></label>
                        <p id="butacasporfila">{this.state.sala.butacasporfila}</p>
                        <label htmlFor="estado"><b>Estado:</b></label>
                        <p id="estado">{this.state.sala.estado}</p>
                    </Fieldset>
                </Dialog>

                <Toast ref={(el) => this.toast = el} />
            </div>
        );
    }

    showSaveDialog(){
        this.setState({
            visible : true,
            sala : {
                id_sala:null,
                nombre:null,
                tipo: null,
                filas: null,
                butacasporfila:null,
                estado:null
            },
            footer: this.footerSave
        });
    }

    showEditDialog() {
        if (this.state.selectedSala && this.state.selectedSala.id_sala) {
            this.setState({
                visible: true,
                sala: {
                    id_sala: this.state.selectedSala.id_sala,
                    nombre:this.state.selectedSala.nombre,
                    tipo: this.state.selectedSala.tipo,
                    filas: this.state.selectedSala.filas,
                    butacasporfila: this.state.selectedSala.butacasporfila,
                    estado:this.state.selectedSala.estado
                },
                footer: this.footerEdit
            });
        } else {
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, seleccione una sala' });
        }
    }

    showShowDialog() {
        if (this.state.selectedSala && this.state.selectedSala.id_sala) {
            this.setState({
                visibleShow: true,
                sala: {
                    id_sala: this.state.selectedSala.id_sala,
                    nombre:this.state.selectedSala.nombre,
                    tipo: this.state.selectedSala.tipo,
                    filas: this.state.selectedSala.filas,
                    butacasporfila: this.state.selectedSala.butacasporfila,
                    estado:this.state.selectedSala.estado
                }
            });
        } else {
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, seleccione una sala' });
        }
    }

}
