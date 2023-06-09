import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PAGESIZE, PAGE, COUNT } from 'src/app/const';
import { QuestionService } from 'src/app/_services/question.service';
import { Question } from '../question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent {
  listQuestion: any;
  question: Question |undefined;
  pageSize = PAGESIZE;
  page = PAGE;
  term = '';
  count = COUNT;
  constructor(
    private questionService: QuestionService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllQuestion();
    this.retrieveQuestion(this.term);
  }

  private getAllQuestion() {
    this.questionService.getAllQuestion().subscribe(data => {
      this.listQuestion = data;
    });
  }


  updateQuestion(id: number) {
    this.router.navigate(['update-question', id]);
  }
  deleteQuestion(id: number) {
    this.questionService.deleteQuestion(id).subscribe(data => {
      this.router.navigate(['question']);
      window.location.reload();
      this.toastrService.success('Thành công', 'Xóa câu hỏi');
    })
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
}
