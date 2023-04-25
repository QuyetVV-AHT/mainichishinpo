package com.jp.mainichishinpo.repository;

import com.jp.mainichishinpo.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT * FROM posts WHERE post_name LIKE %:term% ORDER BY id DESC" , nativeQuery = true)
    Page<Post> searchByKeyword(String term, Pageable paging);
    @Query(value = "SELECT * FROM posts WHERE active = true ORDER BY id DESC" , nativeQuery = true)
    List<Post> getAllPostIsActive();
}
