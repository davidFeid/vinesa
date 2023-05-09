import axios from 'axios'

export class UsuarioService{

    baseUrl = `http://localhost:8080/AdminUsuario/`;

    getAll(){
        return axios.get(this.baseUrl+'ConsultarUsuarios').then(res => res.data);
    }

    delete(id) {
        return axios.delete(this.baseUrl + "EliminarUsuario/" + id)
            .then(res => {
                if (res.status === 201 || res.status === 200) { // si la petición se hizo con éxito
                    return res.data; // retornar la data de la respuesta
                } else { // si hubo un error en la petición
                    throw new Error('Hubo un error en la petición'); // lanzar una excepción para manejar el error
                }
            })
            .catch(error => {
                console.error(error); // manejar el error
            });
    }

}
