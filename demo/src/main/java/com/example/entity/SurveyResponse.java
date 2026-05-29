package com.example.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SurveyResponse {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn (name = "survey_id", nullable = false)
    private Survey survey;

    @Column (nullable = false)
    private int rating;

    @Column (columnDefinition = "TEXT")
    private String comment;
}
