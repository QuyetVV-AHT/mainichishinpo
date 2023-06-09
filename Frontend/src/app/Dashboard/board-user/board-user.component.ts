import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { COUNT, PAGE, PAGESIZE } from 'src/app/const';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/_services/user.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import { EventData } from 'src/app/_shared/event.class';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent {
  listUsers: any;
  user: User | undefined;
  pageSize = PAGESIZE;
  page = PAGE;
  term = '';
  count = COUNT;
  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private eventBusService: EventBusService
  ) { }

  ngOnInit(): void {
    this.getAllUser();
    this.retrieveUser(this.term);
  }

  private getAllUser() {
    this.userService.getAllUser().subscribe(data => {
      this.listUsers = data;
    },
    err => {

      if (err.status === 403)
        this.eventBusService.emit(new EventData('logout', null));
    })
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
