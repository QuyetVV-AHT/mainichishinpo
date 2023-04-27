import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/entity/User';
import { UserService } from 'src/app/_services/user.service';
import { EventData } from 'src/app/_shared/event.class';
import { COUNT, PAGE, PAGESIZE } from '../../../const';
import { EventBusService } from '../../../_shared/event-bus.service'

@Component({
  selector: 'app-u-list',
  templateUrl: './u-list.component.html',
  styleUrls: ['./u-list.component.scss']
})
export class UListComponent implements OnInit {
  listUsers: any;
  user: User | undefined;
  pageSize = PAGESIZE;
  page = PAGE;
  term = '';
  count = COUNT;
  constructor(
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService,
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
      this.router.navigate(['user/update', id]);
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.toastrService.success('Thành công', 'Xóa tài khoản');
      this.router.navigate(['user/list']);
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
