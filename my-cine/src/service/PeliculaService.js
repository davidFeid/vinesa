import axios from 'axios'
export class PeliculaService{

    baseUrl = `http://localhost:8080/CRUDRepo/`;

    getAll(){
        return axios.get(this.baseUrl+'ConsultarPeliculas').then(res => res.data);
    }

    save(pelicula) {
        return axios.post(this.baseUrl + "CrearPeliculas", pelicula)
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
    edit(pelicula) {
        return axios.put(this.baseUrl + "ModificarPelicula/" + pelicula.idPelicula, pelicula)
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
        return axios.delete(this.baseUrl + "EliminarPelicula/" + id)
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
