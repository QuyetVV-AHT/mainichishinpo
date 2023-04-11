package com.jp.mainichishinpo.repository;

import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    Boolean existsByQuestion(String question);
    @Query(value = "SELECT * FROM questions WHERE question LIKE %:term% ORDER BY id DESC" , nativeQuery = true)
    public Page<Question> searchByKeyword(@Param("term") String term, Pageable paging);

    @Query(value = "SELECT * FROM exam_question WHERE exam_id = :examId ORDER BY id DESC" , nativeQuery = true)
    List<Question> getListByExamId(Long examId);
}
