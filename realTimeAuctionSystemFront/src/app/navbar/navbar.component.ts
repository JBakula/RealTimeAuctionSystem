import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceAuctionFormDialogComponent } from '../dialogs/place-auction-form-dialog/place-auction-form-dialog.component';
import { IAllCategory, IPlaceAnAuction, IUser } from '../dtos/dtos';
import { LoginService } from '../services/login.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  auction!: IPlaceAnAuction;
  userInfo: IUser = {}
  isLogedIn: boolean = false;

  constructor(private router: Router, public dialog: MatDialog,
    private _sharedService: SharedService, public datePipe: DatePipe, 
    public _loginService: LoginService, private activatedRoute: ActivatedRoute) {
      this.auction = {
        title: '',
        description: '',
        startingPrice: 0,
        categoryId: 0,
        endsIn: '',
        image: null
      };
       _loginService.isLoggedIn.subscribe(resp => {
        this.isLogedIn = resp;
      });
      this.activatedRoute.queryParams.subscribe(params => {
        if(params['decodeTokenJson'] !== undefined && params['decodeTokenJson'] !== 'null') {
          this.userInfo = JSON.parse(params['decodeTokenJson']);
        }
      });
    }

  openMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }

  closeMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }

  //  Navigacija
  goHome() {
    let token = localStorage.getItem('token');
    if(token) {
      const decodeTokenJson = JSON.stringify(this.userInfo);
      this.router.navigate([''], { queryParams: { decodeTokenJson } });
    } else {
      this.router.navigate(['']);
    }
  }

  goToLogin() {
    this.router.navigateByUrl(this.isLogedIn === false ? 'login' : '');
  }

  goLogOut() {
    if(this.isLogedIn) {
      localStorage.removeItem('token');
      console.count('You are logged out');
      this._loginService.loginMetod(false);
    }
  }

  openDialog() {
    if(this.isLogedIn) {
      const dialogRef = this.dialog.open(PlaceAuctionFormDialogComponent,{
        data: {
          title: this.auction.title,
          description: this.auction.description,
          startingPrice: this.auction.startingPrice,
          categoryId: this.auction.categoryId,
          endsIn: this.auction.endsIn,
          image: this.auction.image
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result !== '') {
          this._sharedService.placeAnAuction(result).subscribe(response => {
            console.log(response);
            this._sharedService.newRefresh();
          }, error => {
            console.log(error);
          });
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
