package com.cinema.cine.Entity;

import jakarta.persistence.*;

@Table(name = "admin")
@Entity
public class Admin {

    @Id
    @Column(name = "id_admin")
    private int IdAdmin;
    @Column(name = "Password")
    private String Password;
    @Column(name = "Nombre")
    private String Nombre;
    @Column(name = "Estado")
    private int Estado;

    public int getIdAdmin() {
        return IdAdmin;
    }

    public void setIdAdmin(int idAdmin) {
        IdAdmin = idAdmin;
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

    public int getEstado() {
        return Estado;
    }

    public void setEstado(int estado) {
        Estado = estado;
    }
}
