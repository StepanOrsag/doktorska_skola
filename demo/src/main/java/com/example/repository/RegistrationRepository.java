package com.example.repository;

import com.example.entity.Registration;
import com.example.entity.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    long countByEventIdAndStatus(long eventId, RegistrationStatus status);

    boolean existsByEventIdAndUserId(long eventId, long userId);

    Optional<Registration> findByEventIdAndUserId(long eventId, long userId);
}
