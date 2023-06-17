import { Component, OnInit } from '@angular/core';
import { IAllAuctions } from 'src/app/dtos/dtos';
import { SharedService } from 'src/app/services/shared.service';

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

  constructor(private _sharedService: SharedService) {}

  ngOnInit(): void {
    //  Dohvat svih aukcija
    this._sharedService.getAllAuctions().subscribe(response => {
      this.allAuctions = response;
      this.dataSource = this.allAuctions;
    }, error => {
      console.log("We have a error: ", error);
    })
  }
}
