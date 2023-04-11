import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/_services/exam.service';
import { QuestionService } from 'src/app/_services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-start',
  templateUrl: './exam-start.component.html',
  styleUrls: ['./exam-start.component.css']
})
export class ExamStartComponent {
  examId: any;
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
    this.preventBackButton();
    this.loadQuestions();
  }

  loadQuestions() {
    this.examService.getExamById(this.examId).subscribe(
      (data) => {
        this.questions = data.questions;

        this.questions.forEach((ques: any) => {
          ques['givenAnswer'] = '';
        });
        this.startTimer();
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
      title: 'Do you want to submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',

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
    this.questions.forEach((ques: any) => {
      if (ques.givenAnswer === ques.ans_Correct) {
        this.correctAnswer++;
      }
      if (ques.givenAnswer.trim() != '') {
        this.attempted++;
      }
    });
    let mark= this.correctAnswer+"/"+this.questions.length;
    this.examService.sendResutl(this.examId, mark).subscribe(data=>{
    })
  }
  startTimer() {
    this.timer = 901;
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
    this.router.navigate(['exam-public']);
  }

}
