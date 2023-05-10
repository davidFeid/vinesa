package com.cinema.cine.Service.ButacaReservaServiceIMPL;

import com.cinema.cine.Entity.ButacaReserva;
import com.cinema.cine.Repository.ButacaReservaRepo;
import com.cinema.cine.Service.ButacaReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BRSIMPL implements ButacaReservaService {

    @Autowired
    private ButacaReservaRepo butacaReservaRepo;

    @Override
    public List<ButacaReserva> ConsultarButacaReservas() {
        return this.butacaReservaRepo.findAll();
    }

    @Override
    public ButacaReserva CrearButacaReserva(ButacaReserva butacaReserva) {
        return null;
    }

    @Override
    public ButacaReserva ModificarButacaReserva(ButacaReserva butacaReserva, int id) {
        return null;
    }

    @Override
    public ButacaReserva BuscarButacaReserva(int id) {
        return null;
    }

    @Override
    public void EliminarButacaReserva(int id) {

    }
}
