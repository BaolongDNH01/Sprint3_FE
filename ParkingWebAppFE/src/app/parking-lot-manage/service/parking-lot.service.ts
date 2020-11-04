import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Zone} from '../entity/zone';
import {ParkingLot} from '../entity/parking-lot';
import {Floor} from '../entity/floor';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {
  private api = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  getAllZoneByFloor(floor: number): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(this.api + '/getAllZone/' + floor);
  }

  getAllParkingLot(): Observable<ParkingLot[]> {
    return this.httpClient.get<ParkingLot[]>(this.api + '/getAllParkingLot');
  }

  getAllFloor(): Observable<Floor[]> {
    return this.httpClient.get<Floor[]>(this.api + '/getAllFloor');
  }
}
