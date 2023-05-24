import axios  from "axios";
import {renderToReadableStream} from "react-dom/server";

export class ButacaReservaService {
    baseUrl = `http://localhost:8080/AdminButacaReserva/`

    getReservasByFuncion(id){
        return axios.get(this.baseUrl + "BuscarReservasPorFuncion/" + id)
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
