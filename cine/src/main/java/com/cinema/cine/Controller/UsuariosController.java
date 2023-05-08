package com.cinema.cine.Controller;

;
import com.cinema.cine.Entity.Usuario;
import com.cinema.cine.Service.UsuarioServiceIMPL.USIMPL;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("AdminUsuario")
@RestController
@CrossOrigin("*")
public class UsuariosController {

    public UsuariosController(USIMPL usimpl) {
        this.usimpl = usimpl;
    }
    private final USIMPL usimpl;

    //Usuarios
    @GetMapping
    @RequestMapping(value = "ConsultarUsuarios",method = RequestMethod.GET)
    public ResponseEntity<?> ConsultarUsuario(){
        List<Usuario> listarUsuario=this.usimpl.ConsultarUsuario();
        return ResponseEntity.ok(listarUsuario);
    }

    @PostMapping
    @RequestMapping(value = "CrearUsuario",method =RequestMethod.POST)
    public ResponseEntity<?> CrearUsuario(@RequestBody Usuario usuario){
        Usuario UsuarioCreada=this.usimpl.CrearUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(UsuarioCreada);
    }

    @PutMapping
    @RequestMapping(value = "ModificarUsuario/{id}",method =RequestMethod.PUT)
    public ResponseEntity<?> ModificarUsuario(@RequestBody Usuario usuario,@PathVariable int id){
        Usuario UsuarioModificada=this.usimpl.ModificarUsuario(usuario, id);
        return ResponseEntity.status(HttpStatus.CREATED).body(UsuarioModificada);
    }

    @GetMapping
    @RequestMapping(value = "BuscarUsuario/{id}",method =RequestMethod.GET)
    public ResponseEntity<?> BuscarUsuario(@PathVariable int id){
        Usuario usuario=this.usimpl.BuscarUsuario(id);
        return ResponseEntity.ok(usuario);
    }

    @DeleteMapping
    @RequestMapping(value = "EliminarUsuario/{id}",method =RequestMethod.DELETE)
    public ResponseEntity<?> EliminarUsuario(@PathVariable int id){
        this.usimpl.EliminarUsuario(id);
        return ResponseEntity.ok().build();
    }

}
