package com.jp.mainichishinpo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "examfillword")
public class ExamFillWord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String exam_name;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(	name = "exam_question_fillword",
            joinColumns = @JoinColumn(name = "examfillword_id"),
            inverseJoinColumns = @JoinColumn(name = "questionsfillword_id"))
    private Set<QuestionFillWord> questionFillWords = new HashSet<>();

    private String note;
    private String type;
    private Boolean hasAudio;
    private String url_audio;

    private Boolean active;

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Result> results;
}
