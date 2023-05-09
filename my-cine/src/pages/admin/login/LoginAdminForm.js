import '../../../App.css';
import './LoginAdminForm.css';
import React, {Component} from "react";
import {AdminService} from "../../../service/AdminService";

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default class LoginAdminForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin : {
                idAdmin: null,
                password: null
            }
        };
        this.AdminService = new AdminService();
    }

    handleUsernameChange = (event) => {
        this.setState({
            admin: {
                ...this.state.admin, // Hacer una copia del objeto admin actual
                idAdmin: event.target.value // Actualizar la propiedad idAdmin
            }
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            admin: {
                ...this.state.admin, // Hacer una copia del objeto admin actual
                password: event.target.value // Actualizar la propiedad password
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes enviar el formulario al servidor
        this.AdminService.getById(this.state.admin)
            .then(data => {
                this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                // Guardar la información del usuario en el sessionStorage
                const userInfo = {
                    authenticated: true,
                    role: 'admin',
                    username: 'admin'
                };

                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                window.location.replace('/home');
            })
            .catch(error => {
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al intentar iniciar sesion' });
            });
    }

    render() {
        return (
        <div className="container">
            <div className="screen">
                <div className="screenContent">
                    <form onSubmit={this.handleSubmit} className="login">
                        <h2 className="loginAdmin">Login Admin</h2>
                        <div className="loginField">
                            <i className="pi pi-user" style={{ fontSize: '1rem' }}></i>
                            <label htmlFor="username"> Id Admin</label>
                            <InputText  class="loginInput" id="username" type="number" onChange={this.handleUsernameChange} />
                        </div>
                        <div className="loginField">
                            <i className="pi pi-lock" style={{ fontSize: '1rem' }}></i>
                            <label htmlFor="password"> Contraseña</label>
                            <InputText  class="loginInput" id="password" type="password" onChange={this.handlePasswordChange} />
                        </div>
                        <button type="submit"  class="button login__submit">
                            <span className="button__text">Log In Admin</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>

                        <Toast ref={(el) => this.toast = el} />
                    </form>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>

        );
    }
}

