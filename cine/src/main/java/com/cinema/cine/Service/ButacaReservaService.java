package com.cinema.cine.Service;

import com.cinema.cine.Entity.ButacaReserva;

import java.util.List;

public interface ButacaReservaService {

    public List<ButacaReserva> ConsultarButacaReservas();

    public ButacaReserva CrearButacaReserva(ButacaReserva butacaReserva);

    public ButacaReserva ModificarButacaReserva(ButacaReserva butacaReserva,int id);

    public ButacaReserva BuscarButacaReserva(int id);

    public void EliminarButacaReserva(int id);

}
