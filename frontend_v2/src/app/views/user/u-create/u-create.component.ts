import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../_services/user.service';
import { User, UserRequest } from '../../../entity/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-u-create',
  templateUrl: './u-create.component.html',
  styleUrls: ['./u-create.component.scss']
})
export class UCreateComponent implements OnInit{
  formGroup!: FormGroup;
  user = new UserRequest();
  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService,
  ){}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      note: ['', Validators.required],
    })
  }

  createUser(){
    this.user.username = this.formGroup.get('username')?.value;
    this.user.email = this.formGroup.get('email')?.value;
    this.user.password = this.formGroup.get('password')?.value;
    this.user.address = this.formGroup.get('address')?.value;
    this.user.note = this.formGroup.get('note')?.value;

    this.userService.addUser(this.user).subscribe(data =>{
      this.toastrService.success('Thành công', 'Tạo tài khoản mới');
      this.router.navigate(['user/list']);    },
    error => console.log(error));
    }

}
