package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.entity.*;
import com.jp.mainichishinpo.payload.request.ExamRequest;
import com.jp.mainichishinpo.payload.response.MessageResponse;
import com.jp.mainichishinpo.service.*;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@CrossOrigin(origins={"http://localhost:4200","http://ec2-44-204-23-139.compute-1.amazonaws.com"}, maxAge = 86400, allowCredentials="true")
@RestController
@RequestMapping("/api/examfillword")
//@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
public class ExamFillWordController {

    Logger logger = LoggerFactory.getLogger(ExamFillWordController.class);
    @Autowired
    FilesStorageService storageService;
    @Autowired
    private QuestionFillWordService questionFillWordService;
    @Autowired
    private ExamFillWordService examFillWordService;
    @Autowired
    private UserService userService;
    @Autowired
    private ResultService resultService;

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
            List<QuestionFillWord> questionFillWordList = storageService.getExcelDataAsListForFillWord(file.getOriginalFilename());

            // Sau khi da luu cau hoi vao DB
            Set<QuestionFillWord> questionsFillWordListForExam = storageService.saveExcelDataFillWord(questionFillWordList);
            ExamFillWord examFillWord = new ExamFillWord();
            final Matcher matcher = pattern.matcher(file.getOriginalFilename());
            if(matcher.find()){
                examFillWord.setExam_name(matcher.group(0));
            }else {
                examFillWord.setExam_name(file.getOriginalFilename());
            }
            examFillWord.setQuestionFillWords(questionsFillWordListForExam);
            examFillWord.setActive(false);
            examFillWord.setType("fillword");
            examFillWordService.save(examFillWord);

            message = "Uploaded the file successfully: " + file.getOriginalFilename() + " and create " + examFillWord.getExam_name() + " exam";
            logger.info(message);

            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
            logger.error(message);
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateExam(@PathVariable Long id, @RequestBody ExamRequest rq) {
        ExamFillWord examFillWord = examFillWordService.findById(id).get();
        examFillWord.setExam_name(rq.getExam_name());
        examFillWord.setNote(rq.getNote());
        Set<QuestionFillWord> questionSet = new HashSet<>();
        for (Long questionId: rq.getListQuestionId()
        ) {
            QuestionFillWord ques = questionFillWordService.findById(questionId).get();
            questionSet.add(ques);
        }
        examFillWord.setQuestionFillWords(questionSet);
        examFillWordService.save(examFillWord);
        return ResponseEntity.ok(examFillWord);
    }

    @PostMapping("/active/{examId}")
    public ResponseEntity<?> activeExamFillWord(@PathVariable Long examId, @Valid @RequestBody Boolean isActive){
        ExamFillWord exam = examFillWordService.findById(examId).get();
        exam.setActive(isActive);
        examFillWordService.save(exam);
        return ResponseEntity.ok(new MessageResponse("Active/Deactive success"));
    }

    @PostMapping("/send_result/{examId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> sendResult(@PathVariable Long examId, @Valid @RequestBody String mark){
        User user =  userService.currentUser();
        resultService.save(examId, user, mark);
        return ResponseEntity.ok(new MessageResponse("return result"));
    }

    @PostMapping("/create-exam-with-audio-by-excel")
    public ResponseEntity<MessageResponse> createExamWithAudioByExcel(@RequestParam("file") MultipartFile file) {
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
            List<QuestionFillWord> questionFillWordList = storageService.getExcelDataAsListForFillWord(file.getOriginalFilename());

            // Sau khi da luu cau hoi vao DB
            Set<QuestionFillWord> questionsFillWordListForExam = storageService.saveExcelDataFillWord(questionFillWordList);
            ExamFillWord examFillWord = new ExamFillWord();
            final Matcher matcher = pattern.matcher(file.getOriginalFilename());
            if(matcher.find()){
                examFillWord.setExam_name(matcher.group(0));
            }else {
                examFillWord.setExam_name(file.getOriginalFilename());
            }
            examFillWord.setQuestionFillWords(questionsFillWordListForExam);
            examFillWord.setActive(false);
            examFillWord.setType("fillword");
            examFillWord.setHasAudio(true);
            examFillWord.setUrl_audio(file.getOriginalFilename().replace(".xlsx", ".mp3"));
            examFillWordService.save(examFillWord);

            message = "Uploaded the file successfully: " + file.getOriginalFilename() + " and create " + examFillWord.getExam_name() + " exam fillword";
            logger.info(message);

            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
            logger.error(message);
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }
}
