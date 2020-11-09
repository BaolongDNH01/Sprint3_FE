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

  getAllZone(): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(this.api + '/getAllZone');
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

  addFloor(zones: Zone[]): Observable<any> {
    return this.httpClient.post<any>(this.api + '/saveFloor', zones);
  }

  editZoneDirection(dir: number, id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + '/changeDirection/' + id + '/' + dir);
  }

  editZoneName(id: number, name: string): Observable<any> {
    return this.httpClient.get<any>(this.api + '/changeZoneName/' + id + '/' + name);
  }

  editTypeZone(id: number, value: number): Observable<any> {
    return this.httpClient.get<any>(this.api + '/changeTypeZone/' + id + '/' + value);
  }

  deleteZone(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + '/deleteZone/' + id);
  }

  addZone(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + '/addZone/' + id);
  }

  deleteFloor(id: number): Observable<any> {
    return this.httpClient.get<any>(this.api + '/deleteFloor/' + id);
  }
}
