import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/_services/question.service';
import { Question } from '../question';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent {
  question = new Question();
  formGroup!: FormGroup;
  file!: File;
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

  goToListQuestion(){
    this.toastrService.success('Thành công', 'Tạo câu hỏi mới');
    this.router.navigate(['question']);
  }
   onSubmit(){
    this.questionService.addQuestion(this.question).subscribe(data =>{
      this.goToListQuestion();
  },
  error =>  this.toastrService.error(error.error.message, 'Tạo câu hỏi thất bại'));

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
    console.log(this.file.name);
    this.questionService.upLoadFile(formData).subscribe(data =>{
      this.message = data.message;
    },
    (error) => this.message = error.error.message)
    }
  }
}
