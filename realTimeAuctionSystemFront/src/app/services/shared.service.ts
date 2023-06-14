import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  getAllAuctions(): Observable<any> {
    return this.http.get('https://localhost:7273/api/Auction');
  }
}
