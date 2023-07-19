package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.entity.*;
import com.jp.mainichishinpo.payload.dto.ExamDto;
import com.jp.mainichishinpo.payload.request.ExamRequest;
import com.jp.mainichishinpo.payload.response.MessageResponse;
import com.jp.mainichishinpo.security.services.UserDetailsImpl;
import com.jp.mainichishinpo.service.*;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static com.jp.mainichishinpo.util.ParamKey.*;

@CrossOrigin(origins={"http://localhost:4200","http://ec2-44-204-23-139.compute-1.amazonaws.com"}, maxAge = 86400, allowCredentials="true")
@RestController
@RequestMapping("/api/exam")
@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
public class ExamController {
    Logger logger = LoggerFactory.getLogger(ExamController.class);
    @Autowired
    private ExamService examService;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private UserService userService;
    @Autowired
    private ResultService resultService;
    @Autowired
    FilesStorageService storageService;
    @Autowired
    private ExamFillWordService examFillWordService;

    @GetMapping("/list")
    public List<Exam> getAllExam() {
        List<Exam> examList = examService.getAllExam();
        return examList;
    }

    @GetMapping("/listAll")
    public List<ExamDto> getListAllExam() {
        List<ExamDto> rs =  new ArrayList<>();
        List<Exam> examList = examService.getAllExam();
        List<ExamFillWord> examFillWordList = examFillWordService.getAllExam();
        for (Exam exam: examList
             ) {
            ExamDto tmp = new ExamDto();
            tmp.setId(exam.getId());
            tmp.setExam_name(exam.getExam_name());
            tmp.setNote(exam.getNote());
            tmp.setActive(exam.getActive());
            tmp.setQuestionTotal((long) exam.getQuestions().size());
            tmp.setType(exam.getType());
            rs.add(tmp);
        }
        for (ExamFillWord examFillWord: examFillWordList
        ) {
            ExamDto tmp = new ExamDto();
            tmp.setId(examFillWord.getId());
            tmp.setExam_name(examFillWord.getExam_name());
            tmp.setNote(examFillWord.getNote());
            tmp.setActive(examFillWord.getActive());
            tmp.setQuestionTotal((long) examFillWord.getQuestionFillWords().size());
            tmp.setType(examFillWord.getType());
            rs.add(tmp);
        }
        return rs;
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ExamDto>>  search(
            @RequestParam(name = PAGE, required = true, defaultValue = "0") int page,
            @RequestParam(name = PAGE_SIZE, required = true, defaultValue = Integer.MAX_VALUE + "") int size,
            @RequestParam(name = TERM, required = true, defaultValue = "") String term
    ) {
        Pageable paging = null;
        paging = PageRequest.of(page, size);

        if (term != null)
            term = term.trim();

        Page<Exam> exams = examService.searchByKeyword(term, paging);
        Page<ExamFillWord> examFillWords = examFillWordService.searchByKeyword(term, paging);
        List<ExamDto> rs =  new ArrayList<>();

        for (Exam exam: exams
        ) {
            ExamDto tmp = new ExamDto();
            tmp.setId(exam.getId());
            tmp.setExam_name(exam.getExam_name());
            tmp.setNote(exam.getNote());
            tmp.setActive(exam.getActive());
            tmp.setQuestionTotal((long) exam.getQuestions().size());
            tmp.setType(exam.getType());
            rs.add(tmp);
        }
        for (ExamFillWord examFillWord: examFillWords
        ) {
            ExamDto tmp = new ExamDto();
            tmp.setId(examFillWord.getId());
            tmp.setExam_name(examFillWord.getExam_name());
            tmp.setNote(examFillWord.getNote());
            tmp.setActive(examFillWord.getActive());
            tmp.setQuestionTotal((long) examFillWord.getQuestionFillWords().size());
            tmp.setType(examFillWord.getType());
            rs.add(tmp);
        }
        Page<ExamDto> result = new PageImpl<>(rs);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}/{examname}/{type}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getExamByIdAndExamName(@PathVariable Long id,@PathVariable String examname, @PathVariable String type) {
        if(type.equals("normal")){
            Exam result = examService.findByIdAndExamName(id,examname);
            Set<Question> set = result.getQuestions();
            Set<Question> finalList = set.stream()
                    .sorted(Comparator.comparingLong(Question::getId)) // sort while streaming
                    .collect(Collectors.toCollection(LinkedHashSet::new));
            result.setQuestions(finalList);
            return ResponseEntity.ok(result);
        }
        if(type.equals("fillword")){
            ExamFillWord result =  examFillWordService.findByIdAndExamName(id, examname);
            Set<QuestionFillWord> setQuestionFillWords = result.getQuestionFillWords();
            Set<QuestionFillWord> finalList = setQuestionFillWords.stream()
                    .sorted(Comparator.comparingLong(QuestionFillWord::getId)) // sort while streaming
                    .collect(Collectors.toCollection(LinkedHashSet::new));
            result.setQuestionFillWords(finalList);
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error: Exam not exist!"));
    }


    @PostMapping("/create")
    public ResponseEntity<?> createExam(@Valid @RequestBody ExamRequest examRequest) {
        if (examService.existsByExamName(examRequest.getExam_name())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Exam is already taken!"));
        }

        try {
            examService.create(examRequest);
            return ResponseEntity.ok(new MessageResponse("Exam create successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Create new exam fail"));
        }

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateExam(@PathVariable Long id, @RequestBody ExamRequest rq) {
        Exam exam = examService.findById(id).get();
        exam.setExam_name(rq.getExam_name());
        exam.setNote(rq.getNote());
        Set<Question> questionSet = new HashSet<>();
        for (Long questionId: rq.getListQuestionId()
        ) {
            Question ques = questionService.findById(questionId).get();
            questionSet.add(ques);
        }
        exam.setQuestions(questionSet);
        examService.save(exam);
        return ResponseEntity.ok(exam);
    }

    @DeleteMapping("/delete/{id}/{examname}")
    public ResponseEntity<?> deleteExam(@PathVariable Long id, @PathVariable String examname) {
        if(examService.findByIdAndExamName(id, examname) != null){
            examService.delete(id);
        }

        if(examFillWordService.findByIdAndExamName(id, examname) != null){
            examFillWordService.delete(id);
        }

        return ResponseEntity.ok(new MessageResponse("Exam delete successfully!"));
    }

    @PostMapping("/send_question_into_exam/{examId}")
    public ResponseEntity<?> sendQuestionIntoExam(@PathVariable Long examId, @Valid @RequestBody List<Long> rq) {
        if (rq != null) {
            Exam exam = examService.findById(examId).get();
            Set<Question> questionSet = new HashSet<>();
            for (Long questionId : rq
            ) {
                Question question = questionService.findById(questionId).get();
                if (question != null) {
                    questionSet.add(question);
                }
            }
            exam.setQuestions(questionSet);
            examService.save(exam);
            return ResponseEntity.ok(new MessageResponse("Update question into Exam success"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Update question into Exam"));
        }
    }

    @PostMapping("/send_result/{examId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> sendResult(@PathVariable Long examId, @Valid @RequestBody String mark){
        User user =  userService.currentUser();
        resultService.save(examId, user, mark);
        return ResponseEntity.ok(new MessageResponse("return result"));
    }

    @PostMapping("/active/{examId}")
    public ResponseEntity<?> activeExam(@PathVariable Long examId, @Valid @RequestBody Boolean isActive){
        Exam exam = examService.findById(examId).get();
        exam.setActive(isActive);
        examService.save(exam);
        return ResponseEntity.ok(new MessageResponse("Active/Deactive success"));
    }

    @PostMapping("/create-exam-by-excel")
    public ResponseEntity<MessageResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        final String regex = "(.*)(?=\\.)";
        final Pattern pattern = Pattern.compile(regex, Pattern.MULTILINE);
        try {
            if(Files.exists(Paths.get("uploads/" + file.getOriginalFilename()))){
                Files.delete(Paths.get("uploads/" + file.getOriginalFilename()));
            }
//            Luu file vao folder
            logger.info("Saving file in folder upload");
            storageService.save(file);
            List<Question> questionList = storageService.getExcelDataAsList(file.getOriginalFilename());

            // Sau khi da luu cau hoi vao DB
            Set<Question> questionsListForExam = storageService.saveExcelData(questionList);
            Exam exam = new Exam();
            final Matcher matcher = pattern.matcher(file.getOriginalFilename());
            if(matcher.find()){
                exam.setExam_name(matcher.group(0));
            }else {
                exam.setExam_name(file.getOriginalFilename());
            }
            exam.setQuestions(questionsListForExam);
            exam.setActive(false);
            exam.setType("normal");
            examService.save(exam);

            message = "Uploaded the file successfully: " + file.getOriginalFilename() + " and create " + exam.getExam_name() + " exam";
            logger.info(message);

            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
            logger.error(message);
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }
}

