package com.jp.mainichishinpo.service.impl;

import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.repository.QuestionRepository;
import com.jp.mainichishinpo.service.FilesStorageService;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Component
public class FilesStorageServiceImpl implements FilesStorageService {
    private final Path root = Paths.get("uploads/");
    Workbook workbook;
    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public void init() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    @Override
    public void save(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

    public List<Question> getExcelDataAsList(String filename) {

        String FILE_PATH = root +"/"+ filename;
        List<String> list = new ArrayList<String>();

        // Create a DataFormatter to format and get each cell's value as String
        DataFormatter dataFormatter = new DataFormatter();

        // Create the Workbook
        try {
            workbook = WorkbookFactory.create(new File(FILE_PATH));
        } catch (EncryptedDocumentException | IOException e) {
            e.printStackTrace();
        }

        // Getting the Sheet at index zero
        Sheet sheet = workbook.getSheetAt(0);

        // Getting number of columns in the Sheet
        int noOfColumns = sheet.getRow(0).getLastCellNum();

        // Using for-each loop to iterate over the rows and columns
        for (Row row : sheet) {
            for (Cell cell : row) {
                String cellValue = dataFormatter.formatCellValue(cell);
                list.add(cellValue);
            }
        }

        // filling excel data and creating list as List<Invoice>
        List<Question> questionList = createList(list, noOfColumns);

        // Closing the workbook
        try {
            workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return questionList;
    }

    private List<Question> createList(List<String> excelData, int noOfColumns) {

        ArrayList<Question> questionArrayList = new ArrayList<Question>();

        int i = noOfColumns;
        do {
            Question ques = new Question();

            ques.setQuestion(excelData.get(i));
            ques.setAns_A(excelData.get(i + 1));
            ques.setAns_B(excelData.get(i + 2));
            ques.setAns_C(excelData.get(i + 3));
            ques.setAns_D(excelData.get(i + 4));
            ques.setAns_Correct(excelData.get(i + 5));
            ques.setNote(excelData.get(i + 6));

            questionArrayList.add(ques);
            i = i + (noOfColumns);

        } while (i < excelData.size());
        return questionArrayList;
    }

    @Override
    public int saveExcelData(List<Question> questionList) {
        questionList = questionRepository.saveAll(questionList);
        return questionList.size();
    }
}
