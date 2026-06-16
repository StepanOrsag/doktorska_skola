package com.example.controller;

import com.example.entity.Event;
import com.example.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{eventId}")
    public Event getEventById(@PathVariable Long eventId) {
        return eventService.getEventById(eventId);
    }

    @PostMapping
    public ResponseEntity<String> createEvent(@RequestBody Event newEvent, @RequestParam Long userId) {
        String result = eventService.createEvent(newEvent, userId);

        if(result.equals("Akce může zakládat pouze organizátor")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
        }

        return ResponseEntity.ok(result);
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<String> updateEvent(@PathVariable Long eventId, @RequestBody Event eventDetails) {
        String result = eventService.updateEvent(eventId, eventDetails);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{eventId}")
    public void deleteEvent(@PathVariable("eventId") Long eventId){
        eventService.deleteEvent(eventId);
    }
}
