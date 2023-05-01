import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PAGESIZE, PAGE, COUNT } from 'src/app/const';
import { Exam } from 'src/app/entity/Exam';
import { Question } from 'src/app/entity/Question';
import { ExamService } from 'src/app/_services/exam.service';
import { QuestionService } from 'src/app/_services/question.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-e-create',
  templateUrl: './e-create.component.html',
  styleUrls: ['./e-create.component.scss']
})
export class ECreateComponent {
  formGroup!: FormGroup;
  exam = new Exam();
  listQuestion: any;
  question: Question |undefined;
  pageSize = PAGESIZE;
  page = PAGE;
  term = '';
  count = COUNT;
  listID!: number[];
  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private questionService: QuestionService,
    private toastrService: ToastrService,
    private examService: ExamService
  ){}

  ngOnInit(): void {
    this.listID = [];
    this.getAllQuestion();
    this.retrieveQuestion(this.term);
    this.formGroup = this.fb.group({
      exam_name: ['', Validators.required],
      note: ['', Validators.required],

    })
  }

  createExam(){
    const value = this.formGroup.getRawValue();
    this.exam.exam_name = value.exam_name;
    this.exam.note = value.note;
    this.exam.listQuestionId = this.listID;

    this.examService.addExam(this.exam).subscribe(data =>{
      this.toastrService.success('Thành công', 'Tạo bài thi mới');
      this.router.navigate(['exam/list']);
  },
  error => console.log(error));
  }

  onChange(event: any){
    if(event.target.checked){
      this.listID.push(event.target.value);
    }else{
      this.listID = this.listID.filter(id => id !== event.target.value);
    }

  }

  private getAllQuestion() {
    this.questionService.getAllQuestion().subscribe(data => {
      this.listQuestion = data;
    });
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
}
