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
  listUsers: User[] | undefined;
  user: User | undefined;
  pageSize = 5;
  page = 1;
  term = '';
  count: 0 | undefined;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllUser();
    this.retrieveUser(this.term);
  }

  private getAllUser() {
    this.userService.getAllUser().subscribe(data => {
      this.listUsers = data;
    });
  }
  viewUser(id: number) {
    this.router.navigate(['view-user', id]);

  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.router.navigate(['user-list']);
      window.location.reload();
    })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveUser(this.term);
  }


  retrieveUser(term: string){
    this.userService.getAllUserWithPagination(term).subscribe(res =>{
      this.listUsers = res.content;
      this.count = res.totalElements;
    });
  };

  searchByTerm(){
    this.retrieveUser(this.term);
  }
}
