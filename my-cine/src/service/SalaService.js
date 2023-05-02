import axios  from "axios";
import {renderToReadableStream} from "react-dom/server";

export class SalaService {
    baseUrl = `http://localhost:8080/CRUDRepo/`;
    getAll(){
        return axios.get(this.baseUrl +"ConsultarSalas").then(res => res.data);
    }

    save(sala){
        return axios.post(this.baseUrl + "CrearSala", sala)
            .then(res =>{
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

    edit(sala){
        return axios.put(this.baseUrl + "CrearSala/" + sala.idSala,sala)
            .then(res =>{
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

    delete(sala){
        return axios.delete(this.baseUrl + "EliminarSala/" + id)
            .then(res =>{
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
