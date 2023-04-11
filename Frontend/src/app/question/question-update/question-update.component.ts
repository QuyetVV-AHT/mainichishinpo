import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/_services/question.service';
import { Question } from '../question';

@Component({
  selector: 'app-question-update',
  templateUrl: './question-update.component.html',
  styleUrls: ['./question-update.component.css']
})
export class QuestionUpdateComponent {


  questions: Question = new Question();
  id!: number;
  formGroup!: FormGroup;
  constructor(
    private questionService : QuestionService,
   private route: ActivatedRoute,
    private router:Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.questionService.getQuestionById(this.id).subscribe(data=>{
      this.questions=data;
    },error => console.log(error));

    this.formGroup = this.formBuilder.group({
      question: ['', Validators.required],
      ans_A: ['', Validators.required],
      ans_B:['',Validators.required],
      ans_C: ['',Validators.required],
      ans_D: ['',Validators.required],
      ans_Correct: ['',Validators.required],
      note: ['',Validators.required],
    });
  }

  onSubmit(value: any){

    this.questionService.updateQuestion(this.id, this.questions).subscribe(data =>{
      this.toastrService.info('Thành công', 'Cập nhật câu hỏi');
      this.router.navigate(['question']);

    },error => console.log(error));
  }
}
