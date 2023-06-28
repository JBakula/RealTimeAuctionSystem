import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAuctionFormDialogComponent } from './place-auction-form-dialog.component';

describe('PlaceAuctionFormDialogComponent', () => {
  let component: PlaceAuctionFormDialogComponent;
  let fixture: ComponentFixture<PlaceAuctionFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceAuctionFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceAuctionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
