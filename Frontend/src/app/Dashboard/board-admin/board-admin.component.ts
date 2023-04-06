import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService,
    private router: Router) { }

    ngOnInit(): void {
      this.userService.getUserBoard().subscribe({
        next: data => {
          this.content = data;
        },
        error: err => {console.log(err)
          if (err.error) {
            this.content = JSON.parse(err.error).message;
          } else {
            this.content = "Error with status: " + err.status;
          }
        }
      });
    }
}
