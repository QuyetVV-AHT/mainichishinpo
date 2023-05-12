package com.jp.mainichishinpo.repository;

import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.QuestionFillWord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuestionFillWordRepository extends JpaRepository<QuestionFillWord,Long> {
    @Query(value = "SELECT * FROM questionsfillword WHERE question LIKE %:term% ORDER BY id DESC" , nativeQuery = true)
    Page<QuestionFillWord> searchByKeyword(String term, Pageable paging);
}
