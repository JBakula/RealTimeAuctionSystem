import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainAuctionComponent } from 'src/app/components/main-auction/main-auction.component';
import { IAllAuctions, IAllCategory } from 'src/app/dtos/dtos';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-auction-dialog',
  templateUrl: './edit-auction-dialog.component.html',
  styleUrls: ['./edit-auction-dialog.component.css']
})
export class EditAuctionDialogComponent implements OnInit {
  auction: IAllAuctions;
  auctionFormGroup!: FormGroup;
  selectedFile: File | null = null;
  categorys!: IAllCategory[];

  constructor(public dialogRef: MatDialogRef<MainAuctionComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder, public datePipe: DatePipe, private _sharedService: SharedService) {
    this.auction = data;
    console.log(this.auction);
  }

  ngOnInit() {
    let startDate = this.datePipe.transform(this.auction.startsAt, 'yyyy-MM-dd hh:mm:ss');
    this.auctionFormGroup = this.fb.group({
      titleValue: [this.auction.title, [Validators.required]],
      descriptionValue: [this.auction.description, [Validators.required]],
      startingPriceValue: [this.auction.startingPrice, [Validators.required, Validators.pattern('^[0-9]+$')]],
      categoryIdValue: [this.auction.categoryId, [Validators.required]],
      endsInValue: [this.auction.endsIn, [Validators.required, this.dateValidator()]],
      startsInValue: [startDate, [Validators.required]],
      imageValue: ['', []],
    });
    this._sharedService.getAllCategorys().subscribe(resp => {
      this.categorys = resp;
    });
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {

      let date = new Date();
      let today = this.datePipe.transform(date, 'yyyy-MM-dd hh:mm:ss') ?? '';
      let value = this.datePipe.transform(control.value, 'yyyy-MM-dd hh:mm:ss') ?? '';

      if(today > value) {
        return { 'DateValidation': true};
      }

      return null;
    }
  }

  imageUpload(event: any) {
    this.selectedFile = event.target.files[0];
   }

  onSubmit() {
    const pomData = {
      title: this.auctionFormGroup.value.titleValue,
      description: this.auctionFormGroup.value.descriptionValue,
      startingPrice: this.auctionFormGroup.value.startingPriceValue,
      categoryId: this.auctionFormGroup.value.categoryIdValue,
      startsAt: this.auctionFormGroup.value.startsInValue.toString(),
      endsIn: this.auctionFormGroup.value.endsInValue.toString(),
    }
    const formData = new FormData();
    formData.append('Title', this.auctionFormGroup.value.titleValue);
    formData.append('Description', this.auctionFormGroup.value.descriptionValue);
    formData.append('StartingPrice', this.auctionFormGroup.value.startingPriceValue.toString());
    formData.append('CategoryId', this.auctionFormGroup.value.categoryIdValue.toString());
    formData.append('StartsAt', this.datePipe.transform(this.auctionFormGroup.value.startsInValue, 'yyyy-MM-dd hh:mm:ss') ?? '');
    formData.append('EndsIn', this.datePipe.transform(this.auctionFormGroup.value.endsInValue, 'yyyy-MM-dd hh:mm:ss') ?? '');
    if(this.auctionFormGroup.value.imageValue !== '' && this.auctionFormGroup.value.imageValue !== null && this.auctionFormGroup.value.imageValue !== undefined)
      formData.append('Image', this.selectedFile ? this.selectedFile : '');

    this.dialogRef.close({
      formData: formData,
      // formData: pomData,
      categoryId: this.auction.auctionId
    });
  }

}
