package com.sma.awareness.repository;

import com.sma.awareness.model.SurveyResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<SurveyResponse, Long> {
    List<SurveyResponse> findBySurveyStage(String surveyStage);
}
