import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuctionFormDialogComponent } from 'src/app/dialogs/auction-form-dialog/auction-form-dialog.component';
import { IAllAuctions, IBids, IUser } from 'src/app/dtos/dtos';
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
  bids: IBids[] = [];
  maxBid: IBids = {value: 0};

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private _sharedService: SharedService, public dialog: MatDialog, private ws: WebsocketService,
    public _loginService: LoginService, private _snackBar: MatSnackBar) { 
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
        this._sharedService.getAllBids(params['audtionId']).subscribe(resp => {
          console.log(resp);
          this.bids = resp;
          this.bids.forEach(element => {
            if(element.value !== undefined && this.maxBid.value !== undefined) {
              this.maxBid = element.value > this.maxBid.value ? element : this.maxBid;
            }
          });
        }, error => {
          console.log(error);
        });
      });
    }

  ngOnInit() {

    this.ws.startConnection();
    this.ws.newBid();

    this.ws.bids.subscribe(resp => {
      this.bids = resp.filter(r => r.auctionId === this.auction.auctionId);
      console.log(resp);
      this.bids.sort((a, b) => {
        if(a.bidId && b.bidId) {
          return a.bidId - b.bidId;
        } else {
          return 0;
        }
      });
      this.bids.forEach(element => {
        if(element.value !== undefined && this.maxBid.value !== undefined) {
          this.maxBid = element.value > this.maxBid.value ? element : this.maxBid;
        }
      });
    });
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
          if(this.maxBid?.value !== undefined && result.value >= this.maxBid?.value)
            this.ws.createBid(result.userId, result.auctionId, result.value);
          else
          this._snackBar.open("Bid must be higher than current max bid.", "Confirm", {
            duration: 5000
          });
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}