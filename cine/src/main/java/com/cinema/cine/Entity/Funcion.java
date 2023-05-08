package com.cinema.cine.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "funciones")
public class Funcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_funcion")
    private int Id_funcion;

    @Column(name = "Id_sala")
    private int Id_sala;

    @Column(name = "Id_pelicula")
    private int Id_pelicula;
    @Column(name = "Estado")
    private int Estado;

    @Column(name = "Horario")
    private String Horario;
    @Column(name = "Fecha")
    private String Fecha;
    @Column(name = "Precio")
    private int Precio;

    public int getId_funcion() {
        return Id_funcion;
    }

    public void setId_funcion(int id_funcion) {
        Id_funcion = id_funcion;
    }

    public int getId_sala() {
        return Id_sala;
    }

    public void setId_sala(int id_sala) {
        Id_sala = id_sala;
    }

    public int getId_pelicula() {
        return Id_pelicula;
    }

    public void setId_pelicula(int id_pelicula) {
        Id_pelicula = id_pelicula;
    }

    public String getHorario() {
        return Horario;
    }

    public void setHorario(String horario) {
        Horario = horario;
    }

    public String getFecha() {
        return Fecha;
    }

    public void setFecha(String fecha) {
        Fecha = fecha;
    }

    public int getPrecio() {
        return Precio;
    }

    public void setPrecio(int precio) {
        Precio = precio;
    }

    public int getEstado() {
        return Estado;
    }

    public void setEstado(int estado) {
        Estado = estado;
    }


}
