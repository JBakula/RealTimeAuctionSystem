import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from 'src/app/dtos/dtos';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginFormGroup!: FormGroup;
  loginRequest!: ILogin;

  constructor(private fb: FormBuilder, private _loginService: LoginService) {
    this.loginRequest = {
      email: '',
      password: ''
    }
  }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {
    this.loginRequest = {
      email: this.loginFormGroup.value.email,
      password: this.loginFormGroup.value.password
    }

    this._loginService.login(this.loginRequest);
  }

}
