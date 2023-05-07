package com.cinema.cine.Repository;

import com.cinema.cine.Entity.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface PeliculaRepo extends JpaRepository<Pelicula, Integer> {

}
