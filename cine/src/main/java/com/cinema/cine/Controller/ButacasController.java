package com.cinema.cine.Controller;

import com.cinema.cine.Entity.Butaca;
import com.cinema.cine.Service.ButacaServiceIMPL.BSIMPL;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("AdminButaca")
@RestController
@CrossOrigin("*")
public class ButacasController {

    public ButacasController(BSIMPL bsimpl){
        this.bsimpl = bsimpl;
    }
    private final BSIMPL bsimpl;

    //Butacas
    @GetMapping
    @RequestMapping(value = "ConsultarButacas",method = RequestMethod.GET)
    public ResponseEntity<?> ConsultarButaca(){
        List<Butaca> listarButaca=this.bsimpl.ConsultarButaca();
        return ResponseEntity.ok(listarButaca);
    }

    @PostMapping
    @RequestMapping(value = "CrearButaca",method =RequestMethod.POST)
    public ResponseEntity<?> CrearButaca(@RequestBody Butaca butaca){
        Butaca ButacaCreada=this.bsimpl.CrearButaca(butaca);
        return ResponseEntity.status(HttpStatus.CREATED).body(ButacaCreada);
    }

    @PutMapping
    @RequestMapping(value = "ModificarButaca/{id}",method =RequestMethod.PUT)
    public ResponseEntity<?> ModificarButaca(@RequestBody Butaca butaca,@PathVariable int id){
        Butaca ButacaModificada=this.bsimpl.ModificarButaca(butaca, id);
        return ResponseEntity.status(HttpStatus.CREATED).body(ButacaModificada);
    }

    @GetMapping
    @RequestMapping(value = "BuscarButaca/{id}",method =RequestMethod.GET)
    public ResponseEntity<?> BuscarButaca(@PathVariable int id){
        Butaca butaca=this.bsimpl.BuscarButaca(id);
        return ResponseEntity.ok(butaca);
    }

    @DeleteMapping
    @RequestMapping(value = "EliminarButaca/{id}",method =RequestMethod.DELETE)
    public ResponseEntity<?> ElimnarButaca(@PathVariable int id){
        this.bsimpl.EliminarButaca(id);
        return ResponseEntity.ok().build();
    }
}
