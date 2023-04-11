package com.jp.mainichishinpo.service;

import com.jp.mainichishinpo.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface ResultService {
    void save(Long examId, User user, String mark);

}
