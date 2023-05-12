package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.QuestionFillWord;
import com.jp.mainichishinpo.service.QuestionFillWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
