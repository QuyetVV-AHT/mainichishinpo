import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PAGESIZE, PAGE } from 'src/app/const';
import { Question } from 'src/app/question/question';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent {
  listQuestion: any;
  question: Question |undefined;
  pageSize = PAGESIZE;
  page = PAGE;
  term = '';
  count: 0 | undefined;
  constructor(
    private questionService: QuestionService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllQuestion();
    this.retrieveUser(this.term);
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
    this.retrieveUser(this.term);
  }


  retrieveUser(term: string){
    this.questionService.getAllQuestionrWithPagination(term).subscribe(res =>{
      this.listQuestion = res.content;
      this.count = res.totalElements;
    });
  };

  searchByTerm(){
    this.retrieveUser(this.term);
  }
}
