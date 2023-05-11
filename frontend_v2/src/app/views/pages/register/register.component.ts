import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formGroup!: FormGroup;
  error!: boolean;
  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
  ) { }
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username:  ['', Validators.required],
    email:  ['', Validators.required],
    password:  ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    })
  }

  onSubmit(): void {
    const value = this.formGroup.getRawValue();
    let username = value.username;
    let email = value.email;
    let password = value.password;
    this.authService.register(username, email, password).subscribe(data =>{
      this.toastrService.success('Thành công', 'Tạo tài khoản mới');
      this.router.navigate(['login']);
    },
    (error) => {
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

}
