package com.cinema.cine.Service.ButacaReservaServiceIMPL;

import com.cinema.cine.Entity.*;
import com.cinema.cine.Repository.ButacaRepo;
import com.cinema.cine.Repository.ButacaReservaRepo;
import com.cinema.cine.Repository.ReservaRepo;
import com.cinema.cine.Service.ButacaReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BRSIMPL implements ButacaReservaService {

    @Autowired
    private ButacaReservaRepo butacaReservaRepo;
    @Autowired
    private ButacaRepo butacaRepo;
    @Autowired
    private ReservaRepo reservaRepo;

    @Override
    public List<ButacaReserva> ConsultarButacaReservas() {
        return this.butacaReservaRepo.findAll();
    }

    @Override
    public ButacaReserva CrearButacaReserva(int id_butaca, int id_reserva) {
        ButacaReserva butacaReserva = new ButacaReserva();

        Butaca butaca = butacaRepo.findById(id_butaca)
                .orElseThrow(() -> new NoSuchElementException("Butaca no encontrada con ID: " + id_butaca));
        butacaReserva.setButaca(butaca);

        Reserva reserva = reservaRepo.findById(id_reserva)
                .orElseThrow(() -> new NoSuchElementException("Reserva no encontrada con ID: " + id_reserva));
        butacaReserva.setReserva(reserva);

        return this.butacaReservaRepo.saveAndFlush(butacaReserva);
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

    @Override
    public List<ButacaReserva> findReservasByFuncion(int id) {
        return this.butacaReservaRepo.findReservasByFuncion(id);
    }
}
