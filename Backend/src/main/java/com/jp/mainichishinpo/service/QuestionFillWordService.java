package com.jp.mainichishinpo.service;

import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.QuestionFillWord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface QuestionFillWordService {
    List<QuestionFillWord> getAllQuestion();

    Optional<QuestionFillWord> findById(Long questionId);

    Page<QuestionFillWord> searchByKeyword(String term, Pageable paging);
}
