package com.jp.mainichishinpo.repository;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    @Query(value = "SELECT * FROM results WHERE exam_id =:examId and user_id =:userId ORDER BY id DESC" , nativeQuery = true)
    Result findByExamIdAndUserId(Long examId, Long userId);

    @Query(value = "SELECT * FROM results WHERE  user_id =:id ORDER BY id DESC" , nativeQuery = true)
    List<Result> getAllResultByUserId(Long id);
}
