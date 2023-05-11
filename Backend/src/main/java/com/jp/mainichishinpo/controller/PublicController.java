package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.Post;
import com.jp.mainichishinpo.entity.Result;
import com.jp.mainichishinpo.service.ExamService;
import com.jp.mainichishinpo.service.PostsService;
import com.jp.mainichishinpo.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.jp.mainichishinpo.util.ParamKey.*;

@CrossOrigin(origins={"http://localhost:4200","http://ec2-18-224-40-219.us-east-2.compute.amazonaws.com"}, maxAge = 86400, allowCredentials="true")
@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private ExamService examService;
    @Autowired
    private PostsService postsService;
    @Autowired
    private ResultService resultService;

    @GetMapping("/all")
    public ResponseEntity<List<Post>> allPostIsActive() {
        List<Post> list = postsService.getAllPostIsActive();
        return ResponseEntity.ok(list);
    }


    @GetMapping("/all-exam")
    @PreAuthorize("hasRole('USER')")
    public List<Exam> allExam(){
        List<Exam> list = examService.getAllExamActive();
        return list;
    }

    @GetMapping("/search")
    public Page<Exam> search(
            @RequestParam(name = PAGE, required = true, defaultValue = "0") int page,
            @RequestParam(name = PAGE_SIZE, required = true, defaultValue = Integer.MAX_VALUE + "") int size,
            @RequestParam(name = TERM, required = true, defaultValue = "") String term
    ) {
        Pageable paging = null;
        paging = PageRequest.of(page, size);

        if (term != null)
            term = term.trim();

        Page<Exam> resdto = examService.searchByKeywordWithActive(term, paging);
        return resdto;
    }

    @GetMapping("/result-by-user-id/{id}")
    public ResponseEntity<List<Result>> getAllResultByUserId(@PathVariable Long id){
        List<Result> list = resultService.getAllResultByUserId(id);
        return ResponseEntity.ok(list);
    }
}
