import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {PeliculaService} from '../service/PeliculaService'; // Importa la clase directamente

function PeliculaPage() {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState(null);

    const peliculaService = new PeliculaService(); // Crea una instancia de PeliculaService

    useEffect(() => {
        // Lógica para obtener los datos de la película
        const getPelicula = async () => {
            try {
                console.log(id);
                const response = await peliculaService.getPeliculaById(id);
                setPelicula(response);
            } catch (error) {
                console.error(error);
                // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
            }
        };

        getPelicula();
    }, [id]);

    if (!pelicula) {
        // Mientras se obtienen los datos de la película, puedes mostrar un indicador de carga o un mensaje
        return <div>Cargando...</div>;
    }

    // Una vez que se obtienen los datos, puedes mostrar la información de la película
    return (
        <div>
            <h2>{pelicula.titulo}</h2>
            <p>Directores: {pelicula.directores}</p>
            <p>Actores: {pelicula.actores}</p>
            <p>Descripción: {pelicula.descripcion}</p>
            <p>Genero: {pelicula.genero}</p>
            <p>Imagen; <img
                src={pelicula.imagen}
                alt="Imagen de la carta"
            /></p>

        </div>
    );
}

export default PeliculaPage;
