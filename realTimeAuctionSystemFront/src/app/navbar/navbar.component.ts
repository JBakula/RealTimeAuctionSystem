import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { PlaceAuctionFormDialogComponent } from '../dialogs/place-auction-form-dialog/place-auction-form-dialog.component';
import { IPlaceAnAuction } from '../dtos/dtos';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  auction!: IPlaceAnAuction;

  constructor(private router: Router, public dialog: MatDialog,
    private _sharedService: SharedService) {
      this.auction = {
        title: '',
        description: '',
        startingPrice: 0,
        categoryId: 0,
        startsAt: new Date(),
        endsIn: new Date(),
        image: ''
      }
    }

  openMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }

  closeMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }

  //  Navigacija
  goHome() {
    this.router.navigateByUrl('');
  }

  openDialog() {
    const dialogRef = this.dialog.open(PlaceAuctionFormDialogComponent,{
      // width: '80%',
      // height: '90%',
      data: {
        title: this.auction.title,
        description: this.auction.description,
        startingPrice: this.auction.startingPrice,
        categoryId: this.auction.categoryId,
        startsAt: this.auction.startsAt,
        endsIn: this.auction.endsIn,
        image: this.auction.image
      }
    });
  }

}
