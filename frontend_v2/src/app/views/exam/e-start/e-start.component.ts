import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/_services/exam.service';
import { QuestionService } from 'src/app/_services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-e-start',
  templateUrl: './e-start.component.html',
  styleUrls: ['./e-start.component.scss']
})
export class EStartComponent implements OnInit {
  examId: any;
  type!: string;
  examname!: string;
  questions: any;
  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;
  maximumMarks = 0;
  isSubmit = false;
  timer: any;
  counter: any;
  interval: any;
  value: any;
  test: number = 0;
  title_exam: string | undefined;
  displayedColumns: string[] = ['question', 'ans_A', 'ans_B','ans_C','ans_D','ans_Correct','note'];
  constructor(
    private locationStrategy: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['id'];
    this.examname = this.route.snapshot.params['examname'];
    this.type = this.route.snapshot.params['type'];
    this.preventBackButton();
    this.loadQuestions();
  }

  loadQuestions() {
    this.examService.getExamByIdAndExamName(this.examId, this.examname, this.type).subscribe(
      (data) => {
        if(this.type === 'normal'){
          this.questions = data.questions;
          this.title_exam = data.exam_name;
          this.questions.forEach((ques: any) => {
            ques['givenAnswer'] = '';
          });
          this.startTimer();
        }

        if(this.type === 'fillword'){
          this.questions = data.questionFillWords;
          this.title_exam = data.exam_name;
          this.questions.forEach((ques: any) => {
            ques['givenAnswer'] = '';
          });
          this.startTimer();
        }

      },
      (error) => {}
    );
  }
  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: '試験を終了しますか？',
      showCancelButton: true,
      cancelButtonText: 'いいえ',
      confirmButtonText: 'はい',

      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.evaluateQuiz();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
  evaluateQuiz() {
    this.isSubmit = true;
    this.value = this.timer;
    localStorage.setItem('counter', this.timer);
    if(this.type === 'normal'){
      this.questions.forEach((ques: any) => {
        if (ques.givenAnswer === ques.ans_Correct) {
          this.correctAnswer++;
        }
        if (ques.givenAnswer.trim() != '') {
          this.attempted++;
        }
      });
    }

    if(this.type === 'fillword'){
      this.questions.forEach((ques: any) =>{
        ques.givenAnswer = ques.givenAnswer + ",";
        if(ques.givenAnswer != '' && ques.ansList.includes(ques.givenAnswer.toString())){

          this.correctAnswer++;
        }
        if (ques.givenAnswer.trim() != '') {
          this.attempted++; // Dem so cau tra da tra loi
          ques.givenAnswer = ques.givenAnswer.slice(0,-1);
        }
      });
    }


    let mark= this.correctAnswer+"/"+this.questions.length;
    this.examService.sendResutl(this.examId, mark).subscribe(data=>{
    })
  }
  getColor(ans: string, givenAnswer: string, correctAnswer: string){
    if(ans === givenAnswer){
      return 'blue';
    }else if (ans === correctAnswer){
      return 'red';
    }else{
      return 'black';
    }

  }
  startTimer() {
    this.timer = 900;
    const exist = localStorage.getItem('counter');
    if (exist) {
      if (parseInt(exist) <= 0) {
        this.value = this.timer;
      } else {
        this.value = localStorage.getItem('counter');
      }
    } else {
      this.value = this.timer;
    }

    this.counter = function () {
      if (this.value <= 0) {
        localStorage.setItem('counter', this.timer);
        clearInterval(this.interval);

        this.evaluateQuiz();
      } else {
        this.value = parseInt(this.value) - 1;
        localStorage.setItem('counter', this.value);
      }
    };

    this.interval = setInterval(() => {
      this.counter();
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.value / 60);
    let ss = this.value - mm * 60;

    return `${mm} min : ${ss} sec`;
  }

  toHome(){
    this.router.navigate(['**']);
  }
}
