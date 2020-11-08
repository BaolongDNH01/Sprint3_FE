import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ParkingRe} from '../model/parkingRe';
import {Parking} from '../../service/parking';

@Injectable({
  providedIn: 'root'
})
export class ParkingReService {
  API_URL = 'http://localhost:8080';
  proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  checkIn(license: string): Observable<ParkingRe> {
    return this.httpClient.get<ParkingRe>(this.API_URL + '/check-in/' + license);
  }

  checkOut(license: string): Observable<ParkingRe> {
    return this.httpClient.get<ParkingRe>(this.API_URL + '/check-out/' + license);
  }

  confirmIn(parking: ParkingRe): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + '/let-in/', parking);
  }

  confirmOut(parking: ParkingRe): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + '/let-out/', parking);
  }
}
