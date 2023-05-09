import '../App.css';
import React,  {Component} from "react";
import {PeliculaService} from "../service/PeliculaService";
import {FuncionService} from "../service/FuncionService";

export default class Home extends  Component{
    constructor(props) {
        super(props);
        this.state = {
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
    }
    render() {
        return <h1>Home</h1>;
    }
}
