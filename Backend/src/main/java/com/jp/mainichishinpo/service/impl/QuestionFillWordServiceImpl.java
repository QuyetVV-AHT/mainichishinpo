package com.jp.mainichishinpo.service.impl;

import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.QuestionFillWord;
import com.jp.mainichishinpo.repository.QuestionFillWordRepository;
import com.jp.mainichishinpo.service.QuestionFillWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Override
    public Page<QuestionFillWord> searchByKeyword(String term, Pageable paging) {
        Page<QuestionFillWord> res = questionFillWordRepository.searchByKeyword(term, paging);
        return res;
    }
}
