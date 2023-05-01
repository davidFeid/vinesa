import '../../App.css';
import './LoginAdminForm.css';
import React, {Component} from "react";
import {AdminService} from "../../service/AdminService";

import { InputText } from 'primereact/inputtext';
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
                    username: 'johndoe'
                };

                sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                window.location.replace('/home');
            })
            .catch(error => {
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la película' });
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="login-form">
                <h2>Iniciar sesión</h2>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="username">Nombre de usuario</label>
                        <InputText id="username" type="number" onChange={this.handleUsernameChange} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="password">Contraseña</label>
                        <InputText id="password" type="password" onChange={this.handlePasswordChange} />
                    </div>
                    <Button type="submit" label="Iniciar sesión" />
                </div>
                <Toast ref={(el) => this.toast = el} />
            </form>
        );
    }
}

