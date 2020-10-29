import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  constructor() {
  }

  getAllZoneByFloor(floor: number): Observable<void> {
    return null;
  }

  getAllParkingLot(): Observable<void> {
    return null;
  }

  getAllFloor(): Observable<void> {
    return null;
  }
}
