import logo from '../../logo.svg';
import '../../App.css';
import React, {Component} from "react";
import {ButacaService} from "../../service/ButacaService";

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

export default class Butaca extends Component{
    constructor() {
        super();
        this.state= {
            butacas: [],
            visible : false,
            visibleShow : false,
            visibleImage : false,
            butaca : {
                Id:null,
                IdButaca:null,
                IdSala: null,
                fila: null,
                columna:null,
                estado:null
            },
            selectedButaca : {

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
        this.butacaService =new ButacaService();
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
        this.butacaService.getAll().then(data => this.setState({butacas: data}));
    }

    save(){
        const { IdButaca, IdSala, fila, columna} = this.save.butaca;
        if (!IdButaca || !IdSala || !fila || !columna ){
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, rellene todos los campos' });
            return; // Detenemos la ejecución del método save()
        }
        this.butacaService.save(this.state.butaca)
            .then(data =>{
                this.setState({
                    visible : false
                });
                this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                this.butacaService.getAll().then(data => this.setState({butacas: data}));
            })
            .catch(error => {
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la butaca' });
            });
    }

    edit() {
        const { IdButaca, IdSala, fila, columna} = this.save.butaca;
        if (!IdButaca || !IdSala || !fila || !columna ){
            this.toast.show({severity: 'warn', summary: 'Advertencia', detail: 'Por favor, rellene todos los campos'});
            return; // Detenemos la ejecución del método save()
        }
        this.butacaService.edit(this.state.butaca)
            .then(data => {
                this.setState({
                    visible: false
                });
                this.toast.show({severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente'});
                this.butacaService.getAll().then(data => this.setState({butaca : data}));
            })
            .catch(error => {
                this.toast.show({severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la butaca'
                });
            });
    }

    delete() {
        if (this.state.selectedButaca && this.state.selectedButaca.Id) {
            if(window.confirm("¿Realmente desea eliminar el registro '"+ this.state.selectedButaca.nombre +"' ?")){
                this.butacaService.delete(this.state.selectedButaca.Id)
                    .then(data => {
                        this.setState({
                            visible : false
                        });
                        this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                        this.butacaService.getAll().then(data => this.setState({butaca: data}));
                    })
                    .catch(error => {
                        this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la butaca' });
                    });
            }
        } else {
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, seleccione una butaca' });
        }
    }
    render(){
        return(
            <div style={{margin:'2em'}}>
                <Menubar model={this.items}></Menubar>
                <br/>
                <Panel header="Butacas">
                    <DataTable value={this.state.butacas} paginator={true} rows={10} rowsPerPageOptions={[5, 10, 25, 50]} removableSort  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                               currentPageReportTemplate="{first} to {last} of {totalRecords}" tableStyle={{ minWidth: '50rem' }} selectionMode={"single"} selection={this.state.selectedButaca} onSelectionChange={e => this.setState({selectedButaca: e.value, footer: this.footerEdit})}>
                        <Column sortable filter field="IdButaca" header="Id de la Butaca"></Column>
                        <Column sortable filter field="IdSala" header="Id Sala"></Column>
                        <Column sortable filter field="fila" header="Fila"></Column>
                        <Column sortable filter field="columna" header="Columna"></Column>
                        <Column sortable filter field="estado" header="Estado"></Column>
                    </DataTable>
                </Panel>
                <Dialog header="Crear Butaca" visible={this.state.visible} style={{ width: '400px' }} footer={this.state.footer} modal={true} onHide={() => this.setState({visible : false})}>
                    <form id="butaca-form">
                        <br/>
                        <span className="p-float-label">
                            <InputText value={this.state.butaca.IdButaca} style={{width: '100%'}} required id="IdButaca" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState =>{
                                    let butaca = Object.assign({}, prevState.butaca);
                                    butaca.IdButaca = val;
                                    return { butaca };
                                })}
                            }></InputText>
                            <label htmlFor="IdButaca">Id de la Butaca</label>
                        </span>
                        <br/>

                        <span className="p-float-label">
                            <InputText value={this.state.butaca.IdSala} style={{width: '100%'}} id="IdSala" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState =>{
                                    let butaca = Object.assign({}, prevState.butaca);
                                    butaca.IdSala = val;

                                    return { butaca };
                                })}
                            }></InputText>
                            <label htmlFor="IdSala">IdSala</label>
                        </span>
                        <br/>

                        <span className="p-float-label">
                            <InputText value={this.state.butaca.fila} style={{width: '100%'}} id="fila" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState =>{
                                    let butaca = Object.assign({}, prevState.butaca);
                                    butaca.fila = val;

                                    return { butaca };
                                })}
                            }></InputText>
                            <label htmlFor="fila">Filas</label>
                        </span>
                        <br/>

                        <span className="p-float-label">
                            <InputTextarea value={this.state.butaca.columna} style={{width: '100%'}} id="columna" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState =>{
                                    let butaca = Object.assign({}, prevState.butaca);
                                    butaca.columna = val;

                                    return { butaca };
                                })}
                            }></InputTextarea>
                            <label htmlFor="columna">Butacas por fila</label>
                        </span>
                        <br/>

                    </form>
                </Dialog>
                <Dialog header="Mostrar Butaca" visible={this.state.visibleShow} style={{ width: '70%' }} modal={true} onHide={() => this.setState({visibleShow : false})}>
                    <Fieldset legend={this.state.butaca.titulo}>
                        <label htmlFor="IdButaca"><b>Id de la Butaca:</b></label>
                        <p id="IdButaca">{this.state.butaca.IdButaca}</p>
                        <label htmlFor="IdSala"><b>Id Sala:</b></label>
                        <p id="IdSala">{this.state.butaca.IdSala}</p>
                        <label htmlFor="fila"><b>Filas:</b></label>
                        <p id="fila">{this.state.butaca.fila}</p>
                        <label htmlFor="columna"><b>Columna:</b></label>
                        <p id="columna">{this.state.butaca.columna}</p>
                        <label htmlFor="estado"><b>Estado:</b></label>
                        <p id="estado">{this.state.butaca.estado}</p>
                    </Fieldset>
                </Dialog>

                <Toast ref={(el) => this.toast = el} />
            </div>
        );
    }

    showSaveDialog(){
        this.setState({
            visible : true,
            butaca : {
                Id:null,
                IdButaca:null,
                IdSala: null,
                fila: null,
                columna:null,
                estado:null
            },
            footer: this.footerSave
        });
    }

    showEditDialog() {
        if (this.state.selectedButaca && this.state.selectedButaca.Id) {
            this.setState({
                visible: true,
                butaca: {
                    Id:this.state.selectedButaca.Id,
                    IdButaca:this.state.selectedButaca.IdButaca,
                    IdSala: this.state.selectedButaca.IdSala,
                    fila: this.state.selectedButaca.fila,
                    columna:this.state.selectedButaca.columna,
                    estado:this.state.selectedButaca.estado
                },
                footer: this.footerEdit
            });
        } else {
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, seleccione una butaca' });
        }
    }

    showShowDialog() {
        if (this.state.selectedButaca && this.state.selectedButaca.Id) {
            this.setState({
                visibleShow: true,
                butaca: {
                    Id: this.state.selectedButaca.Id,
                    IdButaca: this.state.selectedButaca.IdButaca,
                    IdSala: this.state.selectedButaca.IdSala,
                    fila: this.state.selectedButaca.fila,
                    columna: this.state.selectedButaca.columna,
                    estado: this.state.selectedButaca.estado
                }
            });
        } else {
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, seleccione una butaca' });
        }
    }

}
