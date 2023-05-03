package com.cinema.cine.Controller;

import com.cinema.cine.Entity.Admin;
import com.cinema.cine.Service.AdminServiceIMPL.ASIMPL;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("Admin")
@RestController
@CrossOrigin("*")
public class AdminController {

    public AdminController(ASIMPL asimpl) {
        this.asimpl = asimpl;
    }

    private final ASIMPL asimpl;

    //Admin
    @GetMapping
    @RequestMapping(value = "BuscarAdmin/{id}",method = RequestMethod.GET)
    public ResponseEntity<?> BuscarAdmin(@PathVariable int id){
        Admin admin=this.asimpl.BuscarAdmin(id);
        return ResponseEntity.ok(admin);
    }

    @PostMapping
    @RequestMapping(value = "LoginAdmin",method =RequestMethod.POST)
    public ResponseEntity<?> LoginAdmin(@RequestBody Admin admin){
        Boolean adminLogueado=this.asimpl.LoginAdmin(admin);
        return ResponseEntity.ok(adminLogueado);
    }

}
