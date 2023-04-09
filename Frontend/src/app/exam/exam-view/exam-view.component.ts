import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PAGESIZE, PAGE, COUNT } from 'src/app/const';
import { Question } from 'src/app/question/question';
import { ExamService } from 'src/app/_services/exam.service';
import { QuestionService } from 'src/app/_services/question.service';
import { Exam } from '../exam';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.css']
})
export class ExamViewComponent {
  id!: number;
  listQuestion: any;
  exam: Exam |undefined;
  formGroup!: FormGroup;
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
      this.exam = data;
      this.listQuestion = data.questions;
    },error => console.log(error));

  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveQuestion(this.term);
  }


  retrieveQuestion(term: string){
    this.questionService.getAllQuestionrWithPagination(term).subscribe(res =>{
      this.listQuestion = res.content;
      this.count = res.totalElements;
    });
  };

  searchByTerm(){
    this.retrieveQuestion(this.term);
  }

  UpdateQuestion(){
    this.router.navigate(['update-question-by-examId', this.id]);
  }

}
