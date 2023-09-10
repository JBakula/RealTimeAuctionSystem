import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedService } from './services/shared.service';
import { MaterialsModule } from './materials/materials.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MainAuctionComponent } from './components/main-auction/main-auction.component';
import { AuctionDetailComponent } from './components/auction-detail/auction-detail.component';
import { AuctionFormDialogComponent } from './dialogs/auction-form-dialog/auction-form-dialog.component';
import { PlaceAuctionFormDialogComponent } from './dialogs/place-auction-form-dialog/place-auction-form-dialog.component';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptorInterceptor } from './services/jwt-interceptor.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { EditAuctionDialogComponent } from './dialogs/edit-auction-dialog/edit-auction-dialog.component';
import { DeleteAuctionDialogComponent } from './dialogs/delete-auction-dialog/delete-auction-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainAuctionComponent,
    AuctionDetailComponent,
    AuctionFormDialogComponent,
    PlaceAuctionFormDialogComponent,
    LoginComponent,
    RegisterComponent,
    EditAuctionDialogComponent,
    DeleteAuctionDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialsModule,
  ],
  providers: [
    SharedService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
