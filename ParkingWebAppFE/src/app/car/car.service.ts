import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from './car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  URL_API = 'http://localhost:8080/'
  constructor(private httpClient: HttpClient) { }
  findCarByCustomer(id: number): Observable<Car[]>{
    return this.httpClient.get<Car[]>(this.URL_API + 'get-car-by-customer/' + id);
  }
}