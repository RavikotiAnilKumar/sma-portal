package com.sma.awareness.controller;

import com.sma.awareness.model.ActivityLog;
import com.sma.awareness.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET})
public class ActivityController {

    @Autowired
    private ActivityRepository activityRepository;

    @PostMapping("/add")
    public ResponseEntity<ActivityLog> addActivity(@RequestBody ActivityLog activity) {
        return ResponseEntity.ok(activityRepository.save(activity));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ActivityLog>> getAllActivities() {
        return ResponseEntity.ok(activityRepository.findAll());
    }
}
