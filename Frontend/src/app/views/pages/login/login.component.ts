import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username!: string;
  password!: string;
  constructor(
  ) { }

   ngOnInit(): void {
  }

  submit(){
    console.log(this.username);
    console.log(this.password);
  }
}
