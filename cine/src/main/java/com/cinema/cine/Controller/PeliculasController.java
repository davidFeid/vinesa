package com.cinema.cine.Controller;

import com.cinema.cine.Entity.Pelicula;
import com.cinema.cine.Service.PeliculaServiceIMPL.PSIMPL;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("AdminPelicula")
@RestController
@CrossOrigin("*")
public class PeliculasController {

    public PeliculasController(PSIMPL psimpl){
        this.psimpl = psimpl;
    }
    private final PSIMPL psimpl;

    //Peliculas
    @GetMapping
    @RequestMapping(value = "ConsultarPeliculas", method = RequestMethod.GET)
    public ResponseEntity<?> ConsultarPeliculas(){
        List<Pelicula> listarPelicula=this.psimpl.ConsultarPelicula();
        return ResponseEntity.ok(listarPelicula);
    }

    @PostMapping
    @RequestMapping(value = "CrearPeliculas", method = RequestMethod.POST)
    public ResponseEntity<?> CrearPeliculas(@RequestBody Pelicula pelicula){
        Pelicula PeliculaCreada = this.psimpl.CrearPelicula(pelicula);
        return ResponseEntity.status(HttpStatus.CREATED).body(PeliculaCreada);
    }

    @PutMapping
    @RequestMapping(value = "ModificarPelicula/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> ModificarPelicula(@RequestBody Pelicula pelicula,@PathVariable int id){
        Pelicula PeliculaModificada = this.psimpl.ModificarPelicula(pelicula,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(PeliculaModificada);
    }

    @GetMapping
    @RequestMapping(value = "BuscarPelicula/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> BuscarPelicula(@PathVariable int id){
        Pelicula pelicula = this.psimpl.BuscarPelicula(id);
        return ResponseEntity.ok(pelicula);
    }

    @DeleteMapping
    @RequestMapping(value = "EliminarPelicula/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> EliminarPelicula(@PathVariable int id){
        this.psimpl.EliminarPelicula(id);
        return ResponseEntity.ok().build();
    }


}
