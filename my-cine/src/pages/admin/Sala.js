import logo from '../../logo.svg';
import '../../App.css';
import React, {Component} from "react";
import {PeliculaService} from "../../service/PeliculaService";

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

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {SalaService} from "../../service/SalaService";
export default class Pelicula extends Component{
    constructor() {
        super();
        this.state= {
            salas: [],
            visible : false,
            visibleShow : false,
            visibleImage : false,
            sala : {
                IdSala:null,
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
            {
                label : 'Mostrar Imagen',
                icon : 'pi pi-fw pi-image',
                command : () => {this.showImageDialog()}
            },
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
        this.salaService.getAll().then(data => this.setState({salas: data}));
    }

    save(){
        const { nombre,tipo,filas,butacasporfila} = this.save.sala;
        if (!nombre || !tipo || !filas || !butacasporfila){
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
        const {nombre, tipo, filas, butacasporfila} = this.save.sala;
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
        if (this.state.selectedSala && this.state.selectedSala.IdSala) {
            if(window.confirm("¿Realmente desea eliminar el registro '"+ this.state.selectedSala.nombre +"' ?")){
                this.salaService.delete(this.state.selectedSala.IdSala)
                    .then(data => {
                        this.setState({
                            visible : false
                        });
                        this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                        this.salaService.getAll().then(data => this.setState({sala: data}));
                    })
                    .catch(error => {
                        this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la sala' });
                    });
            }
        } else {
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, seleccione una sala' });
        }
    }
}
