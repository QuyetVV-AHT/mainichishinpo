import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from 'src/app/_services/exam.service';
import { Exam } from '../exam';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent {
  exam = new Exam();
  formGroup!: FormGroup;
  constructor(private examService: ExamService,
    private router: Router,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      exam_name: ['', Validators.required],
      note: [''],
    });
  }

  goToListExam(){
    this.toastrService.success('Thành công', 'Tạo bài thi mới');
    this.router.navigate(['exam']);
  }
   onSubmit(){
    this.examService.addExam(this.exam).subscribe(data =>{
      this.goToListExam();
  },
  error => console.log(error));
   }
}
