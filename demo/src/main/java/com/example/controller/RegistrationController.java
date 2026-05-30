package com.example.controller;

import com.example.service.RegistrationService;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/delete")
    public String cancel(@RequestParam Long eventId, @RequestParam Long userId){
        return registrationService.cancelRegistration(eventId, userId);
    }
}
