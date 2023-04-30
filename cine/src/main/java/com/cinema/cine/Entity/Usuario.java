package com.cinema.cine.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)

    @Column(name="Id_usuario")
    private int Id_usuario;
    @Column(name="Usuario")
    private String Usuario;
    @Column(name = "Password")
    private String Password;
    @Column(name = "Nombre")
    private String Nombre;
    @Column(name = "Apellido")
    private String Apellido;
    @Column(name = "DNI")
    private int DNI;
    @Column(name = "Direccion")
    private String Direccion;
    @Column(name = "Ciudad")
    private String Ciudad;
    @Column(name = "Codigo_postal")
    private String Codigo_postal;
    @Column(name = "Fehca_alta")
    private String Fehca_alta;
    @Column(name = "Tipo_usuario")
    private String Tipo_usuario;
    @Column(name = "Estado")
    private int Estado;

    public int getId_usuario() {
        return Id_usuario;
    }

    public void setId_usuario(int id_usuario) {
        Id_usuario = id_usuario;
    }

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

    public int getDNI() {
        return DNI;
    }

    public void setDNI(int DNI) {
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

    public String getFehca_alta() {
        return Fehca_alta;
    }

    public void setFehca_alta(String fehca_alta) {
        Fehca_alta = fehca_alta;
    }

    public String getTipo_usuario() {
        return Tipo_usuario;
    }

    public void setTipo_usuario(String tipo_usuario) {
        Tipo_usuario = tipo_usuario;
    }

    public int getEstado() {
        return Estado;
    }

    public void setEstado(int estado) {
        Estado = estado;
    }
}
