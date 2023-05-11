package com.cinema.cine.Service;

import com.cinema.cine.Entity.ButacaReserva;

import java.util.List;

public interface ButacaReservaService {

    public List<ButacaReserva> ConsultarButacaReservas();

    public ButacaReserva CrearButacaReserva(int id_butaca, int id_reserva);

    public ButacaReserva ModificarButacaReserva(ButacaReserva butacaReserva,int id);

    public ButacaReserva BuscarButacaReserva(int id);

    public void EliminarButacaReserva(int id);

}
