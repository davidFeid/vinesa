import React, { Component  } from 'react';
import { PeliculaService } from '../service/PeliculaService';


export default class PeliculaPage extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            peliculas: []
        };
        this.peliculaService = new PeliculaService();
    }

    componentDidMount() {
        console.log(Component);
        const { params }  = this.props.match;
        console.log(params.id)
        this.peliculaService.getPeliculaById(params.id).then(data => this.setState({ peliculas: data }));
    }

    render() {


        return (
            <div className="pelicula-page">
                <div className="pelicula-details">
                    <h1>{this.state.peliculas.titulo}</h1>
                    <h2>Directores: {this.state.peliculas.directores}</h2>
                    <h2>Actores: {this.state.peliculas.actores}</h2>
                    <p>{this.state.peliculas.descripcion}</p>
                    <h3>Género: {this.state.peliculas.genero}</h3>
                </div>
                <div className="pelicula-image">
                    <img src={this.state.peliculas.imagen} alt="Imagen de la película" />
                </div>
                <div className="pelicula-video">
                    <iframe
                        width="560"
                        height="315"
                        src={this.state.peliculas.video}
                        title="Trailer de la película"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        );
    }
}


