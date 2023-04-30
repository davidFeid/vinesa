package com.cinema.cine.Service;

import com.cinema.cine.Entity.Sala;

import java.util.List;

public interface SalaService {

    public List<Sala> ConsultarSala();

    public Sala CrearSala(Sala sala);

    public Sala ModificarSala(Sala lista);

    public Sala BuscarSala(int id);

    public void EliminarSala(int id);


}