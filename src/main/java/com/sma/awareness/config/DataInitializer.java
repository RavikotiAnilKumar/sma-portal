package com.sma.awareness.config;

import com.sma.awareness.model.*;
import com.sma.awareness.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private SurveyRepository surveyRepository;
    
    @Autowired
    private ParticipantRepository participantRepository;

    @Override
    public void run(String... args) throws Exception {
        if (questionRepository.count() == 0) {
            List<SurveyQuestion> questions = questionRepository.saveAll(Arrays.asList(
                new SurveyQuestion(null, "Have you ever heard of SMA?", "General"),
                new SurveyQuestion(null, "Do you know SMA is genetic?", "Genetics"),
                new SurveyQuestion(null, "Aware SMA affects motor neurons?", "General"),
                new SurveyQuestion(null, "Know any SMA symptoms?", "Symptoms"),
                new SurveyQuestion(null, "Aware genetic testing helps diagnosis?", "Diagnosis"),
                new SurveyQuestion(null, "Know Types 1-4?", "General"),
                new SurveyQuestion(null, "Aware SMA is a leading genetic cause of infant death?", "Risk"),
                new SurveyQuestion(null, "Know if there is a complete cure?", "Treatment"),
                new SurveyQuestion(null, "Aware carrier screening identifies risk?", "Genetics"),
                new SurveyQuestion(null, "Know physiotherapy is essential?", "Management"),
                new SurveyQuestion(null, "Aware of newborn screening?", "Diagnosis"),
                new SurveyQuestion(null, "Know symptoms can appear in adulthood?", "Symptoms"),
                new SurveyQuestion(null, "Aware missing SMN1 gene causes SMA?", "Genetics"),
                new SurveyQuestion(null, "Know any local support groups?", "Support"),
                new SurveyQuestion(null, "Would participate in awareness program?", "Engagement")
            ));
            System.out.println("15 Survey Questions Initialized!");

            if (participantRepository.count() == 0) {
                // Mock PRE Participant
                Participant p1 = participantRepository.save(new Participant(null, "18-25", "Rural Area", "M", null));
                surveyRepository.save(new SurveyResponse(null, p1, questions.get(0), "no", "PRE", null));
                surveyRepository.save(new SurveyResponse(null, p1, questions.get(1), "no", "PRE", null));
                
                // Mock POST Participant
                Participant p2 = participantRepository.save(new Participant(null, "26-40", "Urban Area", "F", null));
                for(SurveyQuestion q : questions) {
                    surveyRepository.save(new SurveyResponse(null, p2, q, "yes", "POST", null));
                }
                System.out.println("Mock Participants and Responses Initialized!");
            }
        }
    }
}
