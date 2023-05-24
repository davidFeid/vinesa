package com.cinema.cine.Repository;

import com.cinema.cine.Entity.Butaca;
import com.cinema.cine.Entity.ButacaReserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ButacaReservaRepo extends JpaRepository<ButacaReserva, Integer> {

    @Query("SELECT br FROM ButacaReserva br" +
            "            INNER JOIN Reserva r ON br.reserva.Id_reserva = r.Id_reserva " +
            "            INNER JOIN Funcion f ON r.funcion.Id_funcion = f.Id_funcion" +
            "            WHERE f.Id_funcion = 16")
    /*@Query("SELECT br FROM ButacaReserva br WHERE br.reserva.Id_reserva = 21")*/
    List<ButacaReserva> findReservasByFuncion(int id);
}
