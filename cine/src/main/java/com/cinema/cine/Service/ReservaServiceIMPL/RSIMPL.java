package com.cinema.cine.Service.ReservaServiceIMPL;

import com.cinema.cine.Entity.Funcion;
import com.cinema.cine.Entity.Pelicula;
import com.cinema.cine.Entity.Reserva;
import com.cinema.cine.Entity.Usuario;
import com.cinema.cine.Repository.FuncionRepo;
import com.cinema.cine.Repository.ReservaRepo;
import com.cinema.cine.Repository.UsuarioRepo;
import com.cinema.cine.Service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class RSIMPL implements ReservaService {

    @Autowired
    private ReservaRepo reservaRepo;

    @Autowired
    private FuncionRepo funcionRepo;

    @Autowired
    private UsuarioRepo usuarioRepo;
    @Override
    public List<Reserva> ConsultarReservas() {
        return this.reservaRepo.findAll();
    }

    @Override
    public Reserva CrearReserva(Reserva reserva, int id_funcion, String id_usuario) {
        Funcion funcion = funcionRepo.findById(id_funcion)
                .orElseThrow(() -> new NoSuchElementException("Funcion no encontrada con ID: " + id_funcion));
        reserva.setFuncion(funcion);

        Usuario usuario = usuarioRepo.findById(id_usuario)
                .orElseThrow(() -> new NoSuchElementException("Usuario no encontrada con ID: " + id_usuario));
        reserva.setUsuario(usuario);

        return this.reservaRepo.saveAndFlush(reserva);
    }

    @Override
    public Reserva ModificarReserva(Reserva reserva, int id) {
        return null;
    }

    @Override
    public Reserva BuscarReserva(int id) {
        return this.reservaRepo.findById(id).get();
    }

    @Override
    public void EliminarReserva(int id) {

    }
}
