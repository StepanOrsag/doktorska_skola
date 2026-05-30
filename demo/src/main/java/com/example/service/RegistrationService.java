package com.example.service;

import com.example.entity.*;
import com.example.repository.EventRepository;
import com.example.repository.RegistrationRepository;
import com.example.repository.UserRepository;
import com.example.repository.WaitlistRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final WaitlistRepository waitlistRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public RegistrationService(RegistrationRepository registrationRepository, WaitlistRepository waitlistRepository, EventRepository eventRepository, UserRepository userRepository) {
        this.registrationRepository = registrationRepository;
        this.waitlistRepository = waitlistRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public String registerStudent(Long eventId, Long userId){
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Událost nebyla nalezena."));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Uživatel nebyl nalezen."));

        if (registrationRepository.existsByEventIdAndUserId(eventId, userId)){
            return "Tento uživatel je již na událost přihlášen.";
        }

        long confirmedCount = registrationRepository.countByEventIdAndStatus(eventId, RegistrationStatus.CONFIRMED);

        if (confirmedCount < event.getCapacity()){
            Registration registration = new Registration();
            registration.setEvent(event);
            registration.setUser(user);
            registration.setRegistrationDate(LocalDateTime.now());
            registration.setStatus(RegistrationStatus.CONFIRMED);
            registrationRepository.save(registration);

            return "Úspěšně zaregistrování!";
        } else{
            Waitlist waitlist = new Waitlist();
            waitlist.setEvent(event);
            waitlist.setUser(user);
            waitlist.setAddedAt(LocalDateTime.now());
            waitlistRepository.save(waitlist);

            return "Kapacita je plná. Byl jsi zařazen na čekací listinu.";
        }
    }

    @Transactional
    public String cancelRegistration(Long eventId, Long userId){
        Registration registration = registrationRepository.findByEventIdAndUserId(eventId, userId)
                .orElseThrow(() -> new RuntimeException("Registrace nenalezena."));

        registrationRepository.delete(registration);

        var waitingStudent = waitlistRepository.findFirstByEventIdOrderByAddedAtAsc(eventId);

        if (waitingStudent.isPresent()){
            Registration newRegistration = new Registration();
            newRegistration.setEvent(waitingStudent.get().getEvent());
            newRegistration.setUser(waitingStudent.get().getUser());
            newRegistration.setRegistrationDate(LocalDateTime.now());
            newRegistration.setStatus(RegistrationStatus.CONFIRMED);
            registrationRepository.save(newRegistration);

            waitlistRepository.delete(waitingStudent.get());

            return "Registrace zrušena. Místo bylo automaticky přiděleno náhradníkovi";
        }

        return "Registrace zrušena. Ve frontě nezůstal žádný náhradník, místo zůstává volné";
    }
}
