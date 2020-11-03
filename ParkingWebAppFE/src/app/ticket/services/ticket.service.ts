import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from './../models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private TICKET_API = 'http://localhost:8080/ticket';

  constructor(
    private http: HttpClient
  ) { }

  getAllTicket(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.TICKET_API}/all`);
  }
  // quan
  getTicket(id: number): Observable<Ticket>{
    return this.http.get<Ticket>(this.TICKET_API + '/' + id);
  }
}
