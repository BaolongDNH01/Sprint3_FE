import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Paking} from '../paking';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  API_URL = 'http://localhost:8080/';

  constructor(
    private httpClient: HttpClient,
  ) {
  }


  getAllCarByDateIn(dateIn: string, dateOut: string): Observable<string[]> {
    return this.httpClient.get<string[]>(this.API_URL + 'getAllCarByDateIn/' + dateIn + '/' + dateOut);
  }

  getAllCarByDateOut(dateIn: string, dateOut: string): Observable<string[]> {
    return this.httpClient.get<string[]>(this.API_URL + 'getAllCarByDateOut/' + dateIn + '/' + dateOut);
  }

  getAllCarByDateInDateOut(dateIn: string, dateOut: string): Observable<string[]> {
    return this.httpClient.get<string[]>(this.API_URL + 'getAllCarByDateInDateOut/' + dateIn + '/' + dateOut);
  }

  getAllCountUser(): Observable<number> {
    return this.httpClient.get<number>(this.API_URL + 'count-user');
  }
}
