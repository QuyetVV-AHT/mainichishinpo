package com.jp.mainichishinpo.service;

import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.payload.request.QuestionRequest;
import com.jp.mainichishinpo.payload.request.UserRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface QuestionService {

    List<Question> getAllQuestion();

    void delete(Long id);

    Question save(Question question);

    Optional<Question> findById(Long id);

    Page<Question> searchByKeyword(String term, Pageable paging);

    Question create(QuestionRequest questionRequest);

    boolean existsByQuestion(String question);

    List<Question> getListByExamId(Long examId);
}
