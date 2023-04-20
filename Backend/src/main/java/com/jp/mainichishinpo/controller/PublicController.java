package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.jp.mainichishinpo.util.ParamKey.*;

@CrossOrigin(origins="http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private ExamService examService;

    @GetMapping("/all")
    public String allAccess() {
        return "Noi dung tu phia serve";
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
}
