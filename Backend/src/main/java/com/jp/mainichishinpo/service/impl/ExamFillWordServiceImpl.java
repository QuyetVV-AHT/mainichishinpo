package com.jp.mainichishinpo.service.impl;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.ExamFillWord;
import com.jp.mainichishinpo.repository.ExamFillWordRepository;
import com.jp.mainichishinpo.service.ExamFillWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ExamFillWordServiceImpl implements ExamFillWordService {

    @Autowired
    private ExamFillWordRepository examFillWordRepository;

    @Override
    public ExamFillWord save(ExamFillWord examFillWord) {
        examFillWord.setExam_name(examFillWord.getExam_name().toLowerCase());
        return examFillWordRepository.save(examFillWord);
    }

    @Override
    public List<ExamFillWord> getAllExam() {
        return examFillWordRepository.findAll();
    }

    @Override
    public Page<ExamFillWord> searchByKeyword(String term, Pageable paging) {
        Page<ExamFillWord> res = examFillWordRepository.searchByKeyword(term, paging);
        return res;
    }

    @Override
    public ExamFillWord findByIdAndExamName(Long id, String examname) {
        return examFillWordRepository.findByIdAndExamName(id, examname);
    }

    @Override
    public void delete(Long id) {
        examFillWordRepository.deleteById(id);
    }

    @Override
    public Optional<ExamFillWord> findById(Long id) {
        return examFillWordRepository.findById(id);
    }

    @Override
    public List<ExamFillWord> getAllExamActive() {
        return examFillWordRepository.getListExamActive();
    }

    @Override
    public List<ExamFillWord> searchByKeywordWithActive(String term, Pageable paging) {
        List<ExamFillWord> res = examFillWordRepository.searchByKeywordWithActive(term, paging);
        return res;
    }
}
