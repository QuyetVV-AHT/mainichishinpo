package com.jp.mainichishinpo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String question;

    @Column
    private String ans_A;
    private LocalDateTime create_at;

    @Column
    private String ans_B;
    @Column
    private String ans_C;
    @Column
    private String ans_D;
    @Column
    private String ans_Correct;
    @Column
    private String note;
}
