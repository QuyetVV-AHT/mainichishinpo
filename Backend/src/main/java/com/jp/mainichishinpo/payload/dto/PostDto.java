package com.jp.mainichishinpo.payload.dto;

import com.jp.mainichishinpo.entity.Comment;
import com.jp.mainichishinpo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long id;
    private String post_name;
    private String contents;
    private LocalDateTime create_at;
    private Boolean active;
    private User user;
    private List<Comment> comments;
}
