package com.cinema.cine.Service.UsuarioServiceIMPL;

import com.cinema.cine.Entity.Sala;
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
    public Usuario ModificarUsuario(Usuario usuario,int id) {
        Usuario usuarioExistente = this.repo.findById(id).orElse(null);
        if (usuarioExistente != null) {
            usuarioExistente.setId_usuario(usuario.getId_usuario());
            usuarioExistente.setUsuario(usuario.getUsuario());
            usuarioExistente.setPassword(usuario.getPassword());
            usuarioExistente.setNombre(usuario.getNombre());
            usuarioExistente.setApellido(usuario.getApellido());
            usuarioExistente.setDNI(usuario.getDNI());
            usuarioExistente.setDireccion(usuario.getDireccion());
            usuarioExistente.setCiudad(usuario.getCiudad());
            usuarioExistente.setCodigo_postal(usuario.getCodigo_postal());
            usuarioExistente.setFecha_alta(usuario.getFecha_alta());
            usuarioExistente.setTipo_usuario(usuario.getTipo_usuario());
            usuarioExistente.setEstado(usuario.getEstado());

            return this.repo.save(usuarioExistente);
        }
        // Si no se encuentra la sala, devolver null
        return null;
    }


    @Override
    public Usuario BuscarUsuario(int id) { return  this.repo.findById(id).get();}

    @Override
    public void EliminarUsuario(int id) {
        Usuario usuarioExistente = this.repo.findById(id).orElse(null);
        if (usuarioExistente != null) {
            if (usuarioExistente.getEstado() == 1) {
                usuarioExistente.setEstado(0);
            } else {
                usuarioExistente.setEstado(1);
            }
            this.repo.save(usuarioExistente);
        }

    }
}
