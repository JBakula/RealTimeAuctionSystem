import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuctionFormDialogComponent } from 'src/app/dialogs/auction-form-dialog/auction-form-dialog.component';
import { IAllAuctions, IUser } from 'src/app/dtos/dtos';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from 'src/app/services/shared.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit, OnDestroy {
  auction!: IAllAuctions;
  userInfo: IUser = {};
  isLogedIn: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private _sharedService: SharedService, public dialog: MatDialog, private ws: WebsocketService,
    public _loginService: LoginService) { 
      this.auction = {
        auctionId: 0,
        title: '',
        description: '',
        startingPrice: 0,
        categoryId: 0,
        startsAt: new Date(),
        endsIn: new Date(),
        image: '',
        bids: ''
      };
      this._loginService.isLoggedIn.subscribe(resp => {
        this.isLogedIn = resp;
      });
      this.activatedRoute.queryParams.subscribe(params => {
        this._sharedService.getAuctionById(params['audtionId']).subscribe(resp => {
          this.auction = resp;
        }, error => {
          console.log('Error:');
          console.log(error);
        });
        if(params['decodeTokenJson'] !== undefined) {
          this.userInfo = JSON.parse(params['decodeTokenJson']);
        }
      });
    }

  ngOnInit() {

    this.ws.startConnection();

    // setTimeout(() => {
    //   this.ws.newBid();
    //   this.ws.createBid();
    // }, 2000);
  }

  ngOnDestroy() {
    this.ws.hubConnection.off("newBid");
  }

  openDialog() {
    if(this.isLogedIn){
      const dialogRef = this.dialog.open(AuctionFormDialogComponent,{
        width: '30rem',
        height: '15rem',
        data: {
          auctionId: this.auction.auctionId,
          title: this.auction.title,
          description: this.auction.description,
          startingPrice: this.auction.startingPrice,
          categoryId: this.auction.categoryId,
          startsAt: this.auction.startsAt,
          endsIn: this.auction.endsIn,
          image: this.auction.image,
          bids: this.auction.bids,
          userId: this.userInfo.userId
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result.value !== undefined) {
          result.value = Number(result.value);
          console.log(result);
          this.ws.createBid(result.userId, result.auctionId, result.value);
          this.ws.newBid();
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}