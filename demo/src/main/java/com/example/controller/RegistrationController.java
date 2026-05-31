package com.example.controller;

import com.example.entity.Registration;
import com.example.service.RegistrationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/register")
    public String register(@RequestParam Long eventId, @RequestParam Long userId){
        return registrationService.registerStudent(eventId, userId);
    }

    @PutMapping("/attendance")
    public String markAttendance(@RequestParam Long eventId, @RequestParam Long userId, @RequestParam Boolean isPresent){
        return registrationService.markAttendence(eventId, userId, isPresent);
    }

    @GetMapping("event/{eventId}")
    public List<Registration> getEventRegistration(@PathVariable Long eventId){
        return registrationService.getConfirmedRegistrations(eventId);
    }

    @DeleteMapping("/delete")
    public String cancel(@RequestParam Long eventId, @RequestParam Long userId){
        return registrationService.cancelRegistration(eventId, userId);
    }
}
