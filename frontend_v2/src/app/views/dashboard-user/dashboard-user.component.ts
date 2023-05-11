import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGESIZE, PAGE, COUNT } from 'src/app/const';
import { Exam } from 'src/app/entity/Exam';
import { PublicService } from 'src/app/_services/public.service';
import { ResutlsService } from 'src/app/_services/resutls.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { DashboardChartsData } from '../dashboard/dashboard-charts-data';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit{

  isAdmin!: boolean;
  listExamPublic!: Exam[];
  pageSize = PAGESIZE;
  page = PAGE;
  count = COUNT;
   term = '';
   isLoggedIn = false;
   error = false;

   constructor(private chartsData: DashboardChartsData,
    private tokenStorageService: TokenStorageService,
    private router:Router,
    private resultService: ResutlsService,
    private publicService : PublicService,) {
  }


   ngOnInit(): void {
    // this.initCharts();
    this.isAdmin = false;
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      if(user.roles.includes('ROLE_ADMIN')){
        this.isAdmin = true;

      }
    }

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

  startExam(id: number){
    this.router.navigate(['exam/start-exam/' + id]);
  }

  searchByTerm(){
    this.retrieveUser(this.term);
  }
  retrieveUser(term: string){
    this.publicService.getAllExamPublicWithPagination(term).subscribe(res =>{
      this.listExamPublic = res.content;
      this.count = res.totalElements;
    });
  };
}
