package com.web.resumeBuilder.model;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    // @JsonProperty("id")
    private int id;
    // @JsonProperty("about")
    private String About;
    // @JsonProperty("education")
    private String Education;
    // @JsonProperty("experience")
    private String Experience;
    // @JsonProperty("skills")
    private String Skills;
}
