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

        // 2. Save Responses for each question
        List<SurveyQuestion> questions = questionRepository.findAll();
        String stage = rawData.getOrDefault("surveyStage", "POST");

        for (SurveyQuestion q : questions) {
            // Map key q1, q2, etc to question text
            String answer = rawData.get("q" + q.getId());
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
