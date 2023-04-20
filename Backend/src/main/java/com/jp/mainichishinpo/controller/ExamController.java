package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.Result;
import com.jp.mainichishinpo.entity.User;
import com.jp.mainichishinpo.payload.request.ExamRequest;
import com.jp.mainichishinpo.payload.response.MessageResponse;
import com.jp.mainichishinpo.security.services.UserDetailsImpl;
import com.jp.mainichishinpo.service.ExamService;
import com.jp.mainichishinpo.service.QuestionService;
import com.jp.mainichishinpo.service.ResultService;
import com.jp.mainichishinpo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.jp.mainichishinpo.util.ParamKey.*;

@CrossOrigin(origins={"http://localhost:4200","http://ec2-18-224-40-219.us-east-2.compute.amazonaws.com"}, maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/exam")
@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
public class ExamController {

    @Autowired
    private ExamService examService;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private UserService userService;

    @Autowired
    private ResultService resultService;

    @GetMapping("/list")
    public List<Exam> getAllExam() {
        List<Exam> examList = examService.getAllExam();
        return examList;
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

        Page<Exam> resdto = examService.searchByKeyword(term, paging);
        return resdto;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Optional<Exam>> getExamById(@PathVariable Long id) {
        Optional<Exam> result = examService.findById(id);
        return ResponseEntity.ok(result);
    }


    @PostMapping("/create")
    public ResponseEntity<?> createExam(@Valid @RequestBody ExamRequest examRequest) {
        if (examService.existsByExamName(examRequest.getExam_name())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Exam is already taken!"));
        }

        try {
            examService.create(examRequest);
            return ResponseEntity.ok(new MessageResponse("Exam create successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Create new exam fail"));
        }

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatExam(@PathVariable Long id, @RequestBody ExamRequest rq) {
        Exam exam = examService.findById(id).get();
        exam.setExam_name(rq.getExam_name());
        exam.setNote(rq.getNote());
        examService.save(exam);
        return ResponseEntity.ok(exam);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteExam(@PathVariable Long id) {
        examService.delete(id);
        return ResponseEntity.ok(new MessageResponse("Exam delete successfully!"));
    }

    @PostMapping("/send_question_into_exam/{examId}")
    public ResponseEntity<?> sendQuestionIntoExam(@PathVariable Long examId, @Valid @RequestBody List<Long> rq) {
        if (rq != null) {
            Exam exam = examService.findById(examId).get();
            Set<Question> questionSet = new HashSet<>();
            for (Long questionId : rq
            ) {
                Question question = questionService.findById(questionId).get();
                if (question != null) {
                    questionSet.add(question);
                }
            }
            exam.setQuestions(questionSet);
            examService.save(exam);
            return ResponseEntity.ok(new MessageResponse("Update question into Exam success"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Update question into Exam"));
        }
    }

    @PostMapping("/send_result/{examId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> sendResult(@PathVariable Long examId, @Valid @RequestBody String mark){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user =  userService.findByUsername(currentPrincipalName).get();
        resultService.save(examId, user, mark);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/active/{examId}")
    public ResponseEntity<?> activeExam(@PathVariable Long examId, @Valid @RequestBody Boolean isActive){
        Exam exam = examService.findById(examId).get();
        exam.setActive(isActive);
        examService.save(exam);
        return ResponseEntity.ok(new MessageResponse("Active/Deactive success"));
    }
}

