import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from './car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  URL_API = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {
  }

  findCarByCustomer(id: number): Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.URL_API + 'get-car-by-customer/' + id);
  }

  findAllCar(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.URL_API + 'all-car');
  }
// Chau
  findAllCarByType(type: string): Observable<Car[]>{
    return this.httpClient.get<Car[]>(this.URL_API + 'getAllCarByType/' + type);
  }
  // quan
  findById(id: number): Observable<Car>{
    return this.httpClient.get<Car>(this.URL_API + 'car/' + id);
  }
  // quan
  editCar(car: Car): Observable<Car>{
    return this.httpClient.post<Car>(this.URL_API + 'edit-car', car);
  }
  // quan
  deleteCar(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL_API + 'delete-car/' + id);
  }
}
