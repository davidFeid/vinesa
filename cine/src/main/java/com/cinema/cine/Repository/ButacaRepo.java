package com.cinema.cine.Repository;

import com.cinema.cine.Entity.Butaca;
import com.cinema.cine.Entity.Funcion;
import com.cinema.cine.Entity.Pelicula;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ButacaRepo extends CrudRepository<Butaca, Integer>{

    @Query("SELECT b FROM Butaca b WHERE b.Id_sala = ?1")
    List<Butaca> findBySala(int id);

}
