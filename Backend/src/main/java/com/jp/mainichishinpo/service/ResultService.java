package com.jp.mainichishinpo.service;

import com.jp.mainichishinpo.entity.Result;
import com.jp.mainichishinpo.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ResultService {
    void save(Long examId, User user, String mark);
    List<Result> getAllResult();

    List<Result> getAllResultByUserId(Long id);
}
