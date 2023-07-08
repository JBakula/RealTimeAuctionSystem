import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAllAuctions, IAllCategory, IPlaceAnAuction } from '../dtos/dtos';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  getAllAuctions(): Observable<IAllAuctions[]> {
    return this.http.get<IAllAuctions[]>(`${environment.domain}/Auction`);
  }

  getAuctionById(id: number): Observable<IAllAuctions> {
    return this.http.get<IAllAuctions>(`${environment.domain}/Auction/details/${id}`);
  }

  getAllCategorys(): Observable<IAllCategory[]> {
    return this.http.get<IAllCategory[]>(`${environment.domain}/Category`);
  }

  placeAnAuction(auction: IPlaceAnAuction) {
    console.log(auction);
    return this.http.post(`${environment.domain}/Auction`, auction);
  }
}
