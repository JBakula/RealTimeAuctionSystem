import { Component, OnInit } from '@angular/core';
import { IAllAuctions, IPlaceAnAuction, IUser } from 'src/app/dtos/dtos';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { EditAuctionDialogComponent } from 'src/app/dialogs/edit-auction-dialog/edit-auction-dialog.component';
import { DeleteAuctionDialogComponent } from 'src/app/dialogs/delete-auction-dialog/delete-auction-dialog.component';

@Component({
  selector: 'app-main-auction',
  templateUrl: './main-auction.component.html',
  styleUrls: ['./main-auction.component.css']
})
export class MainAuctionComponent implements OnInit {
  allAuctions!: IAllAuctions[];
  auction!: IAllAuctions; 
  dataSource!: IAllAuctions[];
  displayedColumns: string[] = ['auctionId', 'title', 'description', 'startingPrice',
    'categoryId', 'startsAt', 'endsIn', 'image', 'bids'];
  userInfo: IUser = {};
  isLogedIn: boolean = false;
  sliceBegin!: number;
  sliceEnd!: number;
  pageItems!: number;

  constructor(private _sharedService: SharedService, private router: Router, 
      private activatedRoute: ActivatedRoute, public _loginService: LoginService,
      public dialog: MatDialog) {
        this.activatedRoute.queryParams.subscribe(params => {
          if(params['decodeTokenJson'] !== undefined && params['decodeTokenJson'] !== 'null') {
            this.userInfo = JSON.parse(params['decodeTokenJson']);
          }
        });
        this._loginService.isLoggedIn.subscribe(resp => {
          this.isLogedIn = resp;
        });
        this.pageItems = 6;
        this.sliceBegin = 0;
        this.sliceEnd = 0;
        this._sharedService.refresh.subscribe(resp => {
          console.log(resp);
          if(resp !== null) {
            this._sharedService.getAllAuctions().subscribe(response => {
              this.allAuctions = response.sort((a, b) => a.auctionId + b.auctionId);
              this.sliceBegin = 0;
              this.sliceEnd = 0;
              this.dataSource = this.allAuctions.slice(this.sliceBegin, this.sliceEnd += this.pageItems);
            }, error => {
              console.log("We have a error: ", error);
            });
          }
        });
      }

  ngOnInit(): void {
    //  Dohvat svih aukcija
    this._sharedService.getAllAuctions().subscribe(response => {
      this.allAuctions = response.sort((a, b) => a.auctionId + b.auctionId);
      this.sliceBegin = 0;
      this.sliceEnd = 0;
      this.dataSource = this.allAuctions.slice(this.sliceBegin, this.sliceEnd += this.pageItems);
    }, error => {
      console.log("We have a error: ", error);
    });
  }

  goToDetails(auction: IAllAuctions) {
    const userInfoJson = JSON.stringify(this.userInfo);
    this.router.navigate(['/details'], { queryParams: { audtionId: auction.auctionId, decodeTokenJson: userInfoJson } });
  }

  something(event: any) {
    console.log(event);
    if(event.pageIndex > event.previousPageIndex) {
      this.dataSource = this.allAuctions.slice(this.sliceBegin += this.pageItems, this.sliceEnd += this.pageItems);
    } else if(event.pageIndex < event.previousPageIndex) {
      this.dataSource = this.allAuctions.slice(this.sliceBegin -= this.pageItems, this.sliceEnd -= this.pageItems);
    }
  }

  deleteAuction(auctionId: number) {
    if(this.isLogedIn) {
      const dialogRef = this.dialog.open(DeleteAuctionDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this._sharedService.deleteAnAuction(auctionId).subscribe(resp => {
            this._sharedService.getAllAuctions().subscribe(response => {
              this.allAuctions = response.sort((a, b) => a.auctionId + b.auctionId);
              this.sliceBegin = 0;
              this.sliceEnd = 0;
              this.dataSource = this.allAuctions.slice(this.sliceBegin, this.sliceEnd += this.pageItems);
            }, error => {
              console.log("We have a error: ", error);
            });
          });
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  openEditDialog(auctionId: number) {
    this._sharedService.getAuctionById(auctionId).subscribe(resp => {
      this.auction = {
        categoryId: resp.categoryId,
        title: resp.title,
        startingPrice: resp.startingPrice,
        description: resp.description,
        endsIn: resp.endsIn,
        image: resp.image,
        auctionId: resp.auctionId,
        startsAt: resp.startsAt,
        bids: resp.bids
      }

      if(this.isLogedIn) {
        console.log(this.auction.startsAt);
        console.log(this.auction.endsIn);
        const dialogRef = this.dialog.open(EditAuctionDialogComponent,{
          data: {
            title: this.auction.title,
            description: this.auction.description,
            startingPrice: this.auction.startingPrice,
            categoryId: this.auction.categoryId,
            endsIn: this.auction.endsIn,
            startsAt: this.auction.startsAt,
            auctionId: this.auction.auctionId
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result !== '') {
            this._sharedService.editAnAuction(result.formData, result.categoryId).subscribe(resp => {
              console.log(resp);
              this._sharedService.getAllAuctions().subscribe(response => {
                this.allAuctions = response.sort((a, b) => a.auctionId + b.auctionId);
                this.sliceBegin = 0;
                this.sliceEnd = 0;
                this.dataSource = this.allAuctions.slice(this.sliceBegin, this.sliceEnd += this.pageItems);
              }, error => {
                console.log("We have a error: ", error);
              });
            }, error => {
              console.log(error);
            });
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
