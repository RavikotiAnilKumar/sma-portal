package com.sma.awareness.service;

import com.sma.awareness.model.*;
import com.sma.awareness.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
import java.util.List;

@Service
public class SurveyService {

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Transactional
    public void processSurveySubmission(Map<String, String> rawData) {
        // 1. Save Participant
        Participant participant = new Participant();
        participant.setAgeGroup(rawData.get("ageGroup"));
        participant.setLocation(rawData.get("location"));
        participant.setGender(rawData.get("gender"));
        participant = participantRepository.save(participant);

        // 2. Save Responses
        List<SurveyQuestion> questions = questionRepository.findAll();
        String stage = rawData.getOrDefault("surveyStage", "POST");

        // Loop through all questions in database
        for (int i = 0; i < questions.size(); i++) {
            SurveyQuestion q = questions.get(i);
            // The frontend sends q1, q2... q15 based on order
            String answer = rawData.get("q" + (i + 1)); 
            
            if (answer != null) {
                SurveyResponse response = new SurveyResponse();
                response.setParticipant(participant);
                response.setQuestion(q);
                response.setAnswer(answer);
                response.setSurveyStage(stage);
                surveyRepository.save(response);
            }
        }
    }

    public long getParticipantCount() {
        return participantRepository.count();
    }
}
