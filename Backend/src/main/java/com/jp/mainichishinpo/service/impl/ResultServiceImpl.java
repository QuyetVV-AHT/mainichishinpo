package com.jp.mainichishinpo.service.impl;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.Result;
import com.jp.mainichishinpo.entity.User;
import com.jp.mainichishinpo.repository.ResultRepository;
import com.jp.mainichishinpo.service.ExamService;
import com.jp.mainichishinpo.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ResultServiceImpl implements ResultService {

    @Autowired
    private ExamService examService;
    @Autowired
    private ResultRepository resultRepository;

    @Override
    public void save(Long examId, User user, String mark) {
        Result rs = new Result();
        rs.setUser(user);
        rs.setMark(mark);
        Exam exam = examService.findById(examId).get();
        rs.setExam(exam);
        resultRepository.save(rs);
    }
}
