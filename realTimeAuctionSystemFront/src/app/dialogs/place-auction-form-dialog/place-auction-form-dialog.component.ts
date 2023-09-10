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
  categorys!: IAllCategory[];
  selectedFile: File | null = null;

  constructor(public dialogRef: MatDialogRef<IPlaceAnAuction>, @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, public datePipe: DatePipe, private _sharedService: SharedService) {
      this.auction = data;
  }

  ngOnInit() {
    this.auctionFormGroup = this.fb.group({
      titleValue: ['', [Validators.required]],
      descriptionValue: ['', [Validators.required]],
      startingPriceValue: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
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
    this.selectedFile = event.target.files[0];
   }

  onSubmit() {
    const formData = new FormData();
    formData.append('Title', this.auctionFormGroup.value.titleValue);
    formData.append('Description', this.auctionFormGroup.value.descriptionValue);
    formData.append('StartingPrice', this.auctionFormGroup.value.startingPriceValue.toString());
    formData.append('CategoryId', this.auctionFormGroup.value.categoryIdValue.toString());
    formData.append('EndsIn', this.datePipe.transform(this.auctionFormGroup.value.endsInValue, 'yyyy-MM-dd hh:mm:ss') ?? '');
    formData.append('Image', this.selectedFile ? this.selectedFile : '');
    this.dialogRef.close(formData);
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

