import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAllCategory, IPlaceAnAuction } from 'src/app/dtos/dtos';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-place-auction-form-dialog',
  templateUrl: './place-auction-form-dialog.component.html',
  styleUrls: ['./place-auction-form-dialog.component.css']
})
export class PlaceAuctionFormDialogComponent {
  auction: any;
  auctionFormGroup!: FormGroup;
  placeAuction!: IPlaceAnAuction;
  helperImage?: FormData | null;
  categorys!: IAllCategory[];

  constructor(public dialogRef: MatDialogRef<IPlaceAnAuction>, @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, public datePipe: DatePipe, private _sharedService: SharedService) {
      this.auction = data;
  }

  ngOnInit() {
    this.auctionFormGroup = this.fb.group({
      titleValue: ['', [Validators.required]],
      descriptionValue: ['', [Validators.required]],
      startingPriceValue: ['', [Validators.required]],
      categoryIdValue: ['', [Validators.required]],
      endsInValue: ['', [Validators.required, this.dateValidator()]],
      imageValue: ['', []],
    });
    //  Dohvat svih kategorija
    this._sharedService.getAllCategorys().subscribe(resp => {
      this.categorys = resp;
    });
  }

  imageUpload(event: any) {
    let file: File = event.target.files[0]; 
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.helperImage = formData;
   }

  onSubmit() {
    this.placeAuction = {
      title: this.auctionFormGroup.value.titleValue,
      description: this.auctionFormGroup.value.descriptionValue,
      startingPrice: Number(this.auctionFormGroup.value.startingPriceValue),
      categoryId: Number(this.auctionFormGroup.value.categoryIdValue),
      endsIn: this.auctionFormGroup.value.endsInValue,
      image: this.helperImage ? this.helperImage : null 
    }

    console.log(this.placeAuction.image);


    this.placeAuction.endsIn = this.datePipe.transform(this.placeAuction.endsIn, 'yyyy-MM-dd hh:mm:ss') ?? '';
    this.dialogRef.close(this.placeAuction);
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
}

