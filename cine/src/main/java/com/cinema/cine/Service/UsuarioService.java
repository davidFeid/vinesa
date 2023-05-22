package com.cinema.cine.Service;

import com.cinema.cine.Entity.Admin;
import com.cinema.cine.Entity.Usuario;
import java.util.List;
public interface UsuarioService {

    public List<Usuario> ConsultarUsuario();
    public Usuario CrearUsuario(Usuario usuario);
    public Usuario ModificarUsuario(Usuario usuario,String id);
    public Usuario BuscarUsuario(String id);
    public void EliminarUsuario(String id);

    public Boolean LoginUsuario(Usuario usuario);

}
