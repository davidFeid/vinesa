import './PeliculaPage.css';
import './Home.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {PeliculaService} from '../service/PeliculaService';
import {FuncionService} from "../service/FuncionService";
import {ButacaService} from "../service/ButacaService";
import {ButacaReservaService} from "../service/ButacaReservaService";
import {Dialog} from "primereact/dialog";
import {SalaService} from "../service/SalaService"; // Importa la clase directamente

function FuncionPage() {
    const { id } = useParams();
    const [funcion, setFuncion] = useState(null);
    const [sala, setSala] = useState(null);
    const [butacas, setButacas] = useState(null);
    const [butacasReserva, setButacasReserva] = useState(null);

    const funcionService = new FuncionService();
    const salaService = new SalaService();
    const butacaService = new ButacaService();
    const butacaReservaService = new ButacaReservaService();

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

    {
        console.log(butacas);
    }

    if(funcion && butacas && butacasReserva){
        console.log(butacas, butacasReserva);
        const tablaButacas = Array(funcion.sala.filas).fill(null).map(() => Array(funcion.sala.butacasporfila).fill(null));

        // Recorre el array de butacas y asigna cada butaca a la posición correspondiente en la tablaButacas
        butacas.forEach((butaca) => {
            const { fila, columna } = butaca;
            tablaButacas[fila - 1][columna - 1] = butaca;
        });

        return (
            <table>
                <tbody>
                {/*Recorre las filas de la tablaButacas*/}
                {tablaButacas.map((fila, indexFila) => (
                    <tr key={indexFila}>
                        {/*Recorre las columnas de cada fila*/}
                        {fila.map((butaca, indexColumna) => (
                            <td key={indexColumna}>
                                {/*Renderiza el contenido de cada butaca*/}
                                {butaca && (
                                    <button disabled={!butaca.estado}>{butaca.id_butaca}</button>
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
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
