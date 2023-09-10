import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, IRegister } from '../dtos/dtos';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();
  jwtHelperService = new JwtHelperService

  constructor(private http: HttpClient) { 
    const token = localStorage.getItem('token');
    this._isLoggedIn.next(!!token);

    const pom = this.jwtHelperService.getTokenExpirationDate(token ? token : '');
    if(pom) {
      let currentTime = new Date();
      if(pom < currentTime) {
        this._isLoggedIn.next(false);
        localStorage.removeItem('token');
      }
    }
  }

  login(loginRequest: ILogin): Observable<any> {
    console.log(loginRequest);
    return this.http.post(`${environment.domain}/User/login`, loginRequest);
  }

  register(registerRequest: IRegister): Observable<any> {
    return this.http.post(`${environment.domain}/User/register`, registerRequest);
  }

  loginMetod(value: boolean): void {
    this._isLoggedIn.next(value);
  }
}
