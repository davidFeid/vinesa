import axios  from "axios";
import {renderToReadableStream} from "react-dom/server";

export class ReservaService {
    baseUrl = `http://localhost:8080/AdminReserva/`

    save(funcion,usuario,reserva){
        return axios.post(this.baseUrl + "CrearReserva/" + funcion + '/' + usuario, reserva)
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
