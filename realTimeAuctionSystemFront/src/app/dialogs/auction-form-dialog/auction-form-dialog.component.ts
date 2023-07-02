import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuctionDetailComponent } from 'src/app/components/auction-detail/auction-detail.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPlaceABid } from 'src/app/dtos/dtos';

@Component({
  selector: 'app-auction-form-dialog',
  templateUrl: './auction-form-dialog.component.html',
  styleUrls: ['./auction-form-dialog.component.css']
})
export class AuctionFormDialogComponent implements OnInit{
  auction: any;
  bidFormGroup!: FormGroup;
  bid!: IPlaceABid;

  constructor(public dialogRef: MatDialogRef<AuctionDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder ) {
      this.auction = data;
  }

  ngOnInit() {
    this.bidFormGroup = this.fb.group({
      bidValue: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.bid = {
      value: this.bidFormGroup.value.bidValue,
      auctionId: this.auction.auctionId,
      userId: 3
    }
    this.dialogRef.close(this.bid);
  }

}
