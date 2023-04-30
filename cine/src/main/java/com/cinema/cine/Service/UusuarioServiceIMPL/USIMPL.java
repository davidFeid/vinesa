package com.cinema.cine.Service.UusuarioServiceIMPL;

import com.cinema.cine.Entity.Usuario;
import com.cinema.cine.Repository.UsuarioRepo;
import com.cinema.cine.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class USIMPL implements UsuarioService {

    @Autowired
    private UsuarioRepo repo;

    @Override
    public List<Usuario> ConsultarUsuario(){ return (List<Usuario>) this.repo.findAll();}

    @Override
    public Usuario CrearUsuario(Usuario usuario){
        usuario.setNombre(usuario.getNombre());
        return  this.repo.save(usuario);
    }

    @Override
    public Usuario ModificarUsuario(Usuario usuario) { return this.repo.save(usuario); }

    @Override
    public Usuario BuscarUsuario(int id) { return  this.repo.findById(id).get();}

    @Override
    public void EliminarUsuario(int id) { this.repo.deleteById(id); }
}
