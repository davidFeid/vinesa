package com.cinema.cine.Service.ButacaServiceIMPL;

import com.cinema.cine.Entity.Butaca;
import com.cinema.cine.Entity.Usuario;
import com.cinema.cine.Repository.ButacaRepo;
import com.cinema.cine.Service.ButacaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BSIMPL implements ButacaService {

    @Autowired
    private ButacaRepo repo;

    public List<Butaca> ConsultarButaca(){return (List<Butaca>) this.repo.findAll();}

    @Override
    public Butaca CrearButaca(Butaca butaca){
        butaca.setId_butaca(butaca.getId_butaca());
        return this.repo.save(butaca);
    }

    @Override
    public Butaca ModificarButaca(Butaca butaca,int id){
        Butaca butacaExistente = this.repo.findById(id).orElse(null);
        if (butacaExistente != null) {
            butacaExistente.setId_butaca(butaca.getId_butaca());
            butacaExistente.setId_sala(butaca.getId_sala());
            butacaExistente.setFila(butaca.getFila());
            butacaExistente.setColumna(butaca.getColumna());
            butacaExistente.setEstado(butaca.getEstado());

            return this.repo.save(butacaExistente);
        }
        return null;
    }

    @Override
    public  Butaca BuscarButaca(int id) { return this.repo.findById(id).get();}

    @Override
    public void EliminarButaca(int id){
       Butaca butacaExistente = this.repo.findById(id).orElse(null);
       if(butacaExistente != null){
           if (butacaExistente.getEstado() ==1 ){
               butacaExistente.setEstado(0);
           }else{
               butacaExistente.setEstado(1);
           }
           this.repo.save(butacaExistente);
       }
    }
}
