package com.example.service;

import com.example.entity.Event;
import com.example.entity.User;
import com.example.entity.Role;
import com.example.repository.EventRepository;
import com.example.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public String createEvent(Event event, Long userId) {
        User creator = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Uivatel s id: " + userId + " nebyl nalezen"));

        if (creator.getRole() != Role.ORGANIZATOR){
            return "Akce může zakládat pouze organizátor";
        }
        event.setOrganizer(creator);
        event.setDateTime(LocalDateTime.now());

        eventRepository.save(event);
        return "Akce úspěšně vytvořena";
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}
