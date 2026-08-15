package com.sma.awareness.service;

import com.sma.awareness.model.SurveyQuestion;
import com.sma.awareness.model.SurveyResponse;
import com.sma.awareness.repository.ParticipantRepository;
import com.sma.awareness.repository.QuestionRepository;
import com.sma.awareness.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ResultsService {

    @Autowired
    private SurveyRepository surveyRepository;
    
    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Map<String, Object> getCalculatedStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        List<SurveyResponse> allResponses = surveyRepository.findAll();
        List<SurveyResponse> pre = allResponses.stream().filter(r -> "PRE".equals(r.getSurveyStage())).collect(Collectors.toList());
        List<SurveyResponse> post = allResponses.stream().filter(r -> "POST".equals(r.getSurveyStage())).collect(Collectors.toList());
        
        double awarenessBefore = calculateAwareness(pre);
        double awarenessAfter = calculateAwareness(post);

        stats.put("totalParticipants", participantRepository.count());
        stats.put("awarenessBefore", Math.round(awarenessBefore * 10.0) / 10.0);
        stats.put("awarenessAfter", Math.round(awarenessAfter * 10.0) / 10.0);
        stats.put("improvement", Math.round((awarenessAfter - awarenessBefore) * 10.0) / 10.0);
        
        // Demographic Breakdowns
        stats.put("ageGroupStats", calculateDemographicStats("ageGroup", allResponses));
        stats.put("locationStats", calculateDemographicStats("location", allResponses));
        
        // Question-wise Stats (Post-Activity)
        stats.put("questionStats", calculateQuestionStats(post));

        // Category-wise Comparison
        stats.put("categoryComparison", calculateCategoryComparison(pre, post));
        
        return stats;
    }

    private Map<String, Double> calculateDemographicStats(String type, List<SurveyResponse> responses) {
        Map<String, List<SurveyResponse>> grouped;
        if ("ageGroup".equals(type)) {
            grouped = responses.stream().collect(Collectors.groupingBy(r -> r.getParticipant().getAgeGroup()));
        } else {
            grouped = responses.stream().collect(Collectors.groupingBy(r -> r.getParticipant().getLocation()));
        }

        Map<String, Double> result = new HashMap<>();
        grouped.forEach((key, list) -> {
            result.put(key, Math.round(calculateAwareness(list) * 10.0) / 10.0);
        });
        return result;
    }

    private Map<String, Double> calculateQuestionStats(List<SurveyResponse> responses) {
        Map<Long, List<SurveyResponse>> grouped = responses.stream().collect(Collectors.groupingBy(r -> r.getQuestion().getId()));
        Map<String, Double> result = new LinkedHashMap<>();
        
        List<SurveyQuestion> allQuestions = questionRepository.findAll();
        for (SurveyQuestion q : allQuestions) {
            List<SurveyResponse> qResponses = grouped.getOrDefault(q.getId(), new ArrayList<>());
            result.put(q.getQuestionText(), Math.round(calculateAwareness(qResponses) * 10.0) / 10.0);
        }
        return result;
    }

    private Map<String, Map<String, Double>> calculateCategoryComparison(List<SurveyResponse> pre, List<SurveyResponse> post) {
        Map<String, Map<String, Double>> result = new HashMap<>();
        
        Set<String> categories = questionRepository.findAll().stream().map(SurveyQuestion::getCategory).collect(Collectors.toSet());
        
        for (String cat : categories) {
            Map<String, Double> catStats = new HashMap<>();
            List<SurveyResponse> preCat = pre.stream().filter(r -> cat.equals(r.getQuestion().getCategory())).collect(Collectors.toList());
            List<SurveyResponse> postCat = post.stream().filter(r -> cat.equals(r.getQuestion().getCategory())).collect(Collectors.toList());
            
            catStats.put("before", Math.round(calculateAwareness(preCat) * 10.0) / 10.0);
            catStats.put("after", Math.round(calculateAwareness(postCat) * 10.0) / 10.0);
            result.put(cat, catStats);
        }
        return result;
    }

    private double calculateAwareness(List<SurveyResponse> responses) {
        if (responses.isEmpty()) return 0;
        long positiveCount = responses.stream().filter(r -> "yes".equalsIgnoreCase(r.getAnswer())).count();
        return (double) positiveCount / responses.size() * 100;
    }
}
