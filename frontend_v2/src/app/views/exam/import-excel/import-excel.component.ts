import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Exam } from 'src/app/entity/Exam';
import { ExamService } from 'src/app/_services/exam.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent implements OnInit{
  exam = new Exam();
  formGroup!: FormGroup;
  file!: File;
  normal = false;
  fillword = false;
  fillword_audio = false;
  constructor(private examService: ExamService,
    private router: Router,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    ) { }
  ngOnInit(): void {
    this.normal = false;
  this.fillword = false;
  this.fillword_audio = false;
  }

      // On file Select
      onChange(event: any) {
        this.file = event.target.files[0];

      }

       // OnClick of button Upload
  onUpload() {
    if (this.file) {
       // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', this.file, this.file.name);
    if(this.normal){
      this.examService.createExamByExcel(formData).subscribe(data =>{
      this.router.navigate(['exam/list']);
    })};
    if(this.fillword){
      this.examService.createExamFillWordByExcel(formData).subscribe(data =>{
        this.router.navigate(['exam/list']);
      })
    }
    if(this.fillword_audio){
      this.examService.createExamFillWordWithAudioByExcel(formData).subscribe(data =>{
        this.router.navigate(['exam/list']);
      })
    }

    }
  }
}
