package com.cinema.cine.Service.SalaServiceIMPL;

import com.cinema.cine.Entity.Sala;
import com.cinema.cine.Repository.SalaRepo;
import com.cinema.cine.Service.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SSIMPL implements SalaService {

    @Autowired
    private SalaRepo repo;

    @Override
    public List<Sala> ConsultarSala() { return (List<Sala>) this.repo.findAll(); }

    @Override
    public Sala CrearSala(Sala sala) {
        sala.setNombre(sala.getNombre());
        return this.repo.save(sala);
    }

    @Override
    public Sala ModificarSala(Sala sala,int id) {
        Sala salaExistente = this.repo.findById(id).orElse(null);
        if (salaExistente != null) {
            salaExistente.setId_sala(sala.getId_sala());
            salaExistente.setNombre(sala.getNombre());
            salaExistente.setTipo(sala.getTipo());
            salaExistente.setFilas(sala.getFilas());
            salaExistente.setButacasporfila(sala.getButacasporfila());
            salaExistente.setEstado(sala.getEstado());

            return this.repo.save(salaExistente);
        }
        // Si no se encuentra la sala, devolver null
        return null;
    }

    @Override
    public Sala BuscarSala(int id) { return this.repo.findById(id).get(); }

    @Override
    public void EliminarSala(int id) {
        Sala salaExistente = this.repo.findById(id).orElse(null);
        if (salaExistente != null) {
            if (salaExistente.getEstado() == 1) {
                salaExistente.setEstado(0);
            } else {
                salaExistente.setEstado(1);
            }
            this.repo.save(salaExistente);
        }
    }
}
