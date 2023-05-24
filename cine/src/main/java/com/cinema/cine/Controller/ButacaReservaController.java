package com.cinema.cine.Controller;

import com.cinema.cine.Entity.ButacaReserva;
import com.cinema.cine.Service.ButacaReservaServiceIMPL.BRSIMPL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("AdminButacaReserva")
@RestController
@CrossOrigin("*")
public class ButacaReservaController {

    @Autowired
    private final BRSIMPL brsimpl;

    public ButacaReservaController(BRSIMPL brsimpl) {
        this.brsimpl = brsimpl;
    }

    @GetMapping
    @RequestMapping(value = "BuscarReservasPorFuncion/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findReservasByFuncion(@PathVariable int id){
        List<ButacaReserva> listarButacaReserva = this.brsimpl.findReservasByFuncion(id);
        return ResponseEntity.ok(listarButacaReserva);
    }

}
