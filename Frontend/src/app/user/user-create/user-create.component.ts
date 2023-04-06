import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  user = new User();
  formGroup!: FormGroup;
  constructor(private userService: UserService,
    private router: Router,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password:['',Validators.required],
      address: [''],
      note: [''],
    });
  }

  goToListUsers(){
    this.toastrService.success('Thành công', 'Tạo tài khoản mới');
    this.router.navigate(['user']);
  }
   onSubmit(){
    this.userService.addUser(this.user).subscribe(data =>{
      this.goToListUsers();
  },
  error => console.log(error));
   }


}
