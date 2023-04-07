package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.User;
import com.jp.mainichishinpo.payload.request.ExamRequest;
import com.jp.mainichishinpo.payload.request.UserRequest;
import com.jp.mainichishinpo.payload.response.MessageResponse;
import com.jp.mainichishinpo.service.ExamService;
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

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/exam")
@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
public class ExamController {

    @Autowired
    private ExamService examService;

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
        return ResponseEntity.ok(new MessageResponse("Exam delete successfully!"));}
}
