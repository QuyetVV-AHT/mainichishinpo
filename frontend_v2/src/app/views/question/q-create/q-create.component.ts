import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/entity/Question';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-q-create',
  templateUrl: './q-create.component.html',
  styleUrls: ['./q-create.component.scss']
})
export class QCreateComponent {
  question = new Question();
  formGroup!: FormGroup;
  message: string | undefined;

  constructor(private questionService: QuestionService,
    private router: Router,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {

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

  createQuestion(){
    const value = this.formGroup.getRawValue();
    this.question.question = value.question;
    this.question.ans_A = value.ans_A;
    this.question.ans_B = value.ans_B;
    this.question.ans_C = value.ans_C;
    this.question.ans_D = value.ans_D;
    this.question.ans_Correct = value.ans_Correct;
    this.question.note = value.note;

    this.questionService.addQuestion(this.question).subscribe(data =>{
      this.toastrService.success('Thành công', 'Tạo câu hỏi mới');
      this.router.navigate(['question/list']);
  },
  error =>  this.toastrService.error(error.error.message, 'Tạo câu hỏi thất bại'));
  }

}
