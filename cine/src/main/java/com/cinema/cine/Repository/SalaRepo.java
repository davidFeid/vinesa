package com.cinema.cine.Repository;

import com.cinema.cine.Entity.Sala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface SalaRepo extends JpaRepository<Sala, Integer> {
}
