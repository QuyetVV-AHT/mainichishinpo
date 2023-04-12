package com.jp.mainichishinpo.service.impl;

import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.User;
import com.jp.mainichishinpo.payload.request.QuestionRequest;
import com.jp.mainichishinpo.repository.QuestionRepository;
import com.jp.mainichishinpo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;
    @Override
    public List<Question> getAllQuestion() {
        return questionRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        // TODO kiem tra co question co nam trong exam nao khong
        questionRepository.deleteById(id);
    }

    @Override
    public Question save(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Optional<Question> findById(Long id) {
        return questionRepository.findById(id);
    }

    @Override
    public Page<Question> searchByKeyword(String term, Pageable paging) {
        Page<Question> res = questionRepository.searchByKeyword(term, paging);
        return res;
    }

    @Override
    public Question create(QuestionRequest questionRequest) {
        Question question = new Question();
        question.setQuestion(questionRequest.getQuestion());
        question.setAns_A(questionRequest.getAns_A());
        question.setAns_B(questionRequest.getAns_B());
        question.setAns_C(questionRequest.getAns_C());
        question.setAns_D(questionRequest.getAns_D());
        question.setAns_Correct(questionRequest.getAns_Correct());
        question.setNote(questionRequest.getNote());
        questionRepository.save(question);
        return question;
    }

    @Override
    public boolean existsByQuestion(String question) {
        return questionRepository.existsByQuestion(question);
    }

    @Override
    public List<Question> getListByExamId(Long examId) {
        return questionRepository.getListByExamId(examId);
    }
}
