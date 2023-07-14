import { Component, OnInit } from '@angular/core';
import { IAllAuctions, IUser } from 'src/app/dtos/dtos';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-main-auction',
  templateUrl: './main-auction.component.html',
  styleUrls: ['./main-auction.component.css']
})
export class MainAuctionComponent implements OnInit {
  allAuctions!: IAllAuctions[];
  dataSource!: IAllAuctions[];
  displayedColumns: string[] = ['auctionId', 'title', 'description', 'startingPrice',
    'categoryId', 'startsAt', 'endsIn', 'image', 'bids'];
  userInfo: IUser = {};
  isLogedIn: boolean = false;
  sliceBegin!: number;
  sliceEnd!: number;
  pageItems!: number;

  constructor(private _sharedService: SharedService, private router: Router, 
      private activatedRoute: ActivatedRoute, public _loginService: LoginService) {
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
      }

  ngOnInit(): void {
    //  Dohvat svih aukcija
    this._sharedService.getAllAuctions().subscribe(response => {
      this.allAuctions = response.sort((a, b) => a.auctionId + b.auctionId);
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
}
