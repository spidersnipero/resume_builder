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

import com.web.resumeBuilder.model.Resume;
import com.web.resumeBuilder.service.ResumeService;



@RestController
@RequestMapping("/resume")
public class ResumeController {
    @Autowired
    private ResumeService resumeService;

    @GetMapping("/getresume/{id}")
    public ResponseEntity<List<Resume>> getAllQuestion(@PathVariable int id){
        return resumeService.getResume(id);
    }

    @PostMapping("/update/asnew")
    public ResponseEntity<Resume> updateResume(@RequestBody Resume resume){
        return resumeService.updateResume(resume);
    }
    
}









    