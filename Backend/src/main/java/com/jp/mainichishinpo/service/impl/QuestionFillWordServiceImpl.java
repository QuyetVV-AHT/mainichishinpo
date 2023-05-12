package com.jp.mainichishinpo.service.impl;

import com.jp.mainichishinpo.entity.QuestionFillWord;
import com.jp.mainichishinpo.repository.QuestionFillWordRepository;
import com.jp.mainichishinpo.service.QuestionFillWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class QuestionFillWordServiceImpl implements QuestionFillWordService {
    @Autowired
    private QuestionFillWordRepository questionFillWordRepository;
    @Override
    public List<QuestionFillWord> getAllQuestion() {
        return questionFillWordRepository.findAll();
    }

    @Override
    public Optional<QuestionFillWord> findById(Long questionId) {
        return questionFillWordRepository.findById(questionId);
    }
}
