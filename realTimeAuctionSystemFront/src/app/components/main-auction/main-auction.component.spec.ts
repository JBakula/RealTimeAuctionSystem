import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAuctionComponent } from './main-auction.component';

describe('MainAuctionComponent', () => {
  let component: MainAuctionComponent;
  let fixture: ComponentFixture<MainAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAuctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
