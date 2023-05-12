package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.QuestionFillWord;
import com.jp.mainichishinpo.service.QuestionFillWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.jp.mainichishinpo.util.ParamKey.*;

@CrossOrigin(origins={"http://localhost:4200","http://ec2-18-224-40-219.us-east-2.compute.amazonaws.com"}, maxAge = 86400, allowCredentials="true")
@RestController
@RequestMapping("/api/questionfillword")
//@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
public class QuestionFillWordController {

    @Autowired
    private QuestionFillWordService questionFillWordService;

    @GetMapping("/list")
    public List<QuestionFillWord> getAllQuestion() {
        List<QuestionFillWord> questionFillWordList = questionFillWordService.getAllQuestion();
        return questionFillWordList;
    }

    @GetMapping("/search")
    public Page<QuestionFillWord> search(
            @RequestParam(name = PAGE, required = true, defaultValue = "0") int page,
            @RequestParam(name = PAGE_SIZE, required = true, defaultValue = Integer.MAX_VALUE + "") int size,
            @RequestParam(name = TERM, required = true, defaultValue = "") String term
    ) {
        Pageable paging = null;
        paging = PageRequest.of(page, size);

        if (term != null)
            term = term.trim();

        Page<QuestionFillWord> resdto = questionFillWordService.searchByKeyword(term, paging);
        return resdto;
    }
}
