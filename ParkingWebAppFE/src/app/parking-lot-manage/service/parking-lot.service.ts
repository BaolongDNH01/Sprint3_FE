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

  addParkingLot(par: ParkingLot): Observable<any> {
    return this.httpClient.post<any>(this.api + '/saveParkingLot', par);
  }

  editParkingLot(par: ParkingLot): Observable<any> {
    return this.httpClient.post<any>(this.api + '/editParkingLot', par);
  }

  getParkingLotById(id: number): Observable<ParkingLot> {
    return this.httpClient.get<ParkingLot>(this.api + '/getParkingLotById/' + id);
  }

  editZonePositionX(id: number, pX: number): Observable<any> {
    return this.httpClient.get<any>(this.api + '/changeZonePositionX/' + id + '/' + pX);
  }

  editZonePositionY(id: number, pY: number): Observable<any> {
    return this.httpClient.get<any>(this.api + '/changeZonePositionY/' + id + '/' + pY);
  }

  deleteParkingLot(id: number): Observable<any> {
    return this.httpClient.delete(this.api + '/deleteParkingLot/' + id);
  }

  addFloor(): Observable<Floor>{
    return this.httpClient.get<Floor>(this.api + '/saveFloor');
  }

  addZone(floorChoose: Floor, zone: Zone): Observable<any>{
    return this.httpClient.post<any>(this.api + '/saveZone', {
      floorChoose,
      zone,
    });
  }
}
