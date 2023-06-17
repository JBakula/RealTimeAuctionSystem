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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainAuctionComponent
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
