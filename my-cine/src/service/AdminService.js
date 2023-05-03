import axios from 'axios'

export class AdminService{
    baseUrl = `http://localhost:8080/Admin/`;

    getById(admin){
        return axios.post(this.baseUrl + "LoginAdmin", admin)
            .then(res => {
                if (res.status === 200 && res.data === true) { // si la petición se hizo con éxito
                    return res.data; // retornar la data de la respuesta
                } else { // si hubo un error en la petición
                    throw new Error('Hubo un error en la petición'); // lanzar una excepción para manejar el error
                }
            })
            .catch(error => {
                console.error(error); // manejar el error
                return Promise.reject(error);
            });
    }

}
