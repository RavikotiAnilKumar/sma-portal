package com.sma.awareness.controller;

import com.sma.awareness.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/survey")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET})
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitSurvey(@RequestBody Map<String, String> rawData) {
        surveyService.processSurveySubmission(rawData);
        return ResponseEntity.ok("Survey processed successfully");
    }
}
