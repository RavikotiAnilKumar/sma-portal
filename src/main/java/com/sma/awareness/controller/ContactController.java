package com.sma.awareness.controller;

import com.sma.awareness.model.ContactMessage;
import com.sma.awareness.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping("/submit")
    public ResponseEntity<String> submitMessage(@RequestBody ContactMessage message) {
        contactRepository.save(message);
        return ResponseEntity.ok("Message received. We will get back to you soon!");
    }
}
