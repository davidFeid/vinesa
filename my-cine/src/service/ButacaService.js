import axios  from "axios";
import {renderToReadableStream} from "react-dom/server";

export class ButacaService {
    baseUrl = `http://localhost:8080/CRUDRepo/`;
    getAll(){
        return axios.get(this.baseUrl +"ConsultarButacas").then(res => res.data);
    }

    save(butaca){
        return axios.post(this.baseUrl + "CrearButaca", butaca)
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

    edit(butaca){
        return axios.put(this.baseUrl + "ModificarButaca/" + butaca.IdButaca,butaca)
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

    delete(id){
        return axios.delete(this.baseUrl + "EliminarButaca/" + id)
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
