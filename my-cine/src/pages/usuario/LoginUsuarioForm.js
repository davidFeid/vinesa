import '../../App.css';
import './UsuarioForm.css';
import React, {Component} from "react";
import {UsuarioService} from "../../service/UsuarioService";

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import {AdminService} from "../../service/AdminService";

export default class LoginUsuarioForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario : {
                usuario: null,
                password: null
            }
        };
        this.UsuarioService = new UsuarioService();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes enviar el formulario al servidor
        this.UsuarioService.login(this.state.usuario)
            .then(data => {
                /*window.location.replace('/home');*/
                if(data === true){
                    const userInfo = {
                        authenticated: true,
                        role: 'user',
                        username: this.state.usuario.usuario
                    };

                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    window.location.replace('/home');
                }else{
                    this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al intentar iniciar sesion' });
                }
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
                            Iniciar Sesion
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
                            </div>
                            <div>
                                <div className="center-text button-area">
                                    <button type="submit" className="btn btn-save">Iniciar Sesion</button>
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
