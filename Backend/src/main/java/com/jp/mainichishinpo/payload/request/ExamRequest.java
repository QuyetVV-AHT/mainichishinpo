package com.jp.mainichishinpo.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExamRequest {

    private String exam_name;
    private String note;
    private List<Long> listQuestionId;
}
