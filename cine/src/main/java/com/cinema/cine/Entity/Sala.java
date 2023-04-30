package com.cinema.cine.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "salas")
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Id_sala")
    private int Id_sala;
    @Column(name="Nombre")
    private String Nombre;
    @Column(name="Tipo")
    private  String Tipo;
    @Column(name="Filas")
    private int Filas;
    @Column(name = "Butacasporfila")
    private int Butacasporfila;
    @Column(name= "Estado")
    private int Estado;

    public int getId_sala() {
        return Id_sala;
    }

    public void setId_sala(int id_sala) {
        Id_sala = id_sala;
    }

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String nombre) {
        Nombre = nombre;
    }

    public String getTipo() {
        return Tipo;
    }

    public void setTipo(String tipo) {
        Tipo = tipo;
    }

    public int getFilas() {
        return Filas;
    }

    public void setFilas(int filas) {
        Filas = filas;
    }

    public int getButacasporfila() {
        return Butacasporfila;
    }

    public void setButacasporfila(int butacasporfila) {
        Butacasporfila = butacasporfila;
    }

    public int getEstado() {
        return Estado;
    }

    public void setEstado(int estado) {
        Estado = estado;
    }
}
