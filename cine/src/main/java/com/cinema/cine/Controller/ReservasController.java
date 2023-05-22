package com.cinema.cine.Controller;

import com.cinema.cine.Entity.Butaca;
import com.cinema.cine.Entity.ButacaReserva;
import com.cinema.cine.Entity.Funcion;
import com.cinema.cine.Entity.Reserva;
import com.cinema.cine.Service.ButacaReservaServiceIMPL.BRSIMPL;
import com.cinema.cine.Service.ReservaServiceIMPL.RSIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("AdminReserva")
@RestController
@CrossOrigin("*")
public class ReservasController {

    @Autowired
    private RSIMPL rsimpl;
    @Autowired
    private BRSIMPL brsimpl;

    @PostMapping
    @RequestMapping(value = "ConsultarReservas", method = RequestMethod.GET)
    public ResponseEntity<?> ConsultarFuncion(){
        List<Reserva> listarReserva=this.rsimpl.ConsultarReservas();
        return ResponseEntity.ok(listarReserva);
    }

    /*@PostMapping
    @RequestMapping(value = "CrearReserva/{id_funcion}/{id_usuario}", method = RequestMethod.POST)
    public ResponseEntity<?> CrearReserva(@RequestBody Reserva reserva,@PathVariable int id_funcion,@PathVariable int id_usuario){
        Reserva reservaCreada = this.rsimpl.CrearReserva(reserva,id_funcion, id_usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservaCreada);
    }*/

    @PostMapping
    @RequestMapping(value = "CrearReserva/{id_funcion}/{id_usuario}", method = RequestMethod.POST)
    public ResponseEntity<?> procesarDatos(@RequestBody Map<String, Object> datos, @PathVariable int id_funcion,@PathVariable String id_usuario) {
        /*Reserva reserva= (Reserva) datos.get("objeto");*/
        Reserva reserva = new Reserva();
        reserva.setPrecio((Integer) datos.get("precio"));
        reserva.setEstado((Integer) datos.get("estado"));

        Reserva reservaCreada = this.rsimpl.CrearReserva(reserva,id_funcion, id_usuario);

        List<String> arrayObjetos = (List<String>) datos.get("arrayObjetos");

        // Lógica para procesar los datos recibidos

        for (String objeto : arrayObjetos) {
            // Hacer algo con cada elemento de arrayObjetos
            ButacaReserva butacaReserva = this.brsimpl.CrearButacaReserva(Integer.parseInt(objeto),reservaCreada.getId_reserva());
        }

        // Devuelve una respuesta al cliente si es necesario
        /*return ResponseEntity.ok("Datos recibidos correctamente");*/
        return ResponseEntity.status(HttpStatus.CREATED).body(reservaCreada);
    }


    @GetMapping
    @RequestMapping(value = "BuscarReserva/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> BuscarReserva(@PathVariable int id){
        Reserva reserva = this.rsimpl.BuscarReserva(id);
        return ResponseEntity.ok(reserva);
    }

}
