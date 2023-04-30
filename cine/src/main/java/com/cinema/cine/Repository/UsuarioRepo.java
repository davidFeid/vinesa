package com.cinema.cine.Repository;

import com.cinema.cine.Entity.Usuario;
import org.springframework.data.repository.CrudRepository;
public interface UsuarioRepo extends CrudRepository<Usuario, Integer>  {
}
