import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PAGE, PAGESIZE } from 'src/app/const';
import { Exam } from 'src/app/exam/exam';
import { ExamService } from 'src/app/_services/exam.service';

@Component({
  selector: 'app-board-exam',
  templateUrl: './board-exam.component.html',
  styleUrls: ['./board-exam.component.css']
})
export class BoardExamComponent {
  listExam: any;
  exam: Exam |undefined;
  pageSize = PAGESIZE;
  page = PAGE;
  term = '';
  count: 0 | undefined;
  constructor(
    private examService: ExamService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllExam();
    this.retrieveUser(this.term);
  }

  private getAllExam() {
    this.examService.getAllExam().subscribe(data => {
      this.listExam = data;
    });
  }


  updateExam(id: number) {
    this.router.navigate(['update-exam', id]);
  }
  deleteExam(id: number) {
    this.examService.deleteExam(id).subscribe(data => {
      this.router.navigate(['exam']);
      window.location.reload();
      this.toastrService.success('Thành công', 'Xóa bài thi');
    })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveUser(this.term);
  }


  retrieveUser(term: string){
    this.examService.getAllExamrWithPagination(term).subscribe(res =>{
      this.listExam = res.content;
      this.count = res.totalElements;
    });
  };

  searchByTerm(){
    this.retrieveUser(this.term);
  }
}
