package com.cinema.cine.Service;

import com.cinema.cine.Entity.Pelicula;
import java.util.List;

public interface PeliculaService {

    public List<Pelicula> ConsultarPelicula();
    public Pelicula CrearPelicula(Pelicula pelicula);
    public Pelicula ModificarPelicula(Pelicula pelicula, int id);
    public Pelicula BuscarPelicula(int id);
    public void EliminarPelicula(int id);

}
