package com.cinema.cine.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @Column(name="Usuario")
    private String Usuario;
    @Column(name = "Password")
    private String Password;
    @Column(name = "Nombre")
    private String Nombre;
    @Column(name = "Apellido")
    private String Apellido;
    @Column(name = "DNI")
    private String DNI;
    @Column(name = "Direccion")
    private String Direccion;
    @Column(name = "Ciudad")
    private String Ciudad;
    @Column(name = "Codigo_postal")
    private String Codigo_postal;
    @Column(name = "Estado")
    private int Estado;

    public String getUsuario() {
        return Usuario;
    }

    public void setUsuario(String usuario) {
        Usuario = usuario;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String nombre) {
        Nombre = nombre;
    }

    public String getApellido() {
        return Apellido;
    }

    public void setApellido(String apellido) {
        Apellido = apellido;
    }

    public String getDNI() {
        return DNI;
    }

    public void setDNI(String DNI) {
        this.DNI = DNI;
    }

    public String getDireccion() {
        return Direccion;
    }

    public void setDireccion(String direccion) {
        Direccion = direccion;
    }

    public String getCiudad() {
        return Ciudad;
    }

    public void setCiudad(String ciudad) {
        Ciudad = ciudad;
    }

    public String getCodigo_postal() {
        return Codigo_postal;
    }

    public void setCodigo_postal(String codigo_postal) {
        Codigo_postal = codigo_postal;
    }

    public int getEstado() {
        return Estado;
    }

    public void setEstado(int estado) {
        Estado = estado;
    }
}
