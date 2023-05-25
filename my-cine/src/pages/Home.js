import './Home.css';
import React,  {Component} from "react";
import {PeliculaService} from "../service/PeliculaService";
import {FuncionService} from "../service/FuncionService";
import { PrimeIcons } from 'primereact/api';
import {Dialog} from "primereact/dialog";
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';




export default class Home extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            funciones: [],
            visibleVideo: false,
            videoUrl: "",
            visible : false,
            visibleShow : false,
            visibleImage : false,
            pelicula : {
                idPelicula: null,
                titulo: null,
                directores: null,
                actores: null,
                descripcion: null,
                genero: null,
                imagen: null,
                video: null,
                estado: null
            }
        }
        this.peliculaService = new PeliculaService();
        this.funcionService = new FuncionService();
    }
    componentDidMount() {
        this.peliculaService.getAll().then(data => this.setState({peliculas: data}) );
        this.funcionService.getAll().then(data => this.setState({funciones: data}) );


    }

    openVideo = (videoUrl) => {
        this.setState({ visibleVideo: true, videoUrl });
    };
    closeVideo = () => {
        this.setState({ visibleVideo: false, videoUrl: "" });
    };


    render() {
        const abbreviatedMonths  = [
            "ene", "feb", "mar", "abr", "may", "jun",
            "jul", "ago", "sep", "oct", "nov", "dic"
        ];
        const today = new Date();
        const month = today.getMonth();
        const abbreviatedMonth = abbreviatedMonths[month];
        const day = today.getDate();
        const formattedDate = `${day} ${abbreviatedMonth}`;

        return (
            <div className="containerHome">

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


                <div className="peliculas-container">

                    <h1>Cartelera</h1>

                    <div className="card-container" >
                        {this.state.peliculas.map((pelicula) => (
                            <div className="cardCartelera" key={pelicula.idPelicula}>
                                <div className="card-image-container">
                                    <img
                                        src={pelicula.imagen}
                                        alt="Imagen de la carta"
                                    />
                                    <div className="card-overlay">
                                        <Link to={`/peliculas/${pelicula.idPelicula}`}>
                                            <h2>{pelicula.titulo}</h2>
                                        </Link>
                                        <p>Hoy,{formattedDate}</p>
                                        <Link to={`/peliculas/${pelicula.idPelicula}`}>
                                            <p className="card-horario"> VER HORARIOS</p>
                                        </Link>
                                    </div>
                                </div>

                                <div className="card-content">
                                    {this.state.funciones
                                        .filter(funcion => {
                                            if (typeof funcion.pelicula === 'object') {
                                                return funcion.pelicula.idPelicula === pelicula.idPelicula;
                                            } else {
                                                return funcion.pelicula === pelicula.idPelicula;
                                            }
                                        })
                                        .slice(0,4)
                                        .map(f => (
                                            <Link to={`/funciones/${f.id_funcion}`} key={f.id_funcion}>
                                                <p className="horario-funcion">{f.horario}</p>
                                            </Link>
                                        ))}
                                </div>

                                <div className="card-buttons">
                                    <button className="card-button" onClick={() => this.openVideo(pelicula.video)}>
                                        <i className="pi pi-caret-right"> Trailer</i>
                                    </button>
                                    <button className="card-button">
                                        <Link to={`/peliculas/${pelicula.idPelicula}`}>
                                            <i className="pi  pi-book"> Info</i>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Dialog visible={this.state.visibleVideo} onHide={this.closeVideo} modal={true} style={{ width: "70vw" }}>
                        <div className="youtube-video">
                            <iframe width="100%" height="400" src={this.state.videoUrl} title="YouTube Video" frameBorder="0" allowFullScreen />
                        </div>
                    </Dialog>

            </div>
            </div>
        );
    }
}
