package com.jp.mainichishinpo.service;

import com.jp.mainichishinpo.entity.Question;
import com.jp.mainichishinpo.entity.QuestionFillWord;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@Service
public interface FilesStorageService {
    public void init();

    public void save(MultipartFile file);

    public Resource load(String filename);

    public void deleteAll();

    public Stream<Path> loadAll();

    List<Question> getExcelDataAsList(String filename);

    Set<Question> saveExcelData(List<Question> questionList);

    List<QuestionFillWord> getExcelDataAsListForFillWord(String filename);

    Set<QuestionFillWord> saveExcelDataFillWord(List<QuestionFillWord> questionFillWordList);
}
