package com.example.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Survey {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn (name = "event_id", nullable = false)
    private Event event;

    @Column (nullable = false)
    private String title;
}
