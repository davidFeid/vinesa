package com.cinema.cine.Entity;

import java.io.Serializable;

public class ButacaReservaId implements Serializable {

    private Butaca butaca;
    private Reserva reserva;

    public ButacaReservaId() {
        // Constructor vacío necesario para JPA
    }

    public ButacaReservaId(Butaca butaca, Reserva reserva) {
        this.butaca = butaca;
        this.reserva = reserva;
    }

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
