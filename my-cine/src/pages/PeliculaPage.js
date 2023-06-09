import './PeliculaPage.css';
import './Home.css';
import './Carga.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {PeliculaService} from '../service/PeliculaService';
import {FuncionService} from "../service/FuncionService";
import {Dialog} from "primereact/dialog"; // Importa la clase directamente
import { Link } from 'react-router-dom';
import {Carousel} from "react-responsive-carousel";

function PeliculaPage() {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState(null);
    const [funcion, setFuncion] = useState(null);
    const [visibleVideo, setVisibleVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    const peliculaService = new PeliculaService(); // Crea una instancia de PeliculaService
    const funcionService = new FuncionService();

    useEffect(() => {
        // Lógica para obtener los datos de la película
        const getPelicula = async () => {
            try {

                const response = await peliculaService.getPeliculaById(id);
                setPelicula(response);
            } catch (error) {
                console.error(error);
                // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
            }

        };
        const getFuncion = async () =>{
            try{

            const responseFuncion = await funcionService.BuscarFuncionByPelicula(id);
            setFuncion(responseFuncion);

        } catch (error) {
            console.error(error);
            // Manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
        }

        };
        getFuncion();
        getPelicula();
    }, [id]);

    const openVideo = (videoUrl) => {
        setVideoUrl(videoUrl);
        setVisibleVideo(true);
    };

    const closeVideo = () => {
        setVideoUrl('');
        setVisibleVideo(false);
    };


    if (!pelicula || !funcion) {
        // Mientras se obtienen los datos de la película, puedes mostrar un indicador de carga o un mensaje
        return <div>
                <div class="loading-container">
                    <h1 class="loading-text">Cargando...</h1>
                    <div class="loading-spinner"></div>
                  </div>
                </div>;
    }
    const today = new Date();
    const date = today.toLocaleDateString('es-EU', { year: 'numeric', day: '2-digit' ,month: '2-digit'});
    const parts = date.split('/');
    const formattedDate = parts.reverse().join('-');

    // Una vez que se obtienen los datos, puedes mostrar la información de la película
    return (

        <div>
        <div className="slider">
            <Carousel>
                <div>
                    <img src="https://www.ocinemagic.es/images/banner_content/FAST-X.webp" alt="Imagen 1" />
                </div>
                <div>
                    <img src="https://www.ocinemagic.es/images/banner_content/PREVENTA-spider-man.webp" alt="Imagen 2" />
                </div>
                <div>
                    <img src="https://www.ocinemagic.es/images/banner_content/LA-SIRENITA.webp" alt="Imagen 3" />
                </div>
                {/* Agrega más imágenes según sea necesario */}
            </Carousel>
        </div>
        <div className="containerPeliculasPage">
        <div className="pelicula-page">
            <div className="pelicula-header">
                <h2 className="pelicula-titulo">{pelicula.titulo}</h2>
            </div>
            <div className="pelicula-info">
                <div className="pelicula-poster">
                    <img src={pelicula.imagen} alt="Imagen de la película" />
                </div>
                <div className="pelicula-details">
                    <div className="pelicula-directores">
                        <h4>Directores:</h4>
                        <p>{pelicula.directores}</p>
                    </div>
                    <div className="pelicula-actores">
                        <h4>Actores:</h4>
                        <p>{pelicula.actores}</p>
                    </div>
                    <div className="pelicula-descripcion">
                        <h4>Descripción:</h4>
                        <p>{pelicula.descripcion}</p>
                    </div>
                    <div className="pelicula-genero">
                        <h4>Género:</h4>
                        <p>{pelicula.genero}</p>
                    </div>
                    <div className="pelicula-sesiones">
                        <h4>Sesiones:</h4>
                        {funcion.filter(funcion => {
                            return funcion.fecha === formattedDate;
                        }).map((f, index) => (
                            <Link to={`/funciones/${f.id_funcion}`} key={f.id_funcion}>
                                <p className="horario-funcion">{f.horario}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="pelicula-trailer">
                        <h4>Tráiler:</h4>
                        <button className="card-button" onClick={() => openVideo(pelicula.video)}>
                            <i className="pi pi-caret-right"> Trailer</i>
                        </button>
                    </div>

                </div>
            </div>
            <Dialog visible={visibleVideo} onHide={closeVideo} modal={true} style={{ width: "70vw" }}>
                <div className="youtube-video">
                    <iframe width="100%" height="400" src={videoUrl} title="YouTube Video" frameBorder="0" allowFullScreen />
                </div>
            </Dialog>
        </div>
        </div>
        </div>
    );
}

export default PeliculaPage;
