package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.payload.dto.TotalDto;
import com.jp.mainichishinpo.service.ExamService;
import com.jp.mainichishinpo.service.PostsService;
import com.jp.mainichishinpo.service.QuestionService;
import com.jp.mainichishinpo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins={"http://localhost:4200","http://ec2-18-224-40-219.us-east-2.compute.amazonaws.com"}, maxAge = 86400, allowCredentials="true")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;
    @Autowired
    private ExamService examService;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private PostsService postsService;

    @GetMapping("/user")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/question")
    @PreAuthorize("hasRole('MODERATOR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @GetMapping("/total")
    public ResponseEntity<TotalDto> countObject(){
        TotalDto totalDto = new TotalDto();
        totalDto.setUser((long) userService.getAllUser().size());
        totalDto.setExam((long) examService.getAllExam().size());
        totalDto.setPost((long) postsService.getAllPost().size());
        totalDto.setQuestion((long) questionService.getAllQuestion().size());

        return ResponseEntity.ok(totalDto);
    }
}