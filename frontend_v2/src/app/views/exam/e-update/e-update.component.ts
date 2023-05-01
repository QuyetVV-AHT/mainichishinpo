import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PAGESIZE, PAGE, COUNT } from 'src/app/const';
import { Exam } from 'src/app/entity/Exam';
import { Question } from 'src/app/entity/Question';
import { ExamService } from 'src/app/_services/exam.service';
import { QuestionService } from 'src/app/_services/question.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-e-update',
  templateUrl: './e-update.component.html',
  styleUrls: ['./e-update.component.scss']
})
export class EUpdateComponent {
  formGroup!: FormGroup;
  exam = new Exam();
  listQuestion: any;
  question: Question |undefined;
  pageSize = PAGESIZE;
  page = PAGE;
  term = '';
  count = COUNT;
  listID!: number[];
  examId!: number;
  questionAdded: any;
  questionsAddExam: any;
  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private questionService: QuestionService,
    private toastrService: ToastrService,
    private examService: ExamService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.listID = [];
    this.getAllQuestion();
    this.retrieveQuestion(this.term);
    this.formGroup = this.fb.group({
      exam_name: ['', Validators.required],
      note: ['', Validators.required],

    })
    this.questionsAddExam = (<FormArray>(
      this.formGroup.get("questions")
    )) as FormArray;

    this.examId = this.route.snapshot.params['id'];
    this.examService.getExamById(this.examId).subscribe(data=>{
      this.questionAdded = data.questions;
      this.formGroup.get('exam_name')?.setValue(data.exam_name);
      this.formGroup.get('note')?.setValue(data.note);
      this.questionAdded.forEach((item: Question)  => {
        this.listID?.push(item.id);
});
    },error => console.log(error));
  }

  updateExam(){
    const value = this.formGroup.getRawValue();
    this.exam.exam_name = value.exam_name;
    this.exam.note = value.note;
    this.exam.listQuestionId = this.listID;

    this.examService.updateExam(this.examId, this.exam).subscribe(data =>{
      this.toastrService.info('Thành công', 'Cập nhật bài thi');
      this.router.navigate(['exam/list']);

    },error => console.log(error));
  }

  onChange(event: any){
    if(event.target.checked == true){
      this.listID.push(event.target.value);
    }
    if(event.target.checked == false){
      this.listID = this.listID.filter(questionId => questionId != event.target.value);

    }
  }

  findIndexID(id: number){
    if(this.listID.includes(id)){
      return true;
    }
    else{
      return false;
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
