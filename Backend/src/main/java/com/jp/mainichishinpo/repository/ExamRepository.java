package com.jp.mainichishinpo.repository;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

    @Query(value = " SELECT EXISTS(SELECT * FROM exam WHERE exam_name LIKE %:exam_name%)", nativeQuery = true)
    Boolean existsByExamName(String exam_name);

    @Query(value = "SELECT * FROM exam WHERE exam_name LIKE %:term% ORDER BY id DESC" , nativeQuery = true)
    public Page<Exam> searchByKeyword(@Param("term") String term, Pageable paging);

    @Query(value = "SELECT * FROM exam WHERE active = true ORDER BY id DESC" , nativeQuery = true)
    List<Exam> getListExamActive();
    @Query(value = "SELECT * FROM exam WHERE active = true and exam_name LIKE %:term% ORDER BY id DESC" , nativeQuery = true)
    Page<Exam> searchByKeywordWithActive(String term, Pageable paging);

    @Query(value = "SELECT * FROM exam WHERE id=:id and exam_name LIKE %:examname% ORDER BY id DESC" , nativeQuery = true)
    Exam findByIdAndExamname(Long id, String examname);
}