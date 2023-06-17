import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAuctionComponent } from './components/main-auction/main-auction.component';

const routes: Routes = [
  { path: '', component: MainAuctionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
