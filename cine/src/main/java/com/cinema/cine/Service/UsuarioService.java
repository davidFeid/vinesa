package com.cinema.cine.Service;

import com.cinema.cine.Entity.Usuario;
import java.util.List;
public interface UsuarioService {

    public List<Usuario> ConsultarUsuario();
    public Usuario CrearUsuario(Usuario usuario);
    public Usuario ModificarUsuario(Usuario usuario);
    public Usuario BuscarUsuario(int id);
    public void EliminarUsuario(int id);

}
