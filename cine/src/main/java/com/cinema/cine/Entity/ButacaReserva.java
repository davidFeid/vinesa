package com.cinema.cine.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "butacasreservas")
@IdClass(ButacaReservaId.class)
public class ButacaReserva {

    @Id
    @ManyToOne
    @JoinColumn(name = "Id_butaca")
    private Butaca butaca;

    @Id
    @ManyToOne
    @JoinColumn(name = "Id_reserva")
    private Reserva reserva;

    public Butaca getButaca() {
        return butaca;
    }

    public void setButaca(Butaca butaca) {
        this.butaca = butaca;
    }

    public Reserva getReserva() {
        return reserva;
    }

    public void setReserva(Reserva reserva) {
        this.reserva = reserva;
    }
}
