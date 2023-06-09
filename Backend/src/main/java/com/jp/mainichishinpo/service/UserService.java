package com.jp.mainichishinpo.service;

import com.jp.mainichishinpo.entity.User;
import com.jp.mainichishinpo.payload.request.UserRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    List<User> getAllUser();

    void delete(Long id);

    User save(User user);

    Optional<User> findById(Long id);

    User create(UserRequest userRequest);

    User findByEmail(String email);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Page<User> searchByKeyword(String term, Pageable paging);

    User currentUser();

}
