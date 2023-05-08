import axios from 'axios'

export class UsuarioService{

    baseUrl = `http://localhost:8080/AdminUsuario/`;

    getAll(){
        return axios.get(this.baseUrl+'ConsultarUsuarios').then(res => res.data);
    }


}
