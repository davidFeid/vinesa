package com.cinema.cine.Repository;

import com.cinema.cine.Entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservaRepo extends JpaRepository<Reserva, Integer> {
}
