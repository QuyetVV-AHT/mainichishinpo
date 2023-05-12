package com.jp.mainichishinpo.service;

import com.jp.mainichishinpo.entity.QuestionFillWord;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface QuestionFillWordService {
    List<QuestionFillWord> getAllQuestion();

    Optional<QuestionFillWord> findById(Long questionId);
}
