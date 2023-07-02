import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAllAuctions, IPlaceAnAuction } from '../dtos/dtos';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  getAllAuctions(): Observable<IAllAuctions[]> {
    return this.http.get<IAllAuctions[]>(`${environment.domain}/Auction`);
  }

  placeAnAuction(auction: IPlaceAnAuction) {
    console.log(auction);
    return this.http.post(`${environment.domain}/Auction`, auction);
  }
}
