package com.jp.mainichishinpo.repository;

import com.jp.mainichishinpo.entity.ExamFillWord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExamFillWordRepository extends JpaRepository<ExamFillWord,Long> {
    @Query(value = "SELECT * FROM examfillword WHERE exam_name LIKE %:term% ORDER BY id DESC" , nativeQuery = true)
    Page<ExamFillWord> searchByKeywordWithActive(String term, Pageable paging);
    @Query(value = "SELECT * FROM examfillword WHERE id=:id and exam_name LIKE %:examname% ORDER BY id DESC" , nativeQuery = true)
    ExamFillWord findByIdAndExamName(Long id, String examname);

    @Query(value = "SELECT * FROM examfillword WHERE active = true ORDER BY id DESC" , nativeQuery = true)
    List<ExamFillWord> getListExamActive();
}
