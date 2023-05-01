package com.cinema.cine.Service;

import com.cinema.cine.Entity.Admin;

import java.util.List;

public interface AdminService {

    public Admin BuscarAdmin(int id);
    public Boolean LoginAdmin(Admin admin);


}
