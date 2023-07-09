import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';
import { IBids } from '../dtos/dtos';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  wsPath: string = "https://localhost:7273/hubs/bidHub";
  private _bids = new BehaviorSubject<IBids[]>([{}]);
  bids = this._bids.asObservable();

  constructor() { }

  hubConnection!: HubConnection;

  startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.wsPath, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    })
    .build();

    this.hubConnection
    .start()
    .then(() => {
      console.log('Hub connection is ON!');
    })
    .catch(error => console.log('Error while starting connection: ' + error));
  }

  createBid(userId: number, auctionId: number, value: number) {
    this.hubConnection.invoke('CreateBid', userId, auctionId, value)
    .catch(error => console.log(error));
  }

  newBid() {
    this.hubConnection.on('newBid', (resp) => {
      this._bids.next(resp);
    });
  }
}
