package com.cinema.cine.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "butacasreservas")
public class ButacaReserva {

    @Id
    @ManyToOne
    @JoinColumn(name = "Id_butaca")
    private Butaca butaca;

    @Id
    @ManyToOne
    @JoinColumn(name = "Id_reserva")
    private Reserva reserva;

}
