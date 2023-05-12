import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PAGESIZE, PAGE, COUNT } from 'src/app/const';
import { Exam } from "../../../entity/Exam";
import { ExamService } from "../../../_services/exam.service";

@Component({
  selector: 'app-e-list',
  templateUrl: './e-list.component.html',
  styleUrls: ['./e-list.component.scss']
})
export class EListComponent {
  listExam: any;
  exam: Exam |undefined;
  pageSize = PAGESIZE;
  page = PAGE;
  term = '';
  count = COUNT;
    constructor(
    private examService: ExamService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllExam();
    this.retrieveExam(this.term);
  }

  private getAllExam() {
    this.examService.getAllExam().subscribe(data => {
      this.listExam = data;
    });
  }

  updateExam(id: number, examname:string, type: string) {
    this.router.navigate(['exam/update', id, examname, type]);
  }
  deleteExam(id: number, examname:string) {
    this.examService.deleteExam(id, examname).subscribe(data => {
      this.toastrService.success('Thành công', 'Xóa đề thi');
      window.location.reload();
      this.router.navigate(['exam/list']);
    })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveExam(this.term);
  }


  retrieveExam(term: string){
    this.examService.getAllExamrWithPagination(term).subscribe(res =>{
      this.listExam = res.content;
      this.count = res.totalElements;
    });
  };

  searchByTerm(){
    this.retrieveExam(this.term);
  }
}
