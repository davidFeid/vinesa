package com.cinema.cine.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "funciones")
public class Funcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_funcion")
    private int Id_funcion;

    @ManyToOne
    @JoinColumn(name = "Id_sala")
    private Sala sala;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Id_pelicula")
    private Pelicula pelicula;
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

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    public Pelicula getPelicula() {
        return pelicula;
    }

    public void setPelicula(Pelicula pelicula) {
        this.pelicula = pelicula;
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
