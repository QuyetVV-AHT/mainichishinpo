import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PAGESIZE, PAGE, COUNT } from 'src/app/const';
import { ExamService } from 'src/app/_services/exam.service';
import { PublicService } from 'src/app/_services/public.service';
import { QuestionService } from 'src/app/_services/question.service';
import { Exam } from '../exam';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-public',
  templateUrl: './exam-public.component.html',
  styleUrls: ['./exam-public.component.css']
})
export class ExamPublicComponent {

  listExamPublic!: Exam[];
  pageSize = PAGESIZE;
  page = PAGE;
  count = COUNT;
   term = '';
   error = false;
  constructor(
    private publicService : PublicService,
   private route: ActivatedRoute,
    private router:Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {

    this.publicService.getExamPublic().subscribe(data=>{
      this.listExamPublic = data;
    },error => this.error = true);

  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrievePublicExam(this.term);
  }


  retrievePublicExam(term: string){
    this.publicService.getAllExamPublicWithPagination(term).subscribe(res =>{
      this.listExamPublic = res.content;
      this.count = res.totalElements;
    });
  };

  searchByTerm(){
    this.retrievePublicExam(this.term);
  }

  startExam(examId: number) {
    Swal.fire({
      title: 'Bắt đầu bài thi?',
      showDenyButton: true,
      confirmButtonText: 'Okkay',
      denyButtonText: `Thôi đang sợ lắm`,
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['examStart/' + examId]);
      } else if (result.isDenied) {
        Swal.fire('Thay đổi không được lưu', '', 'info');
      }
    });
  }

}
