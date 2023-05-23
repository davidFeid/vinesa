import './Home.css';
import React,  {Component} from "react";
import {PeliculaService} from "../service/PeliculaService";
import {FuncionService} from "../service/FuncionService";
import { PrimeIcons } from 'primereact/api';
import {Dialog} from "primereact/dialog";
import { Link } from 'react-router-dom';



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
            <div>
                <h1>Cartellera</h1>

                <div className="card-container" >
                    {this.state.peliculas.map((pelicula) => (
                        <div className="card" key={pelicula.idPelicula}>
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
                                </div>
                                 <div className="card-masHoraios">
                                    <Link to={`/peliculas/${pelicula.idPelicula}`}>
                                        <i className="pi  pi-book"> VER HORARIOS</i>
                                    </Link>
                                 </div>
                            </div>
                           <div className="card-content">
                             {this.state.funciones
                               .filter(funcion => funcion.pelicula.idPelicula === pelicula.idPelicula)
                               .map(f => (
                                 <Link to={`/funciones/${f.id_funcion}` }key={f.id_funcion}>
                                   <p className="horario-funcion">{f.horario}</p>
                                 </Link>
                               ))}
                           </div>



                            <div className="card-buttons">
                                <button className="card-button" onClick={() => this.openVideo(pelicula.video)}>
                                    <i className="pi pi-caret-right"> Trailer</i>
                                </button>
                                <button className="card-button">
                                    <i className="pi  pi-book"> Info</i>
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
        );
    }
}
