import '../../App.css';
import './UsuarioForm.css';
import React, {Component} from "react";
import {UsuarioService} from "../../service/UsuarioService";

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import {AdminService} from "../../service/AdminService";

export default class RegisterUsuarioForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario : {
                usuario: null,
                password: null,
                direccion: null,
                codigo_postal: null,
                nombre: null,
                apellido: null,
                dni: null,
                ciudad: null
            }
        };
        this.UsuarioService = new UsuarioService();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes enviar el formulario al servidor
        this.UsuarioService.save(this.state.usuario)
            .then(data => {
                window.location.replace('/home');
            })
            .catch(error => {
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al intentar iniciar sesion' });
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div id="form-main-container">
                    <div id="form-area">
                        <div id="form-title">
                            Registrar Usuario
                        </div>
                        <div id="form-body">
                            <div>
                                <div className="col-12">
                                    <fieldset className="form-group">
                                        <label className="form-label" htmlFor="usuario">Usuario</label>
                                        <InputText id="usuario" type="text" className="form-control" required={true} onChange={(e) => {
                                            let val = e.target.value;
                                            this.setState(prevState =>{
                                                let usuario = Object.assign({}, prevState.usuario);
                                                usuario.usuario = val;
                                                return { usuario };
                                            })}
                                            } />
                                    </fieldset>
                                </div>
                                <div className="col-12">
                                    <fieldset className="form-group">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <InputText id="password" type="password" className="form-control" required={true} onChange={(e) => {
                                            let val = e.target.value;
                                            this.setState(prevState =>{
                                                let usuario = Object.assign({}, prevState.usuario);
                                                usuario.password = val;
                                                return { usuario };
                                            })}
                                        } />
                                    </fieldset>
                                </div>
                                <div className="col-3">
                                    <fieldset className="form-group">
                                        <label className="form-label" htmlFor="nombre">Nombre</label>
                                        <InputText id="nombre" type="text" className="form-control" required={true} onChange={(e) => {
                                            let val = e.target.value;
                                            this.setState(prevState =>{
                                                let usuario = Object.assign({}, prevState.usuario);
                                                usuario.nombre = val;
                                                return { usuario };
                                            })}
                                        } />
                                    </fieldset>
                                </div>
                                <div className="col-3">
                                    <fieldset className="form-group">
                                        <label className="form-label" htmlFor="apellido">Apellido</label>
                                        <InputText id="apellido" type="text" className="form-control" required={true} onChange={(e) => {
                                            let val = e.target.value;
                                            this.setState(prevState =>{
                                                let usuario = Object.assign({}, prevState.usuario);
                                                usuario.apellido = val;
                                                return { usuario };
                                            })}
                                        } />
                                    </fieldset>
                                </div>
                                <div className="col-3">
                                    <fieldset className="form-group">
                                        <label className="form-label" htmlFor="dni">DNI</label>
                                        <InputText id="dni" type="text" className="form-control" required={true} pattern="[0-9]{8}[A-Za-z]{1}" title="Debe poner 8 números y una letra" minlength="9" maxlength="9" onChange={(e) => {
                                            let val = e.target.value;
                                            this.setState(prevState =>{
                                                let usuario = Object.assign({}, prevState.usuario);
                                                usuario.dni = val;
                                                return { usuario };
                                            })}
                                        } />
                                    </fieldset>
                                </div>
                                <div className="col-3">
                                    <fieldset className="form-group">
                                        <label className="form-label" htmlFor="ciudad">Ciudad</label>
                                        <InputText id="ciudad" type="text" className="form-control" required={true} onChange={(e) => {
                                            let val = e.target.value;
                                            this.setState(prevState =>{
                                                let usuario = Object.assign({}, prevState.usuario);
                                                usuario.ciudad = val;
                                                return { usuario };
                                            })}
                                        } />
                                    </fieldset>
                                </div>
                                <div className="col-3">
                                    <fieldset className="form-group">
                                        <label className="form-label" htmlFor="codigo_postal">Codigo Postal</label>
                                        <InputText id="codigo_postal" type="text" className="form-control" maxlength="5" required={true} onChange={(e) => {
                                            let val = e.target.value;
                                            this.setState(prevState =>{
                                                let usuario = Object.assign({}, prevState.usuario);
                                                usuario.codigo_postal = val;
                                                return { usuario };
                                            })}
                                        } />
                                    </fieldset>
                                </div>
                                <div className="col-3">
                                    <fieldset className="form-group">
                                        <label className="form-label" htmlFor="direccion">Dirección</label>
                                        <InputText id="direccion" type="text" className="form-control" required={true} onChange={(e) => {
                                            let val = e.target.value;
                                            this.setState(prevState =>{
                                                let usuario = Object.assign({}, prevState.usuario);
                                                usuario.direccion = val;
                                                return { usuario };
                                            })}
                                        } />
                                    </fieldset>
                                </div>
                            </div>
                            <div>
                                <div className="center-text button-area">
                                    <button type="submit" className="btn btn-save">Registrar</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Toast ref={(el) => this.toast = el} />
            </form>

        );
    }
}
