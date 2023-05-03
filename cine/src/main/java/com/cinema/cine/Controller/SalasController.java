package com.cinema.cine.Controller;

import com.cinema.cine.Entity.Butaca;
import com.cinema.cine.Entity.Sala;
import com.cinema.cine.Service.ButacaServiceIMPL.BSIMPL;
import com.cinema.cine.Service.SalaServiceIMPL.SSIMPL;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("AdminSala")
@RestController
@CrossOrigin("*")
public class SalasController {

    public SalasController(SSIMPL ssimpl, BSIMPL bsimpl){
        this.ssimpl = ssimpl;
        this.bsimpl = bsimpl;
    }
    private final SSIMPL ssimpl;
    private  final BSIMPL bsimpl;


    //Salas
    @GetMapping
    @RequestMapping(value = "ConsultarSalas",method = RequestMethod.GET)
    public ResponseEntity<?> ConsultarSala(){
        List<Sala> listarSala=this.ssimpl.ConsultarSala();
        return ResponseEntity.ok(listarSala);
    }

    @PostMapping
    @RequestMapping(value = "CrearSala",method =RequestMethod.POST)
    public ResponseEntity<?> CrearSala(@RequestBody Sala sala){
        Sala SalaCreada=this.ssimpl.CrearSala(sala);
        for (int i=1; i<=SalaCreada.getFilas();i++){
            for(int j = 1; j<=SalaCreada.getButacasporfila();j++){
                System.out.println(i+"-"+j);
                Butaca butaca = new Butaca();
                butaca.setId_sala(SalaCreada.getId_sala());
                butaca.setId_butaca(i+"-"+j);
                butaca.setColumna(j);
                butaca.setFila(i);
                butaca.setEstado(1);
                this.bsimpl.CrearButaca(butaca);
            }
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(SalaCreada);
    }

    @PutMapping
    @RequestMapping(value = "ModificarSala/{id}",method =RequestMethod.PUT)
    public ResponseEntity<?> ModificarSala(@RequestBody Sala sala,@PathVariable int id){
        Sala SalaModificada=this.ssimpl.ModificarSala(sala,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(SalaModificada);
    }

    @GetMapping
    @RequestMapping(value = "BuscarSala/{id}",method =RequestMethod.GET)
    public ResponseEntity<?> BuscarSala(@PathVariable int id){
        Sala sala=this.ssimpl.BuscarSala(id);
        return ResponseEntity.ok(sala);
    }
    @DeleteMapping
    @RequestMapping(value = "EliminarSala/{id}",method =RequestMethod.DELETE)
    public ResponseEntity<?> ElimnarSala(@PathVariable int id){
        this.ssimpl.EliminarSala(id);
        return ResponseEntity.ok().build();
    }
}
