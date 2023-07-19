package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.Post;
import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.User;
import com.jp.mainichishinpo.payload.dto.PostDto;
import com.jp.mainichishinpo.payload.request.PostRequest;
import com.jp.mainichishinpo.payload.request.QuestionRequest;
import com.jp.mainichishinpo.payload.request.UserRequest;
import com.jp.mainichishinpo.payload.response.MessageResponse;
import com.jp.mainichishinpo.service.PostsService;
import com.jp.mainichishinpo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.jp.mainichishinpo.util.ParamKey.*;

@CrossOrigin(origins={"http://localhost:4200","http://ec2-44-204-23-139.compute-1.amazonaws.com"}, maxAge = 86400, allowCredentials="true")
@RestController
@RequestMapping("/api/posts")
@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
public class PostController {

    @Autowired
    private PostsService postService;
    @Autowired
    private UserService userService;
    @GetMapping("/list")
    public ResponseEntity<List<Post>> getAllQuestion() {
        List<Post> postList = postService.getAllPost();
        return ResponseEntity.ok(postList);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Post>> search(
            @RequestParam(name = PAGE, required = true, defaultValue = "0") int page,
            @RequestParam(name = PAGE_SIZE, required = true, defaultValue = Integer.MAX_VALUE + "") int size,
            @RequestParam(name = TERM, required = true, defaultValue = "") String term
    ) {
        Pageable paging = null;
        paging = PageRequest.of(page, size);

        if (term != null)
            term = term.trim();

        Page<Post> resdto = postService.searchByKeyword(term, paging);
        return ResponseEntity.ok(resdto);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@Valid @RequestBody PostRequest postRequest){
        try {
            User user = userService.currentUser();
            postService.create(postRequest, user);
            return ResponseEntity.ok(new MessageResponse("Post create successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Create new Post fail"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long id) {
        Post result = postService.findById(id).get();
        PostDto dto = new PostDto();
        dto.setId(result.getId());
        dto.setPost_name(result.getPost_name());
        dto.setActive(result.getActive());
        dto.setUser(result.getUser());
        dto.setComments(result.getComments());
        String content =  result.getContents().replaceAll("\n", "<br>");
        dto.setContents(content);

        return ResponseEntity.ok(dto);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody PostRequest rq) {
        Post post = postService.findById(id).get();
        post.setContents(rq.getContents());
        post.setPost_name(rq.getPost_name());
        post.setCreate_at(LocalDateTime.now());
        Post post1 = postService.save(post);
        return ResponseEntity.ok(post1);
    }

    @PostMapping("/active/{id}")
    public ResponseEntity<?> activeExam(@PathVariable Long id, @Valid @RequestBody Boolean isActive){
        Post post = postService.findById(id).get();
        post.setActive(isActive);
        postService.save(post);
        return ResponseEntity.ok(new MessageResponse("Active/Deactive success"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePostbyId(@PathVariable Long id) {
        postService.delete(id);
        return ResponseEntity.ok(new MessageResponse("Post delete successfully!"));}
}
