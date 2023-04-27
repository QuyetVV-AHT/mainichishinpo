import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/entity/User';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-u-update',
  templateUrl: './u-update.component.html',
  styleUrls: ['./u-update.component.scss']
})
export class UUpdateComponent {
  user: User = new User();
  id!: number;
  formGroup!: FormGroup;
  constructor(
    private userService : UserService,
   private route: ActivatedRoute,
   private toastrService: ToastrService,
    private router:Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formGroup = new FormGroup({
      username: new FormControl(this.user.username, Validators.required),
      email: new FormControl(this.user.email, Validators.required),
      address: new FormControl(this.user.address, Validators.required),
      note: new FormControl(this.user.note, Validators.required),
    })
    this.userService.getUserById(this.id).subscribe(data=>{
      this.user=data;
      this.formGroup.get('username')?.setValue(this.user.username);
      this.formGroup.get('address')?.setValue(this.user.address);
      this.formGroup.get('email')?.setValue(this.user.email);
      this.formGroup.get('note')?.setValue(this.user.note);
    },error => console.log(error));

  }

  updateUser(){
    const value = this.formGroup.getRawValue();

    this.user.username = value.username
    this.user.email = value.email
    this.user.address = value.address
    this.user.note = value.note

    this.userService.updateUser(this.id, this.user).subscribe(data =>{
      this.toastrService.info('Thành công', 'Cập nhật tài khoản');
      this.router.navigate(['user/list']);

    },error => console.log(error));
  }

}
