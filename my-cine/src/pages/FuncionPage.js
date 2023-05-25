import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { PeliculaService } from '../service/PeliculaService';
import { FuncionService } from '../service/FuncionService';
import { ButacaService } from '../service/ButacaService';
import { ButacaReservaService } from '../service/ButacaReservaService';
import { SalaService } from '../service/SalaService';
import { ReservaService } from '../service/ReservaService';
import iconButaca from '../assets/icons/armchair.png';
import iconButacaDisabled from '../assets/icons/armchair-off.png';

import './FuncionPage.css';
import './Home.css';

function FuncionPage() {
    const { id } = useParams();
    const [funcion, setFuncion] = useState(null);
    const [sala, setSala] = useState(null);
    const [butacas, setButacas] = useState(null);
    const [butacasReserva, setButacasReserva] = useState(null);
    const [butacasSeleccionadas, setButacasSeleccionadas] = useState([]);

    const funcionService = new FuncionService();
    const salaService = new SalaService();
    const butacaService = new ButacaService();
    const butacaReservaService = new ButacaReservaService();
    const reservaService = new ReservaService();

    useEffect(() => {
        const getFuncion = async () => {
            try {
                const responseFuncion = await funcionService.getById(id);
                setFuncion(responseFuncion);
            } catch (error) {
                console.error(error);
            }
        };

        getFuncion();
    }, [id]);

    useEffect(() => {
        const getButacas = async () => {
            try {
                const responseButacas = await butacaService.getAllBySala(funcion.sala);
                setButacas(responseButacas);
            } catch (error) {
                console.error(error);
            }
        };

        const getReservas = async () => {
            try {
                const responseButacasReserva = await butacaReservaService.getReservasByFuncion(funcion.id_funcion);
                setButacasReserva(responseButacasReserva);
            } catch (error) {
                console.error(error);
            }
        };

        if (funcion) {
            getButacas();
            getReservas();
        }
    }, [funcion]);

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

    const toggleButacaSeleccionada = (id, button) => {
        const butaca = { id };

        if (isButacaSeleccionada(id)) {
            setButacasSeleccionadas((prevButacasSeleccionadas) =>
                prevButacasSeleccionadas.filter((b) => b.id !== id)
            );
            button.style.removeProperty('background-color');
        } else {
            setButacasSeleccionadas((prevButacasSeleccionadas) => [...prevButacasSeleccionadas, butaca]);
            button.style.backgroundColor = 'red';
        }
    };

    const enviarButacasSeleccionadas = () => {
        const arrayString = butacasSeleccionadas.map(butaca => String(butaca.id));

        const precioPorButaca = funcion.precio;
        const numButacas = butacasSeleccionadas.length;
        const precioTotal = numButacas * precioPorButaca;

        console.log(arrayString);


        const objetoEnvio = {
            precio: precioTotal,
            estado: 1,
            arrayObjetos: arrayString,
        };

        reservaService
            .save(funcion.id_funcion, 'usuario1', objetoEnvio)
            .then((data) => {
                // this.toast.show({ severity: 'success', summary: 'Éxito', detail: 'Formulario guardado exitosamente' });
                // Agregar lógica para mostrar un mensaje de éxito en lugar de usar `this.toast.show()`
            })
            .catch((error) => {
                // this.toast.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al guardar la reserva' });
                // Agregar lógica para mostrar un mensaje de error en lugar de usar `this.toast.show()`
            });
    };

    if (!funcion || !butacas || !butacasReserva) {
        return <div>Cargando...</div>;
    }

    const tablaButacas = Array(funcion.sala.filas).fill(null).map(() => Array(funcion.sala.butacasporfila).fill(null));

    butacas.forEach((butaca) => {
        const { fila, columna } = butaca;
        tablaButacas[fila - 1][columna - 1] = butaca;
    });

    return (
        <div className="containerFuncione">
            <h2>{funcion.sala.nombre}</h2>
            <p>Escoge las localidades</p>
            <div className="pantallaFuncion">
                <img src="https://tickets.ocinemagic.es/compra/imagesv2/pantallaB.png" alt="Imagen 1" />
            </div>

            <div className="table-container">
                <table>
                    <tbody>
                    {tablaButacas.map((fila, indexFila) => (
                        <tr key={indexFila}>
                            <td>{indexFila + 1}</td>
                            {fila.map((butaca, indexColumna) => (
                                <td key={indexColumna}>
                                    <div
                                        className="tooltip"
                                        onMouseEnter={() => handleMouseEnter(indexFila, indexColumna)}
                                        onMouseLeave={() => handleMouseLeave(indexFila, indexColumna)}
                                    >
                                        <Button
                                            id={butaca.id}
                                            disabled={isButacaReservada(butaca.id)}
                                            onClick={(e) => {
                                                const button = e.target.tagName === 'IMG' ? e.target.parentNode : e.target;
                                                toggleButacaSeleccionada(butaca.id, button);
                                            }}
                                        >
                                            <img
                                                src={isButacaReservada(butaca.id) ? iconButacaDisabled : iconButaca}
                                                alt="Image"
                                                width="25"
                                            />
                                        </Button>
                                        <span id={`tooltip-${indexFila}-${indexColumna}`} className="tooltiptext">
                                            <div>
                                              Fila {indexFila + 1} Butaca {indexColumna + 1}
                                            </div>
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
            <input type="hidden" name="butacasSeleccionadas" value={JSON.stringify(butacasSeleccionadas)} />
            <Button onClick={enviarButacasSeleccionadas}>Enviar</Button>
        </div>
    );
}

export default FuncionPage;
