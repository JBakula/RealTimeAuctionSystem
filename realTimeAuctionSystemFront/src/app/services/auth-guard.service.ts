import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { IUser } from '../dtos/dtos';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  userInfo: IUser = {};
  jwtHelperService = new JwtHelperService();
  isLogedIn: boolean = false;

  constructor(public _loginService: LoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ) {

    this._loginService.isLoggedIn.subscribe(resp => {
      if(resp) {
        this.isLogedIn = false;
        this.router.navigate([''], { queryParams: { decodeTokenJson: this.getUserInfoFromToken() } });
      } else {
        this.isLogedIn = true;
      }
    
    });

    return this.isLogedIn;
  }

  getUserInfoFromToken() {
    const token = localStorage.getItem('token');
    const decodeToken = this.jwtHelperService.decodeToken(token ? token : '');
    return JSON.stringify(decodeToken);
  }
}
