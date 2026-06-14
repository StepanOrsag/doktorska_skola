package com.example.service;

import com.example.entity.Event;
import com.example.entity.User;
import com.example.entity.Role;
import com.example.repository.EventRepository;
import com.example.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final RegistrationService registrationService;

    public EventService(EventRepository eventRepository, UserRepository userRepository, RegistrationService registrationService) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.registrationService = registrationService;
    }

    public String createEvent(Event event, Long userId) {
        User creator = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Uivatel s id: " + userId + " nebyl nalezen"));

        if (creator.getRole() != Role.ORGANIZATOR){
            return "Akce může zakládat pouze organizátor";
        }
        event.setOrganizer(creator);
        if (event.getDate().isBefore(LocalDate.now())){
            return "Akce se nedá naplánovat do minulosti";
        }

        eventRepository.save(event);
        return "Akce úspěšně vytvořena";
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Akce nebyla nalezena"));
    }

    public void deleteEvent(Long eventId) {
        if (!registrationService.getConfirmedRegistrations(eventId).isEmpty()){
            registrationService.cancelAllRegistrations(eventId);
        }
        eventRepository.deleteById(eventId);
    }
}
