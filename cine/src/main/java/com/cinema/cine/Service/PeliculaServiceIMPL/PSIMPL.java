package com.cinema.cine.Service.PeliculaServiceIMPL;

import com.cinema.cine.Entity.Pelicula;
import com.cinema.cine.Repository.PeliculaRepo;
import com.cinema.cine.Service.PeliculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PSIMPL implements PeliculaService {

    @Autowired
    private PeliculaRepo repo;

    @Override
    public List<Pelicula> ConsultarPelicula() {
        return (List<Pelicula>) this.repo.findAll();
    }

    @Override
    public Pelicula CrearPelicula(Pelicula pelicula) {
        pelicula.setTitulo(pelicula.getTitulo());
        return this.repo.save(pelicula);
    }

    @Override
    public Pelicula ModificarPelicula(Pelicula pelicula,int id) {
        //return this.repo.save(pelicula);
        // Obtener la película existente de la base de datos
        Pelicula peliculaExistente = this.repo.findById(id).orElse(null);
        if (peliculaExistente != null) {
            // Actualizar los valores de la película existente
            peliculaExistente.setTitulo(pelicula.getTitulo());
            peliculaExistente.setDirectores(pelicula.getDirectores());
            peliculaExistente.setActores(pelicula.getActores());
            peliculaExistente.setDescripcion(pelicula.getDescripcion());
            peliculaExistente.setGenero(pelicula.getGenero());
            peliculaExistente.setImagen(pelicula.getImagen());
            peliculaExistente.setVideo(pelicula.getVideo());
            peliculaExistente.setEstado(pelicula.getEstado());
            // Guardar la película actualizada en la base de datos
            return this.repo.save(peliculaExistente);
        }
        // Si no se encuentra la película, devolver null
        return null;
    }

    @Override
    public Pelicula BuscarPelicula(int id) {
        return this.repo.findById(id).get();
    }

    @Override
    public void EliminarPelicula(int id) {
        this.repo.deleteById(id);
    }
}
