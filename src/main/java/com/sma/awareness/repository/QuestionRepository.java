package com.sma.awareness.repository;

import com.sma.awareness.model.SurveyQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<SurveyQuestion, Long> {
}
