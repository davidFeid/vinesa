package com.cinema.cine.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_reserva")
    private int Id_reserva;

    @ManyToOne
    @JoinColumn(name = "Id_funcion")
    private Funcion funcion;

    @ManyToOne
    @JoinColumn(name = "Id_usuario")
    private Usuario usuario;
    @Column(name = "Fecha_reserva")
    private String Fecha_reserva;

    @Column(name = "Precio")
    private int Precio;
    @Column(name = "Estado")
    private int Estado;

    public int getId_reserva() {
        return Id_reserva;
    }

    public void setId_reserva(int id_reserva) {
        Id_reserva = id_reserva;
    }

    public Funcion getFuncion() {
        return funcion;
    }

    public void setFuncion(Funcion funcion) {
        this.funcion = funcion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getFecha_reserva() {
        return Fecha_reserva;
    }

    public void setFecha_reserva(String fecha_reserva) {
        Fecha_reserva = fecha_reserva;
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
