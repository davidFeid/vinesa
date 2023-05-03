import React, {Component} from "react";
import {FuncionService} from "../../service/FuncionService";
import {Button} from "primereact/button";
import {Menubar} from "primereact/menubar";
import {Panel} from "primereact/panel";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Fieldset} from "primereact/fieldset";
import {Toast} from "primereact/toast";

export default class Funcion extends Component{
    constructor() {
        super();
        this.state = {
            funciones:[],
            visible : false,
            visibleShow : false,
            visibleImage : false,
            funcion:{
                id_funcion: null,
                id_sala: null,
                id_pelicula: null,
                horario: null,
                fecha: null,
                precio: null,
                estado: null
            },
            selectedFuncion : {

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
        this.funcionService = new FuncionService();
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
        this.funcionService.getAll().then(data => this.setState({funciones: data}));
    }
    save(){
        const { id_sala, id_pelicula,horario, fecha, precio, estado}=this.state.funcion;
        if(!id_sala || !id_pelicula || !horario || !fecha || !precio || !estado){
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, rellene todos los campos' });
            return;
        }
        this.funcionService.save(this.state.funcion)
            .then(data => {
                this.setState({
                    visible : false
                });
                this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                this.funcionService.getAll().then(data => this.setState({funciones: data}));
            })
            .catch(error => {
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la funcion' });
            });
    }

    edit(){
        const { id_sala, id_pelicula,horario, fecha, precio, estado}=this.state.funcion;
        if(!id_sala || !id_pelicula || !horario || !fecha || !precio || !estado){
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, rellene todos los campos' });
            return; // Detenemos la ejecución del método save()
        }
        this.funcionService.edit(this.state.funcion)
            .then(data => {
                this.setState({
                    visible : false
                });
                this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                this.funcionService.getAll().then(data => this.setState({funcion: data}));
            })
            .catch(error => {
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la funcion' });
            });
    }
    delete() {
        if (this.state.selectedFuncion && this.state.selectedFuncion.id_funcion) {
            if(window.confirm("¿Realmente desea eliminar el registro '"+ this.state.selectedFuncion.id_funcion +"' ?")){
                this.funcionService.delete(this.state.selectedFuncion.id_funcion)
                    .then(data => {
                        this.setState({
                            visible : false
                        });
                        this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                        this.funcionService.getAll().then(data => this.setState({funcion: data}));
                    })
                    .catch(error => {
                        this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la funcion' });
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
                <Panel header="Funciones">
                    <DataTable value={this.state.funciones} paginator={true} rows={10} rowsPerPageOptions={[5, 10, 25, 50]} removableSort  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                               currentPageReportTemplate="{first} to {last} of {totalRecords}" tableStyle={{ minWidth: '50rem' }} selectionMode={"single"} selection={this.state.selectedFuncion} onSelectionChange={e => this.setState({selectedFuncion: e.value, footer: this.footerEdit})}>
                        <Column sortable filter field="id_funcion" header="Id Funcion"></Column>
                        <Column sortable filter field="id_sala" header="Id Sala"></Column>
                        <Column sortable filter field="id_pelicula" header="Id Pelicula"></Column>
                        <Column sortable filter field="horario" header="Horario"></Column>
                        <Column sortable filter field="fecha" header="Fecha"></Column>
                        <Column sortable filter field="precio" header="Precio"></Column>
                        <Column sortable filter field="estado" header="Estado"></Column>


                    </DataTable>
                </Panel>
                <Dialog header="Crear Funcion" visible={this.state.visible} style={{ width: '400px' }} footer={this.state.footer} modal={true} onHide={() => this.setState({visible : false})}>
                    <form id="funcion-form">
                        <br/>
                        <span className="p-float-label">
                        <InputText value={this.state.funcion.id_sala} style={{width: '100%'}} required id="id_sala" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let funcion = Object.assign({}, prevState.funcion);
                                funcion.id_sala = val;
                                return { funcion };
                            })}
                        }></InputText>
                        <label htmlFor="id_sala">Id Sala</label>
                    </span>
                        <br/>
                        <span className="p-float-label">
                        <InputText value={this.state.funcion.id_pelicula} style={{width: '100%'}} id="id_pelicula" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let funcion = Object.assign({}, prevState.funcion);
                                funcion.id_pelicula = val;

                                return { funcion };
                            })}
                        }></InputText>
                        <label htmlFor="id_pelicula">Id Pelicula</label>
                    </span>
                        <br/>
                        <span className="p-float-label">
                        <InputText value={this.state.funcion.horario} style={{width: '100%'}} id="horario" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let funcion = Object.assign({}, prevState.funcion);
                                funcion.horario = val;

                                return { funcion };
                            })}
                        }></InputText>
                        <label htmlFor="horario">Horario</label>
                    </span>
                        <br/>
                        <span className="p-float-label">
                        <InputTextarea value={this.state.funcion.fecha} style={{width: '100%'}} id="fecha" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let funcion = Object.assign({}, prevState.funcion);
                                funcion.fecha = val;

                                return { funcion };
                            })}
                        }></InputTextarea>
                        <label htmlFor="fecha">Fecha</label>
                    </span>
                        <br/>
                        <span className="p-float-label">
                        <InputText value={this.state.funcion.precio} style={{width: '100%'}} id="precio" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let funcion = Object.assign({}, prevState.funcion);
                                funcion.precio = val;

                                return { funcion };
                            })}
                        }></InputText>
                        <label htmlFor="precio">Precio</label>
                    </span>
                        <br/>
                        <span className="p-float-label">
                        <InputText value={this.state.funcion.estado} style={{width: '100%'}} id="estado" onChange={(e) => {
                            let val = e.target.value;
                            this.setState(prevState =>{
                                let funcion = Object.assign({}, prevState.funcion);
                                funcion.estado = val;

                                return { funcion };
                            })}
                        }></InputText>
                        <label htmlFor="estado">Estado</label>
                    </span>
                    </form>
                </Dialog>
                <Dialog header="Mostrar Funcion" visible={this.state.visibleShow} style={{ width: '70%' }} modal={true} onHide={() => this.setState({visibleShow : false})}>
                    <Fieldset legend={this.state.funcion.id_funcion}>
                        <label htmlFor="id_sala"><b>Id Sala:</b></label>
                        <p id="id_sala">{this.state.funcion.id_sala}</p>
                        <label htmlFor="id_pelicula"><b>Id Pelicula:</b></label>
                        <p id="id_pelicula">{this.state.funcion.id_pelicula}</p>
                        <label htmlFor="horario"><b>Horario:</b></label>
                        <p id="horario">{this.state.funcion.horario}</p>
                        <label htmlFor="fecha"><b>Fecha:</b></label>
                        <p id="fecha">{this.state.funcion.fecha}</p>
                        <label htmlFor="precio"><b>Precio:</b></label>
                        <p id="precio">{this.state.funcion.precio}</p>
                        <label htmlFor="estado"><b>Estado:</b></label>
                        <p id="estado">{this.state.funcion.estado}</p>
                    </Fieldset>
                </Dialog>
                <Toast ref={(el) => this.toast = el} />
            </div>
        );
    }
    showSaveDialog(){
        this.setState({
            visible : true,
            funcion : {
                id_funcion: null,
                id_sala: null,
                id_pelicula: null,
                horario: null,
                fecha: null,
                precio: null,
                estado: null
            },
            footer: this.footerSave
        });
    }

    showEditDialog() {
        if (this.state.selectedFuncion && this.state.selectedFuncion.id_funcion) {
            this.setState({
                visible: true,
                funcion: {
                    id_funcion: this.state.selectedFuncion.id_funcion,
                    id_sala: this.state.selectedFuncion.id_sala,
                    id_pelicula: this.state.selectedFuncion.id_pelicula,
                    horario: this.state.selectedFuncion.horario,
                    fecha: this.state.selectedFuncion.fecha,
                    precio: this.state.selectedFuncion.precio,
                    estado: this.state.selectedFuncion.estado
                },
                footer: this.footerEdit
            });
        } else {
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, seleccione una película' });
        }
    }

    showShowDialog() {
        if (this.state.selectedFuncion && this.state.selectedFuncion.id_funcion) {
            this.setState({
                visibleShow: true,
                funcion: {
                    id_funcion: this.state.selectedFuncion.id_funcion,
                    id_sala: this.state.selectedFuncion.id_sala,
                    id_pelicula: this.state.selectedFuncion.id_pelicula,
                    horario: this.state.selectedFuncion.horario,
                    fecha: this.state.selectedFuncion.fecha,
                    precio: this.state.selectedFuncion.precio,
                    estado: this.state.selectedFuncion.estado
                }
            });
        } else {
            this.toast.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, seleccione una funcion' });
        }
    }

}