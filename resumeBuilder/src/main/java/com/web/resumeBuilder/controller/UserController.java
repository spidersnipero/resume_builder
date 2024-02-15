package com.web.resumeBuilder.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.web.resumeBuilder.model.Users;
import com.web.resumeBuilder.service.UserService;



@RestController
@RequestMapping("/login")
public class UserController {
    @Autowired
    private UserService UserService;

    @GetMapping("/{email}/{password}")
    public ResponseEntity<List<Users>> getAllQuestion(@PathVariable String email, @PathVariable String password){
        return UserService.getUser(email, password);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody Users user){
        System.out.println(user);
        return UserService.addUser(user);
    }
}
