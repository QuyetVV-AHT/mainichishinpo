import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formGroup!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  show: boolean = false;
  typePassword = 'password';
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    public fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
;

  login(){
    this.authService.login(this.formGroup.get('username')?.value, this.formGroup.get('password')?.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['**']);

      },
      err => {
        this.errorMessage = err.error.message;

        this.isLoginFailed = true;
      }
    );
  }

  displayPassword() {
    if (this.typePassword === 'password') {
      this.typePassword = 'text';
    } else {
      this.typePassword = 'password';
    }
  }
}
