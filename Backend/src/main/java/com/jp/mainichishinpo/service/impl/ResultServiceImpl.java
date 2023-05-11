package com.jp.mainichishinpo.service.impl;

import com.jp.mainichishinpo.controller.FilesController;
import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.Result;
import com.jp.mainichishinpo.entity.User;
import com.jp.mainichishinpo.repository.ResultRepository;
import com.jp.mainichishinpo.service.ExamService;
import com.jp.mainichishinpo.service.ResultService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Component
public class ResultServiceImpl implements ResultService {
    Logger logger = LoggerFactory.getLogger(ResultServiceImpl.class);
    @Autowired
    private ExamService examService;
    @Autowired
    private ResultRepository resultRepository;

    @Override
    public void save(Long examId, User user, String mark) {
        try {
            Result rs = resultRepository.findByExamIdAndUserId(examId, user.getId());
            if(rs != null){
                // Update result
            }else{
                // create result
                rs =  new Result();
            }
            rs.setUser(user);
            rs.setMark(mark);
            rs.setCreate_at(LocalDateTime.now());
            Exam exam = examService.findById(examId).get();
            rs.setExam(exam);
            resultRepository.save(rs);
            logger.info("save result of " + user.getUsername() + " and " + exam.getExam_name());

        }catch (Exception e){
            logger.error("error: save of " + user.getUsername() + " and " + examId);
        }

    }

    @Override
    public List<Result> getAllResult() {
        return resultRepository.findAll();
    }

    public List<Result> getAllResultByUserId(Long id){
        List<Result> list =  resultRepository.getAllResultByUserId(id);
        return list;
    }
}
