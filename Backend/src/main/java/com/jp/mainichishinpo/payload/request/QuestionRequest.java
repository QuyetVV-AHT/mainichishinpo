package com.jp.mainichishinpo.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QuestionRequest {

    private String question;
    private String ans_A;
    private String ans_B;
    private String ans_C;
    private String ans_D;
    private String ans_Correct;
    private String note;
}
