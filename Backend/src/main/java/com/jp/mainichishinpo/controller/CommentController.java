package com.jp.mainichishinpo.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins={"http://localhost:4200","http://ec2-44-204-23-139.compute-1.amazonaws.com"}, maxAge = 86400, allowCredentials="true")
@RestController
@RequestMapping("/api/comment")
public class CommentController {
}
