package com.cinema.cine.Service.UsuarioServiceIMPL;

import com.cinema.cine.Entity.Admin;
import com.cinema.cine.Entity.Sala;
import com.cinema.cine.Entity.Usuario;
import com.cinema.cine.Repository.UsuarioRepo;
import com.cinema.cine.Service.UsuarioService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Objects;

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
    public Usuario ModificarUsuario(Usuario usuario,String id) {
        Usuario usuarioExistente = this.repo.findById(id).orElse(null);
        if (usuarioExistente != null) {
            usuarioExistente.setUsuario(usuario.getUsuario());
            usuarioExistente.setPassword(usuario.getPassword());
            usuarioExistente.setNombre(usuario.getNombre());
            usuarioExistente.setApellido(usuario.getApellido());
            usuarioExistente.setDNI(usuario.getDNI());
            usuarioExistente.setDireccion(usuario.getDireccion());
            usuarioExistente.setCiudad(usuario.getCiudad());
            usuarioExistente.setCodigo_postal(usuario.getCodigo_postal());
            usuarioExistente.setEstado(usuario.getEstado());

            return this.repo.save(usuarioExistente);
        }
        // Si no se encuentra la sala, devolver null
        return null;
    }


    @Override
    public Usuario BuscarUsuario(String id) { return  this.repo.findById(id).get();}

    @Override
    public void EliminarUsuario(String id) {
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

    @Override
    public Boolean LoginUsuario(Usuario usuario) {
        Usuario usuarioLogued = this.repo.findById(usuario.getUsuario()).get();
        System.out.println(DigestUtils.md5Hex(usuario.getPassword()));
        return Objects.equals(DigestUtils.md5Hex(usuario.getPassword()), usuarioLogued.getPassword());
    }
}
