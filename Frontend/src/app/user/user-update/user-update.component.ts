import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {

  user: User = new User();
  id!: number;
  formGroup!: FormGroup;
  constructor(
    private userService : UserService,
   private route: ActivatedRoute,
    private router:Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(data=>{
      this.user=data;
    },error => console.log(error));

    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      address: [''],
      note: [''],
    });
  }

  onSubmit(value: any){

    this.userService.updateUser(this.id, this.user).subscribe(data =>{
      this.toastrService.info('Thành công', 'Cập nhật tài khoản');
      this.router.navigate(['user']);

    },error => console.log(error));
  }

}
