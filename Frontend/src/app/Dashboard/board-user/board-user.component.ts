import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent {
  listUsers: User[] | undefined;
  user: User | undefined;
  pageSize = 5;
  page = 1;
  term = '';
  count: 0 | undefined;
  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUser();
    this.retrieveUser(this.term);
  }

  private getAllUser() {
    this.userService.getAllUser().subscribe(data => {
      this.listUsers = data;
    });
  }


  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.toastrService.success('Thành công', 'Xóa tài khoản');
      this.router.navigate(['user']);
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
