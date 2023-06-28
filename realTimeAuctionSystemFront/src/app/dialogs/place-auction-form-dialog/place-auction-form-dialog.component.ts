import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPlaceAnAuction } from 'src/app/dtos/dtos';

@Component({
  selector: 'app-place-auction-form-dialog',
  templateUrl: './place-auction-form-dialog.component.html',
  styleUrls: ['./place-auction-form-dialog.component.css']
})
export class PlaceAuctionFormDialogComponent {
  auction: any;
  auctionFormGroup!: FormGroup;
  bid!: IPlaceAnAuction;

  constructor(public dialogRef: MatDialogRef<IPlaceAnAuction>, @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
      this.auction = data;
  }

  ngOnInit() {
    this.auctionFormGroup = this.fb.group({
      titleValue: ['', [Validators.required]],
      descriptionValue: ['', [Validators.required]],
      startingPriceValue: ['', [Validators.required]],
      categoryIdValue: ['', [Validators.required]],
      startsAtValue: ['', [Validators.required]],
      endsInValue: ['', [Validators.required]],
      imageValue: ['', [Validators.required]],
    })
  }

  onSubmit() {

    this.dialogRef.close();
  }

}
