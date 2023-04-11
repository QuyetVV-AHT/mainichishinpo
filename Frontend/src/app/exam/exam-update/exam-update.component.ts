import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { COUNT, PAGE, PAGESIZE } from 'src/app/const';
import { ExamService } from 'src/app/_services/exam.service';
import { QuestionService } from 'src/app/_services/question.service';
import { Exam } from '../exam';

@Component({
  selector: 'app-exam-update',
  templateUrl: './exam-update.component.html',
  styleUrls: ['./exam-update.component.css']
})
export class ExamUpdateComponent {
  exam: Exam = new Exam();
  id!: number;
  formGroup!: FormGroup;
  listQuestion: any;
  pageSize = PAGESIZE;
  page = PAGE;
  count = COUNT;
   term = '';

  constructor(
    private examService : ExamService,
   private route: ActivatedRoute,
    private router:Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.examService.getExamById(this.id).subscribe(data=>{
      this.exam=data;
    },error => console.log(error));

    this.formGroup = this.formBuilder.group({
      exam_name: ['', Validators.required],
      note: [''],
    });

  }

  onSubmit(value: any){

    this.examService.updateExam(this.id, this.exam).subscribe(data =>{
      this.toastrService.info('Thành công', 'Cập nhật bài thi');
      this.router.navigate(['exam']);

    },error => console.log(error));
  }
}
