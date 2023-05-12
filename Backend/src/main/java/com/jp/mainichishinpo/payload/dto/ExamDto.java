package com.jp.mainichishinpo.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamDto {
    private Long id;
    private String exam_name;
    private String note;
    private Long questionTotal;
    private Boolean active;
    private String type;
}
