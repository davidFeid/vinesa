package com.cinema.cine.Service;

import com.cinema.cine.Entity.Reserva;
import com.cinema.cine.Entity.Reserva;

import java.util.List;

public interface ReservaService {

    public List<Reserva> ConsultarReservas();

    public Reserva CrearReserva(Reserva reserva, int id_funcion, String id_usuario);

    public Reserva ModificarReserva(Reserva reserva,int id);

    public Reserva BuscarReserva(int id);

    public void EliminarReserva(int id);

}
