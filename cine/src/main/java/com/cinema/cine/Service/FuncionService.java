package com.cinema.cine.Service;

import com.cinema.cine.Entity.Funcion;

import java.util.List;

public interface FuncionService {

    public List<Funcion> ConsultarFuncion();

    public Funcion CrearFuncion(Funcion funcion);

    public Funcion ModificarFuncion(Funcion funcion,int id);

    public Funcion BiuscarFuncion(int id);

    public void EliminarFuncion(int id);

}
