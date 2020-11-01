import { Component, OnInit } from '@angular/core';
import { TicketService } from './../../services/ticket.service';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  constructor(
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.ticketService.getAllTicket().subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    });
  }

}
