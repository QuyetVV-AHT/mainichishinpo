import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user';
import { ResutlsService } from 'src/app/_services/resutls.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  listResult: any;
  displayedColumns: string[] = ['STT', 'Exam', 'Username', 'mark'];

  constructor(private resultService: ResutlsService,
    private router: Router) { }

    ngOnInit(): void {
      this.resultService.getAllResult().subscribe(data =>{
        this.listResult = data;
      });
    }
}
