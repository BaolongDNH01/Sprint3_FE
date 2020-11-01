import { Ticket } from './../../models/Ticket';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from './../../services/ticket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  ticketList: Ticket[];
  confirmDelete = false;

  constructor(
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.subscription = this.ticketService.getAllTicket().subscribe({
      next: data => this.ticketList = data,
      error: err => console.log(err)
    });
  }

  onShowConfirmDeleteDialog(id: number): void {
    console.log(id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
