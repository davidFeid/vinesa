package com.cinema.cine.Controller;

import com.cinema.cine.Entity.Funcion;
import com.cinema.cine.Entity.Pelicula;
import com.cinema.cine.Entity.Sala;
import com.cinema.cine.Service.FuncionServiceIMPL.FSIMPL;
import com.cinema.cine.Service.PeliculaService;
import com.cinema.cine.Service.PeliculaServiceIMPL.PSIMPL;
import com.cinema.cine.Service.SalaServiceIMPL.SSIMPL;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("AdminFuncion")
@RestController
@CrossOrigin("*")
public class FuncionesController {


    public FuncionesController(FSIMPL fsimpl, SSIMPL ssimpl, PSIMPL psimpl){
        this.fsimpl = fsimpl;
        this.ssimpl = ssimpl;
        this.psimpl = psimpl;
    }
    private final FSIMPL fsimpl;
    private final SSIMPL ssimpl;
    private final PSIMPL psimpl;

    @PostMapping
    @RequestMapping(value = "ConsultarFuncion", method = RequestMethod.GET)
    public ResponseEntity<?>ConsultarFuncion(){
        List<Funcion> listarFuncion=this.fsimpl.ConsultarFuncion();
        return ResponseEntity.ok(listarFuncion);
    }

    @PostMapping
    @RequestMapping(value = "CrearFuncion/{id_sala}/{id_pelicula}", method = RequestMethod.POST)
    public ResponseEntity<?> CrearFuncion(@RequestBody Funcion funcion,@PathVariable int id_sala,@PathVariable int id_pelicula){
        Funcion FuncionCreada = this.fsimpl.CrearFuncion(funcion,id_sala, id_pelicula);
        return ResponseEntity.status(HttpStatus.CREATED).body(FuncionCreada);
    }
    @PutMapping
    @RequestMapping(value = "ModificarFuncion/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> ModificarFuncion(@RequestBody Funcion funcion,@PathVariable int id){
        Funcion FuncionModificada = this.fsimpl.ModificarFuncion(funcion,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(FuncionModificada);
    }


    @GetMapping
    @RequestMapping(value = "BuscarFuncion/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> BuscarFuncion(@PathVariable int id){
        Funcion funcion = this.fsimpl.BuscarFuncion(id);
        return ResponseEntity.ok(funcion);
    }

    @DeleteMapping
    @RequestMapping(value = "EliminarFuncion/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> EliminarFuncion(@PathVariable int id){
        this.fsimpl.EliminarFuncion(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @RequestMapping(value = "BuscarFuncionByPelicula/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> BuscarFuncionByPelicula(@PathVariable int id){
        Pelicula pelicula = this.psimpl.BuscarPelicula(id);
        List<Funcion> listarFuncion = this.fsimpl.findByPelicula(pelicula);
        return ResponseEntity.ok(listarFuncion);
    }
}
