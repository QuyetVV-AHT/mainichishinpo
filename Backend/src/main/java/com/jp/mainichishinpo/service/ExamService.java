package com.jp.mainichishinpo.service;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.payload.request.ExamRequest;
import com.jp.mainichishinpo.payload.request.QuestionRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ExamService {
    List<Exam> getAllExam();

    void delete(Long id);

    Exam save(Exam exam);

    Optional<Exam> findById(Long id);

    Page<Exam> searchByKeyword(String term, Pageable paging);

    Exam create(ExamRequest examRequest);

    boolean existsByExamName(String exam_name);
}
