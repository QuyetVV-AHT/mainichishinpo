import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PAGESIZE, PAGE, COUNT } from 'src/app/const';
import { Question } from 'src/app/entity/Question';
import { QuestionService} from '../../../_services/question.service';

@Component({
  selector: 'app-q-list',
  templateUrl: './q-list.component.html',
  styleUrls: ['./q-list.component.scss']
})
export class QListComponent {
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
    this.router.navigate(['question/update', id]);
  }
  deleteQuestion(id: number) {
    this.questionService.deleteQuestion(id).subscribe(data => {
      this.router.navigate(['question/list']);
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
