package com.jp.mainichishinpo.service;

import com.jp.mainichishinpo.entity.ExamFillWord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ExamFillWordService {
    ExamFillWord save(ExamFillWord examFillWord);
    List<ExamFillWord> getAllExam();

    Page<ExamFillWord> searchByKeyword(String term, Pageable paging);

    ExamFillWord findByIdAndExamName(Long id, String examname);

    void delete(Long id);

   Optional<ExamFillWord> findById(Long id);

    List<ExamFillWord> getAllExamActive();
}
