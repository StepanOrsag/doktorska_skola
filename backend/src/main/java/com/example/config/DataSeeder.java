package com.example.config;

import com.example.entity.Event;
import com.example.entity.EventType;
import com.example.entity.Role;
import com.example.entity.User;
import com.example.repository.EventRepository;
import com.example.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, EventRepository eventRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0){
            System.out.println("Zahajuji vkládání testovacích dat");

            User organizer = new User();
            organizer.setFullName("Jan Novák");
            organizer.setEmail("jan.novak@uhk.cz");
            organizer.setRole(Role.ORGANIZATOR);
            organizer.setGdprConsent(true);
            organizer.setPassword(passwordEncoder.encode("novak123"));
            userRepository.save(organizer);

            User student = new User();
            student.setFullName("Petr Student");
            student.setEmail("petr.student@uhk.cz");
            student.setRole(Role.USER);
            student.setGdprConsent(true);
            student.setPassword(passwordEncoder.encode("student123"));
            userRepository.save(student);

            User newStudent = new User();
            newStudent.setFullName("Karel Test");
            newStudent.setEmail("karel.test@uhk.cz");
            newStudent.setRole(Role.USER);
            newStudent.setGdprConsent(true);
            newStudent.setPassword(passwordEncoder.encode("test123"));
            userRepository.save(newStudent);

            System.out.println("Testovací data úspěšně vložena");
        }
    }
}
