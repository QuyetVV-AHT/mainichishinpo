package com.jp.mainichishinpo.repository;

import com.jp.mainichishinpo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query(value = "SELECT * FROM users WHERE username LIKE %:term% OR email LIKE %:term% ORDER BY id DESC" , nativeQuery = true)
    public Page<User> searchByKeyword(@Param("term") String term, Pageable paging);
}
