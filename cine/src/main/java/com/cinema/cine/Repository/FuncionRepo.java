package com.cinema.cine.Repository;
import com.cinema.cine.Entity.Funcion;
import com.cinema.cine.Entity.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FuncionRepo extends JpaRepository<Funcion, Integer> {

    @Query("SELECT f FROM Funcion f WHERE f.pelicula = ?1")
    List<Funcion> findByPelicula(Pelicula pelicula);
}
