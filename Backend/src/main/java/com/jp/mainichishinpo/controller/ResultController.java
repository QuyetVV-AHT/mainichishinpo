package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.entity.Exam;
import com.jp.mainichishinpo.entity.Result;
import com.jp.mainichishinpo.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins={"http://localhost:4200","http://ec2-18-224-40-219.us-east-2.compute.amazonaws.com"}, maxAge = 86400, allowCredentials="true")
@RestController
@RequestMapping("/api/result")
@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
public class ResultController {

    @Autowired
    private ResultService resultService;
    @GetMapping("/list")
    public ResponseEntity<List<Result>>  getAllResult() {
        List<Result> resultList = resultService.getAllResult();
        return ResponseEntity.ok(resultList);
    }
}
