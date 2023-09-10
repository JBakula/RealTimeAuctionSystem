import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAllAuctions, IAllCategory, IBids, IPlaceAnAuction } from '../dtos/dtos';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _refresh = new BehaviorSubject<any>(false);
  refresh = this._refresh.asObservable();

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
    return this.http.post(`${environment.domain}/Auction`, auction);
  }

  editAnAuction(auction: IPlaceAnAuction, id: number) {
    console.log(id);
    return this.http.put(`${environment.domain}/Auction/${id}`, auction);
  }

  deleteAnAuction(id: number) {
    return this.http.delete(`${environment.domain}/Auction/${id}`);
  }

  getAllBids(auctionId: number): Observable<IBids[]> {
    return this.http.get<IBids[]>(`${environment.domain}/Bid/${auctionId}`);
  }

  newRefresh() {
    this._refresh.next(true);
  }
}
