import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainAuctionComponent } from 'src/app/components/main-auction/main-auction.component';

@Component({
  selector: 'app-delete-auction-dialog',
  templateUrl: './delete-auction-dialog.component.html',
  styleUrls: ['./delete-auction-dialog.component.css']
})
export class DeleteAuctionDialogComponent {

  constructor(public dialogRef: MatDialogRef<MainAuctionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  dialogClose(value: boolean) {
    this.dialogRef.close(value);
  }

}
