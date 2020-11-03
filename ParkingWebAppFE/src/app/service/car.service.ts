import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Car} from '../car/car';
import {HttpClient} from '@angular/common/http';

export const listImage = [
  ['in', '/assets/images/Singapore_1990_vehicle_registration_plate_of_a_silver_Ford_Focus.jpg'],
  ['out', '/assets/images/38e981110046fc18a557_xzcs.jpg'],
  ['in', '/assets/images/56FCYikaub.jpg'],
  ['out', '/assets/images/bien-so-o-to-mercedes-1.jpg'],
  ['in', '/assets/images/dau-gia-bien-so-dep.jpg'],
  ['out', '/assets/images/download.jpg'],
  ['out', '/assets/images/Normal-2016-Lexus-LX-LX-570-SUV-Crossover-4WD-5-7L-8cyl-6A-20170720065118119.jpg'],
  ['in', '/assets/images/o-to-co-duoc-lap-hai-bien-so-xe-dai-hay-khong-oto-ebd0.jpg']
];

@Injectable({
  providedIn: 'root'
})
export class CarService {
  API_URL = 'http://localhost:8080';
  proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  PLATE_API = 'https://api.platerecognizer.com/v1/plate-reader/';

  constructor(private router: Router, private httpClient: HttpClient) { }

  getCarByLicense(license: number): Observable<Car> {
    return this.httpClient.get<Car>(`${this.API_URL}/get-car/${license}`);
  }

  saveCar(car: Car): Observable<any>{
    return this.httpClient.post<any>(`${this.API_URL}/add-car`, car);
  }

  getLicense(image: FormData): Observable<any>{
    // image.append('Access-Control-Allow-Origin', '*');
    // image.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // image.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    return this.httpClient.post<any>(this.proxyUrl + this.PLATE_API,
      image, {headers: {
          Authorization: 'Token b254bd5bb420657fdf9b07b597db61a8dbaee6e8'
        }});
  }
}
