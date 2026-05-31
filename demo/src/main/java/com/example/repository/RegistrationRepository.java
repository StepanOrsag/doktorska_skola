package com.example.repository;

import com.example.entity.Registration;
import com.example.entity.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    long countByEventIdAndStatus(Long eventId, RegistrationStatus status);

    boolean existsByEventIdAndUserId(Long eventId, Long userId);

    List<Registration> findByEventIdAndStatus(Long eventId, RegistrationStatus status);

    Optional<Registration> findByEventIdAndUserId(Long eventId, Long userId);
}
