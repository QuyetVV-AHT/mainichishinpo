package com.jp.mainichishinpo.service.impl;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.payload.request.ExamRequest;
import com.jp.mainichishinpo.repository.ExamRepository;
import com.jp.mainichishinpo.service.ExamService;
import com.jp.mainichishinpo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
public class ExamServiceImpl implements ExamService {

    @Autowired
    private ExamRepository examRepository;
    @Autowired
    private QuestionService questionService;

    @Override
    public List<Exam> getAllExam() {
        return examRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        examRepository.deleteById(id);
    }

    @Override
    public Exam save(Exam exam) {
        exam.setExam_name(exam.getExam_name().toLowerCase());
        return examRepository.save(exam);
    }

    @Override
    public Optional<Exam> findById(Long id) {
        return examRepository.findById(id);
    }

    @Override
    public Page<Exam> searchByKeyword(String term, Pageable paging) {
        Page<Exam> res = examRepository.searchByKeyword(term, paging);
        return res;
    }

    @Override
    public Exam create(ExamRequest rq) {
        Exam exam = new Exam();
        exam.setExam_name(rq.getExam_name().toLowerCase());
        exam.setNote(rq.getNote());
        Set<Question> questionSet = new HashSet<>();
        for (Long id: rq.getListQuestionId()
             ) {
            Question ques = questionService.findById(id).get();
            questionSet.add(ques);
        }
        exam.setQuestions(questionSet);
        exam.setActive(false);
        examRepository.save(exam);
        return exam;
    }

    @Override
    public boolean existsByExamName(String question) {
        return false;
    }

    @Override
    public List<Exam> getAllExamActive() {
        List<Exam> list = examRepository.getListExamActive();
        return list;
    }

    @Override
    public Page<Exam> searchByKeywordWithActive(String term, Pageable paging) {
        Page<Exam> res = examRepository.searchByKeywordWithActive(term, paging);
        return res;
    }
}
