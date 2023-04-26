package com.jp.mainichishinpo.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TotalDto {
    private Long user;
    private Long exam;
    private Long question;
    private Long post;
}
