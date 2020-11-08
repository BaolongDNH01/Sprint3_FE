import { TicketType } from './../models/TicketType';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TicketTypeService {

  private TICKET_API = 'http://localhost:8080/ticket-type';

  constructor(private http: HttpClient) { }

  getAllTicketType(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`${this.TICKET_API}/all`);
  }
}
