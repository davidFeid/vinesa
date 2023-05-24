import './FuncionPage.css';
import './Home.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {PeliculaService} from '../service/PeliculaService';
import {FuncionService} from "../service/FuncionService";
import {ButacaService} from "../service/ButacaService";
import {ButacaReservaService} from "../service/ButacaReservaService";
import {SalaService} from "../service/SalaService";
import {ReservaService} from "../service/ReservaService";
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import iconButaca from '../assets/icons/armchair.png';
import iconButacaDisabled from '../assets/icons/armchair-off.png';

function FuncionPage() {
    const { id } = useParams();
    const [funcion, setFuncion] = useState(null);
    const [sala, setSala] = useState(null);
    const [butacas, setButacas] = useState(null);
    const [butacasReserva, setButacasReserva] = useState(null);
    const [butacasSeleccionadas, setButacasSeleccionadas] = useState([]); // Array para almacenar las butacas seleccionadas

    const funcionService = new FuncionService();
    const salaService = new SalaService();
    const butacaService = new ButacaService();
    const butacaReservaService = new ButacaReservaService();
    const reservaService = new ReservaService();


    useEffect(() => {
        // Lógica para obtener los datos de la función
        const getFuncion = async () => {
            try {
                const responseFuncion = await funcionService.getById(id);
                setFuncion(responseFuncion);
            } catch (error) {
                console.error(error);
                // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
            }
        };

        getFuncion();
    }, [id]);

    useEffect(() => {
        // Lógica para obtener las butacas de la sala
        const getButacas = async () => {
            try {
                const responseButacas = await butacaService.getAllBySala(funcion.sala); // Asumiendo que la sala está disponible en `funcion.sala`
                setButacas(responseButacas);
            } catch (error) {
                console.error(error);
                // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
            }
        };

        const getReservas = async () => {
            try {
                const responseButacasReserva = await butacaReservaService.getReservasByFuncion(funcion.id_funcion) // Asumiendo que la sala está disponible en `funcion.sala`
                setButacasReserva(responseButacasReserva);
            } catch (error) {
                console.error(error);
                // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
            }
        };

        if (funcion) {
            getButacas();
            getReservas();
        }
    }, [funcion]);

    if (!funcion) {
        // Mientras se obtienen los datos de la película, puedes mostrar un indicador de carga o un mensaje
        return <div>Cargando pelicula...</div>;
    }
    if (!butacas) {
        // Mientras se obtienen los datos de la funcion, puedes mostrar un indicador de carga o un mensaje
        return <div>Cargando funcion...</div>;
    }
    if (!butacasReserva) {
        // Mientras se obtienen los datos de las butacas reservadas, puedes mostrar un indicador de carga o un mensaje
        return <div>Cargando Butacas Reservadas...</div>;
    }

    const handleMouseEnter = (fila, columna) => {
        const tooltip = document.getElementById(`tooltip-${fila}-${columna}`);
        tooltip.style.visibility = 'visible';
    };

    const handleMouseLeave = (fila, columna) => {
        const tooltip = document.getElementById(`tooltip-${fila}-${columna}`);
        tooltip.style.visibility = 'hidden';
    };

    const isButacaReservada = (id) => {
        return butacasReserva.some((butaca) => butaca.butaca.id === id);
    };

    const isButacaSeleccionada = (id) => {
        return butacasSeleccionadas.some((butaca) => butaca.id === id);
    };

    const toggleButacaSeleccionada = (id,button) => {
        const butaca = {id};
        // Comprobar si la butaca ya está seleccionada
        if (isButacaSeleccionada(id)) {
            // Eliminar la butaca del array de seleccionadas
            setButacasSeleccionadas((prevButacasSeleccionadas) =>
                prevButacasSeleccionadas.filter((b) => b.id !== id)
            );
            button.style.removeProperty("background-color");
        } else {
            // Agregar la butaca al array de seleccionadas
            setButacasSeleccionadas((prevButacasSeleccionadas) => [...prevButacasSeleccionadas, butaca]);
            button.style.backgroundColor = 'red';
        }
    };

    const enviarButacasSeleccionadas = () => {
        // Realiza la petición a la API con Axios
        /*axios.post('URL_DE_TU_API', butacasSeleccionadas)
            .then(response => {
                // Maneja la respuesta exitosa si es necesario
            })
            .catch(error => {
                // Maneja el error si es necesario
            });*/

        const precioPorButaca = funcion.precio; // Precio por butaca

        const numButacas = butacasSeleccionadas.length; // Número de butacas seleccionadas

        const precioTotal = numButacas * precioPorButaca;

        const objetoEnvio = {
            precio: precioTotal,
            estado: 1,
            arrayObjetos: butacasSeleccionadas,
            // Otros campos del objeto que desees enviar
        };
        console.log(objetoEnvio);
        reservaService.save(funcion.id_funcion,'usuario1',objetoEnvio)
            .then(data => {
                this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
            })
            .catch(error => {
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la reserva' });
            });
    };

    if(funcion && butacas && butacasReserva){
        const tablaButacas = Array(funcion.sala.filas).fill(null).map(() => Array(funcion.sala.butacasporfila).fill(null));

        // Recorre el array de butacas y asigna cada butaca a la posición correspondiente en la tablaButacas
        butacas.forEach((butaca) => {
            const { fila, columna } = butaca;
            tablaButacas[fila - 1][columna - 1] = butaca;
        });

        return (
            <div className={"container"}>
                <div className={"table-container"}>
                    <table>
                        <tbody>
                            {/*Recorre las filas de la tablaButacas*/}
                            {tablaButacas.map((fila, indexFila) => (
                                <tr key={indexFila}>
                                    <td>{indexFila + 1}</td>
                                    {/*Recorre las columnas de cada fila*/}
                                    {fila.map((butaca, indexColumna) => (
                                        <td key={indexColumna}>
                                            <div
                                                className="tooltip"
                                                onMouseEnter={() => handleMouseEnter(indexFila, indexColumna)}
                                                onMouseLeave={() => handleMouseLeave(indexFila, indexColumna)}
                                            >
                                                <Button id={butaca.id} disabled={isButacaReservada(butaca.id)} onClick={(e) => {
                                                    var button = (e.target.tagName == 'IMG') ? e.target.parentNode : e.target;
                                                    toggleButacaSeleccionada(butaca.id,button);
                                                }}>
                                                    <img src={isButacaReservada(butaca.id)
                                                        ? iconButacaDisabled
                                                        : iconButaca} alt="Image" width="25" />
                                                </Button>
                                                <span id={`tooltip-${indexFila}-${indexColumna}`} className="tooltiptext">
                                                    <div>Fila {indexFila +1 } Butaca {indexColumna +1}</div>
                                                </span>

                                            </div>
                                        </td>
                                    ))}
                                    <td>{indexFila + 1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Input hidden para guardar las butacas seleccionadas */}
                <input type="hidden" name="butacasSeleccionadas" value={JSON.stringify(butacasSeleccionadas)} />
                <Button onClick={enviarButacasSeleccionadas}>Enviar</Button>
            </div>
        );
    }



    /*return (
        <div>
            <table>
                <tbody>
                {/!*Recorre las filas de la tablaButacas*!/}
                {tablaButacas.map((fila, indexFila) => (
                    <tr key={indexFila}>
                        {/!*Recorre las columnas de cada fila*!/}
                        {fila.map((butaca, indexColumna) => (
                            <td key={indexColumna}>
                                {/!*Renderiza el contenido de cada butaca*!/}
                                {butaca && <button>{butaca.id_butaca}</button>}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );*/

}

export default FuncionPage;
