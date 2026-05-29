package com.example.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn (name = "registration_id", nullable = false)
    private Registration registration;

    @Column (nullable = false)
    private Boolean attended;

    private LocalDateTime checkedInAt;
}
