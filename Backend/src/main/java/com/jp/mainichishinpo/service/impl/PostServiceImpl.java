package com.jp.mainichishinpo.service.impl;

import com.jp.mainichishinpo.entity.Post;
import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.User;
import com.jp.mainichishinpo.payload.request.PostRequest;
import com.jp.mainichishinpo.repository.PostRepository;
import com.jp.mainichishinpo.service.PostsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class PostServiceImpl implements PostsService {
    @Autowired
    private PostRepository postRepository;
    @Override
    public List<Post> getAllPost() {
        return postRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

    @Override
    public Post save(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Optional<Post> findById(Long id) {
        return postRepository.findById(id);
    }

    @Override
    public Page<Post> searchByKeyword(String term, Pageable paging) {
        Page<Post> res = postRepository.searchByKeyword(term, paging);
        return res;
    }

    @Override
    public Post create(PostRequest postRequest, User user) {
        Post post = new Post();
        post.setPost_name(postRequest.getPost_name());
        post.setContents(postRequest.getContents());
        post.setUser(user);
        post.setActive(false);
        post.setCreate_at(LocalDateTime.now());
        postRepository.save(post);
        return null;
    }

    @Override
    public boolean existsByPost(String post) {
        return false;
    }

    @Override
    public List<Post> getAllPostIsActive() {
        return postRepository.getAllPostIsActive();
    }

}
