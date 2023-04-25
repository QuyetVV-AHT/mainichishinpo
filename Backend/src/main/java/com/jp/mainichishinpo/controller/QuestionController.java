package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.payload.request.QuestionRequest;
import com.jp.mainichishinpo.payload.response.MessageResponse;
import com.jp.mainichishinpo.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.jp.mainichishinpo.util.ParamKey.*;

@CrossOrigin(origins={"http://localhost:4200","http://ec2-18-224-40-219.us-east-2.compute.amazonaws.com"}, maxAge = 86400, allowCredentials="true")
@RestController
@RequestMapping("/api/question")
@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/list")
    public List<Question> getAllQuestion() {
        List<Question> questionList = questionService.getAllQuestion();
        return questionList;
    }

    @GetMapping("/search")
    public Page<Question> search(
            @RequestParam(name = PAGE, required = true, defaultValue = "0") int page,
            @RequestParam(name = PAGE_SIZE, required = true, defaultValue = Integer.MAX_VALUE + "") int size,
            @RequestParam(name = TERM, required = true, defaultValue = "") String term
    ) {
        Pageable paging = null;
        paging = PageRequest.of(page, size);

        if (term != null)
            term = term.trim();

        Page<Question> resdto = questionService.searchByKeyword(term, paging);
        return resdto;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createQuestion(@Valid @RequestBody QuestionRequest questionRequest) {
        if (questionService.existsByQuestion(questionRequest.getQuestion())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Câu hỏi đã tồn tại"));
        }
        try {
            questionService.create(questionRequest);
            return ResponseEntity.ok(new MessageResponse("Question create successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Create new question fail"));
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Question>> getQuestionById(@PathVariable Long id) {
        Optional<Question> result = questionService.findById(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @RequestBody QuestionRequest rq) {
        Question question = questionService.findById(id).get();
        question.setQuestion(rq.getQuestion());
        question.setAns_A(rq.getAns_A());
        question.setAns_B(rq.getAns_B());
        question.setAns_C(rq.getAns_C());
        question.setAns_D(rq.getAns_D());
        question.setAns_Correct(rq.getAns_Correct());
        question.setNote(rq.getNote());

        questionService.save(question);
        return ResponseEntity.ok(question);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        questionService.delete(id);
        return ResponseEntity.ok(new MessageResponse("Post delete successfully!"));}

}
