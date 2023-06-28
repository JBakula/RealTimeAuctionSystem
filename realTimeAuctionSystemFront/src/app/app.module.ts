import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedService } from './services/shared.service';
import { MaterialsModule } from './materials/materials.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MainAuctionComponent } from './components/main-auction/main-auction.component';
import { AuctionDetailComponent } from './components/auction-detail/auction-detail.component';
import { AuctionFormDialogComponent } from './dialogs/auction-form-dialog/auction-form-dialog.component';
import { PlaceAuctionFormDialogComponent } from './dialogs/place-auction-form-dialog/place-auction-form-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainAuctionComponent,
    AuctionDetailComponent,
    AuctionFormDialogComponent,
    PlaceAuctionFormDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialsModule
  ],
  providers: [
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
