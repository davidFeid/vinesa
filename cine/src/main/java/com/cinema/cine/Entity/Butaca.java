package com.cinema.cine.Entity;


import jakarta.persistence.*;

@Table(name = "butacas")
@Entity
public class Butaca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_butaca")
    private int Id_butaca;
    @Column(name = "Id_sala")
    private int Id_sala;
    @Column(name = "Fila")
    private int Fila;
    @Column(name = "Columna")
    private int Columna;
    @Column(name = "Estado")
    private int Estado;

    public int getId_butaca() {
        return Id_butaca;
    }

    public void setId_butaca(int id_butaca) {
        Id_butaca = id_butaca;
    }

    public int getId_sala() {
        return Id_sala;
    }

    public void setId_sala(int id_sala) {
        Id_sala = id_sala;
    }

    public int getFila() {
        return Fila;
    }

    public void setFila(int fila) {
        Fila = fila;
    }

    public int getColumna() {
        return Columna;
    }

    public void setColumna(int columna) {
        Columna = columna;
    }

    public int getEstado() {
        return Estado;
    }

    public void setEstado(int estado) {
        Estado = estado;
    }
}
