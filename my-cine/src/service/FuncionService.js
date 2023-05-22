import axios from 'axios'
export class FuncionService{

    baseUrl = `http://localhost:8080/AdminFuncion/`;

    getAll(){
        return axios.get(this.baseUrl+'ConsultarFuncion').then(res => res.data);
    }

    save(funcion) {
        return axios.post(this.baseUrl + "CrearFuncion/"+ funcion.id_sala + "/" + funcion.id_pelicula, funcion)
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
    edit(funcion) {
        return axios.put(this.baseUrl + "ModificarFuncion/" + funcion.id_funcion, funcion)
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

    delete(id) {
        return axios.delete(this.baseUrl + "EliminarFuncion/" + id)
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
    BuscarFuncionByPelicula(id) {
        return axios.get(this.baseUrl + "BuscarFuncionByPelicula/" + id)
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
