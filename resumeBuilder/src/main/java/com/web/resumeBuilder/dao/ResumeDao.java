package com.web.resumeBuilder.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.resumeBuilder.model.Resume;

@Repository
public interface ResumeDao extends JpaRepository<Resume, Integer>  {
    
}
