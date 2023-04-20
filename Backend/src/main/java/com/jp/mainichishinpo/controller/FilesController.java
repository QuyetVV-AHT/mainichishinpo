package com.jp.mainichishinpo.controller;

import com.jp.mainichishinpo.entity.FileInfo;
import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.payload.response.MessageResponse;
import com.jp.mainichishinpo.service.FilesStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins={"http://localhost:4200","http://ec2-18-224-40-219.us-east-2.compute.amazonaws.com"}, maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/file")
@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
public class FilesController {
    Logger logger = LoggerFactory.getLogger(FilesController.class);
    @Autowired
    FilesStorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<MessageResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            // TODO check file is exist
//            Luu file vao folder
            logger.info("Saving file in folder upload");
            storageService.save(file);
            List<Question> questionList = storageService.getExcelDataAsList(file.getOriginalFilename());
            int size = storageService.saveExcelData(questionList);
            message = "Uploaded the file successfully: " + file.getOriginalFilename() + " and save " + size + " data";
            logger.info(message);

            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
            logger.error(message);
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<FileInfo>> getListFiles() {
        List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(FilesController.class, "getFile", path.getFileName().toString()).build().toString();

            return new FileInfo(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}
