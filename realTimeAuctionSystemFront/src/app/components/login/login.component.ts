import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/dtos/dtos';
import { LoginService } from 'src/app/services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginFormGroup!: FormGroup;
  loginRequest!: ILogin;
  jwtHelperService = new JwtHelperService();

  constructor(private fb: FormBuilder, private _loginService: LoginService,
      private router: Router) {
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

    this._loginService.login(this.loginRequest).subscribe(resp => {
      console.log('Success:');
      localStorage.setItem('token', resp.token);

      const decodeToken = this.jwtHelperService.decodeToken(resp.token);
      const decodeTokenJson = JSON.stringify(decodeToken);
      console.log(resp.token);
      this.router.navigate([''], { queryParams: { decodeTokenJson } });
    }, error => {
      console.log('Error:');
      console.log(error);
    })
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

}
