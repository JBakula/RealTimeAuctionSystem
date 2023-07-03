import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionDetailComponent } from './components/auction-detail/auction-detail.component';
import { LoginComponent } from './components/login/login.component';
import { MainAuctionComponent } from './components/main-auction/main-auction.component';

const routes: Routes = [
  { path: '', component: MainAuctionComponent },
  { path: 'details', component: AuctionDetailComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
