package com.jp.mainichishinpo.repository;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

    @Query(value = " SELECT EXISTS(SELECT * FROM exam WHERE exam_name LIKE %:exam_name%)", nativeQuery = true)
    Boolean existsByExamName(String exam_name);

    @Query(value = "SELECT * FROM exam WHERE exam_name LIKE %:term% ORDER BY id DESC" , nativeQuery = true)
    public Page<Exam> searchByKeyword(@Param("term") String term, Pageable paging);
}