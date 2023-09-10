import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuctionDialogComponent } from './edit-auction-dialog.component';

describe('EditAuctionDialogComponent', () => {
  let component: EditAuctionDialogComponent;
  let fixture: ComponentFixture<EditAuctionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAuctionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAuctionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
