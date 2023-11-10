package com.web.resumeBuilder.service;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.resumeBuilder.dao.ResumeDao;
import com.web.resumeBuilder.model.Resume;
import java.util.Optional;


@Service

public class ResumeService {
    @Autowired
    private ResumeDao resumeDao;

    public ResponseEntity<List<Resume>> getResume(int id){

        List<Resume> resume = new ArrayList<>();
        try {
            Optional<Resume> optionalResume = resumeDao.findById(id);
            if (optionalResume.isPresent()) {
                Resume resumeVal = optionalResume.get();
                resume.add(resumeVal);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
        return new ResponseEntity<>(resume, HttpStatus.OK);
    }
    // updating resume by id
    public ResponseEntity<Resume> updateResume(Resume resume) {
        System.out.println(resume);
        try {
            Optional<Resume> optionalResume = resumeDao.findById(resume.getId());
            
            if (optionalResume.isPresent()) {
                Resume resumeVal = optionalResume.get();
                System.out.println(resumeVal);
                resumeVal.setAbout(resume.getAbout());
                resumeVal.setEducation(resume.getEducation());
                resumeVal.setExperience(resume.getExperience());
                resumeVal.setSkills(resume.getSkills());
                resumeDao.save(resumeVal);
                return new ResponseEntity<>(resumeVal, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
    }

}
