package com.cinema.cine.Service.FuncionServiceIMPL;

import com.cinema.cine.Entity.Funcion;
import com.cinema.cine.Entity.Sala;
import com.cinema.cine.Repository.FuncionRepo;
import com.cinema.cine.Service.FuncionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FSIMPL implements FuncionService {

    @Autowired
    private FuncionRepo repo;

    @Override
    public List<Funcion> ConsultarFuncion() { return (List<Funcion>) this.repo.findAll();}

    @Override
    public Funcion CrearFuncion(Funcion funcion) {
        funcion.setId_funcion(funcion.getId_funcion());
        return this.repo.save(funcion);
    }

    @Override
    public Funcion ModificarFuncion(Funcion funcion, int id) {
      Funcion funcionExistente = this.repo.findById(id).orElse(null);
      if(funcionExistente != null){
          funcionExistente.setId_funcion(funcion.getId_funcion());
          funcionExistente.setId_sala(funcion.getId_sala());
          funcionExistente.setId_pelicula(funcion.getId_pelicula());
          funcionExistente.setHorario(funcion.getHorario());
          funcionExistente.setFecha(funcion.getFecha());
          funcionExistente.setPrecio(funcion.getPrecio());
          funcionExistente.setEstado(funcion.getEstado());
          return  this.repo.save(funcionExistente);
      }
      return  null;
    }

    @Override
    public Funcion BuscarFuncion(int id) { return this.repo.findById(id).get(); }

    @Override
    public void EliminarFuncion(int id) {
        Funcion funcionExistente = this.repo.findById(id).orElse(null);
        if (funcionExistente != null) {
            if (funcionExistente.getEstado() == 1) {
                funcionExistente.setEstado(0);
            } else {
                funcionExistente.setEstado(1);
            }
            this.repo.save(funcionExistente);
        }
    }
}
