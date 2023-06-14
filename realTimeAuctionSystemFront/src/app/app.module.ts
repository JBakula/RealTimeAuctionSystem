import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BidComponent } from './components/bid/bid.component';
import { CategoryComponent } from './components/category/category.component';
import { UserComponent } from './components/user/user.component';
import { AuctionComponent } from './components/auction/auction.component';
import { SharedService } from './services/shared.service';
import { MaterialsModule } from './materials/materials.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AuctionComponent,
    BidComponent,
    CategoryComponent,
    UserComponent,
    NavbarComponent
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
