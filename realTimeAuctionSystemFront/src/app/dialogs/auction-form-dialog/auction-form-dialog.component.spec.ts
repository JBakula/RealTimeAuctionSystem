import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionFormDialogComponent } from './auction-form-dialog.component';

describe('AuctionFormDialogComponent', () => {
  let component: AuctionFormDialogComponent;
  let fixture: ComponentFixture<AuctionFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
