import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from '../dtos/dtos';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginRequest: ILogin): void {
    console.log(loginRequest);
    this.http.post(`${environment.domain}/User/login`, loginRequest).subscribe(response => {
      console.log('Success:\n');
      console.log(response);
    }, error => {
      console.log('Error:\n');
      console.log(error);
    })
  }
}
