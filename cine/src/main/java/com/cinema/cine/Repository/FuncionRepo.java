package com.cinema.cine.Repository;
import com.cinema.cine.Entity.Funcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
public interface FuncionRepo extends JpaRepository<Funcion, Integer> {
}
