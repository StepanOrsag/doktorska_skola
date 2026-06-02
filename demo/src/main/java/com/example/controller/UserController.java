package com.example.controller;
import com.example.entity.User;
import com.example.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") Long userId){
        return userRepository.findById(userId).orElse(null);
    }
}
