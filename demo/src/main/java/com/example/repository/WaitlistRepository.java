package com.example.repository;

import com.example.entity.Waitlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.OptionalInt;

public interface WaitlistRepository extends JpaRepository<Waitlist, Long> {
    Optional<Waitlist> findFirstByEventIdOrderByAddedAtAsc(long id);
    void deleteByEventId(Long id);
}
