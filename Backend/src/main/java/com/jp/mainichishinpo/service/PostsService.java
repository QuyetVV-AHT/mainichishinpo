package com.jp.mainichishinpo.service;

import com.jp.mainichishinpo.entity.Post;
import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.User;
import com.jp.mainichishinpo.payload.request.PostRequest;
import com.jp.mainichishinpo.payload.request.QuestionRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface PostsService {
    List<Post> getAllPost();

    void delete(Long id);

    Post save(Post post);

    Optional<Post> findById(Long id);

    Page<Post> searchByKeyword(String term, Pageable paging);

    Post create(PostRequest postRequest, User user);

    boolean existsByPost(String post);
    List<Post> getAllPostIsActive();
}
