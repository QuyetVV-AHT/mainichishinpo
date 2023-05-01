import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/entity/Question';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-q-update',
  templateUrl: './q-update.component.html',
  styleUrls: ['./q-update.component.scss']
})
export class QUpdateComponent {
  question = new Question();
  formGroup!: FormGroup;
  id!: number;

  constructor(private questionService: QuestionService,
    private router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formGroup = this.formBuilder.group({
      question: ['', Validators.required],
      ans_A: ['', Validators.required],
      ans_B:['',Validators.required],
      ans_C: ['',Validators.required],
      ans_D: ['',Validators.required],
      ans_Correct: ['',Validators.required],
      note: ['',Validators.required],
    });

    this.questionService.getQuestionById(this.id).subscribe(data=>{
      this.question=data;
      this.formGroup.get('question')?.setValue(this.question.question);
      this.formGroup.get('ans_A')?.setValue(this.question.ans_A);
      this.formGroup.get('ans_B')?.setValue(this.question.ans_B);
      this.formGroup.get('ans_C')?.setValue(this.question.ans_C);
      this.formGroup.get('ans_D')?.setValue(this.question.ans_Correct);
      this.formGroup.get('ans_Correct')?.setValue(this.question.ans_Correct);
      this.formGroup.get('note')?.setValue(this.question.note);
    },error => console.log(error));
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

    this.questionService.updateQuestion(this.id,this.question).subscribe(data =>{
      this.toastrService.success('Thành công', 'Cập nhật câu hỏi');
      this.router.navigate(['question/list']);
  },
  error =>  this.toastrService.error(error.error.message, 'Tạo câu hỏi thất bại'));
  }
}
