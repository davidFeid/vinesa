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
    public Sala ModificarSala(Sala sala) { return this.repo.save(sala); }

    @Override
    public Sala BuscarSala(int id) { return this.repo.findById(id).get(); }

    @Override
    public void EliminarSala(int id) { this.repo.deleteById(id); }
}
