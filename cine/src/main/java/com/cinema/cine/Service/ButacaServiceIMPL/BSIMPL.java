package com.cinema.cine.Service.ButacaServiceIMPL;

import com.cinema.cine.Entity.Butaca;
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
    public Butaca ModificarButaca(Butaca butaca){ return  this.repo.save(butaca);}

    @Override
    public  Butaca BuscarButaca(int id) { return this.repo.findById(id).get();}

    @Override
    public void EliminarButaca(int id){this.repo.deleteById(id);}
}
