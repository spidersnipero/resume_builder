package com.web.resumeBuilder.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.resumeBuilder.model.Users;

@Repository
public interface UserDao extends JpaRepository<Users, Integer>  {
    Users findByEmailAndPassword(String email, String password);
}
