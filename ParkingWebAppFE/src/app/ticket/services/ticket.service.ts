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

  getTicketById(idTicket: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.TICKET_API}/${idTicket}`);
  }

  deleteTicket(idTicket: number): Observable<void> {
    return this.http.delete<void>(`${this.TICKET_API}/delete/${idTicket}`);
  }

  createTicket(ticket: Ticket): Observable<void> {
    return this.http.post<void>((`${this.TICKET_API}/create`), ticket);
  }

  putEmployee(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.TICKET_API}/${ticket.ticketId}`, ticket);
  }

  getDeletedTicket(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.TICKET_API}/ticket-deleted`);
  }

  // quan
  getTicket(id: number): Observable<Ticket>{
    return this.http.get<Ticket>(this.TICKET_API + '/' + id);
  }

  getTicketByLicense(license: string): Observable<Ticket>{
    return this.http.get<Ticket>(this.TICKET_API + '/get-by-license/' + license);
  }
}
