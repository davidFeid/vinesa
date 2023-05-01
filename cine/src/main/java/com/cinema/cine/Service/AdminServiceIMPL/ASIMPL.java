package com.cinema.cine.Service.AdminServiceIMPL;

import com.cinema.cine.Entity.Admin;
import com.cinema.cine.Repository.AdminRepo;
import com.cinema.cine.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.digest.DigestUtils;


import java.util.Objects;

@Service
public class ASIMPL implements AdminService {

    @Autowired
    private AdminRepo repo;

    @Override
    public Admin BuscarAdmin(int id) {
        return this.repo.findById(id).get();
    }

    @Override
    public Boolean LoginAdmin(Admin admin) {
        Admin adminLogued = this.repo.findById(admin.getIdAdmin()).get();
        return Objects.equals(DigestUtils.md5Hex(admin.getPassword()), adminLogued.getPassword());
    }
}
