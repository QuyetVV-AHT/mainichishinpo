import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddQuestionIntoExam, Question } from 'src/app/question/question';
import { ExamService } from 'src/app/_services/exam.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-exam-update-question',
  templateUrl: './exam-update-question.component.html',
  styleUrls: ['./exam-update-question.component.css']
})
export class ExamUpdateQuestionComponent {
  selected: any;
  examId!: number;
  questionFormGroup!: FormGroup;
  questions!: any;
  questionList: any;
  questionAdded: any;
  questionsAddExam: any;
  listID!: number[];
  addQuestionIntoExam!: AddQuestionIntoExam ;

  constructor(
    public examService: ExamService,
    private questionService: QuestionService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
    this.examId = this.route.snapshot.params['id'];
    this.listID = [];
    this.questionFormGroup = this.formBuilder.group({
      questions: this.formBuilder.array([])
    });

    this.questionsAddExam = (<FormArray>(
      this.questionFormGroup.get("questions")
    )) as FormArray;

    this.questionService.getAllQuestion().subscribe(data => {
      this.questions = data;
    });

    this.examService.getExamById(this.examId).subscribe(data=>{
      this.questionAdded = data.questions;
          this.questionAdded.forEach((item: Question)  => {
            if(item.question) {
              this.questionsAddExam.push(new FormControl(item.id));
            }
            this.listID?.push(item.id);
    });
    },error => console.log(error));
  }

  findIndexID(id: number){
    if(this.listID.includes(id)){
      return true;
    }
    else{
      return false;
    }
  }

  onChange(selectedOption: MatCheckboxChange) {

    if (selectedOption.checked) {
      this.questionsAddExam.push(new FormControl(selectedOption.source.value));
    } else {
      const i = this.questionsAddExam.controls.findIndex(
        (x: { value: string; }) => x.value === selectedOption.source.value
      );
      this.questionsAddExam.removeAt(i);
    }
  }


  onSubmit() {
    this.examService.sendQuestionIntoExam(this.examId, this.questionsAddExam.value).subscribe(data =>{
      this.toastrService.info('Thành công', 'Cập nhật câu hỏi cho bài thi');
      this.router.navigate(['view-exam', this.examId]);
    })

  }
}
