package com.web.resumeBuilder.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.resumeBuilder.dao.UserDao;
import com.web.resumeBuilder.dao.ResumeDao;
import com.web.resumeBuilder.model.Resume;
import com.web.resumeBuilder.model.Users;


@Service
public class UserService {
    
    @Autowired
    private UserDao UserDao;

    @Autowired
    private ResumeDao ResumeDao;

    @Autowired
    private ResumeService ResumeService;

    // get User with id
    public ResponseEntity<List<Users>> getUser(String email, String password) {
        List<Users> User = new ArrayList<>();
        try{
            Users Userval = UserDao.findByEmailAndPassword(email, password);
            User.add(Userval);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
        return new ResponseEntity<>(User, HttpStatus.OK);
    }
    
    public ResponseEntity<String> addUser(Users user) {
        try{
            Resume resume = new Resume();
            ResumeDao.save(resume);
            resume = ResumeService.getResume(resume.getId()).getBody().get(0);
            user.setResumeId(resume.getId());
            UserDao.save(user);
        }
        catch(Exception e){
            return new ResponseEntity<>("Failed", HttpStatus.BAD_GATEWAY);
        }
        return new ResponseEntity<>("Sucess", HttpStatus.CREATED);
    }

}
