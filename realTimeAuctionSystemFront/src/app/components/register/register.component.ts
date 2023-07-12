import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IRegister } from 'src/app/dtos/dtos';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerFormGroup!: FormGroup;
  registerRequest!: IRegister;
  jwtHelperService = new JwtHelperService();

  constructor(private fb: FormBuilder, private _loginService: LoginService,
      private router: Router) {
    this.registerRequest = {
      userName: '',
      email: '',
      password: ''
    }
  }

  ngOnInit() {
    this.registerFormGroup = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {
    this.registerRequest = {
      userName: this.registerFormGroup.value.userName, 
      email: this.registerFormGroup.value.email,
      password: this.registerFormGroup.value.password
    }

    this._loginService.register(this.registerRequest).subscribe(resp => {
      console.log('Success:');
      this.router.navigate(['login']);
    }, error => {
      console.log('Error:');
      console.log(error);
    })
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

}
