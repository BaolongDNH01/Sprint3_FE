import { FormGroup, FormBuilder } from '@angular/forms';
import { Ticket } from './../../models/Ticket';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from './../../services/ticket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  ticketList: Ticket[];
  keywordSearch: string;

  checkCreate = false;
  checkEdit = false;

  page = 1;

  createTicketForm: FormGroup;
  newTicket: Ticket;



  constructor(
    private ticketService: TicketService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getListTicket();
  }

  getListTicket(): void {
    this.subscription = this.ticketService.getAllTicket().subscribe({
      next: data => {
        this.ticketList = data;
        for (const i of this.ticketList) {
          if (i.ticketStatus === 'TICKET_ENABLE') {
            i.ticketStatus = 'Còn hạn';
          }
        }
      },
      error: err => console.log(err)
    });
  }

  showCreateForm(): void {
    this.createTicketForm = this.fb.group({
      ticketId: [''],
      carPlate: [''], // get car plate cua ben car
      customerName: [''], // get customer name cua ben customer
      startDate: [''],
      endDate: [''],
      floorName: [''],
      zoneName: [''],
      parkingLot: [''],
      ticketTypeDetail: [''],
      price: [''],
      ticketStatus: ['TICKET_ENABLE'],
    });
    this.checkCreate = !this.checkCreate;
    console.log('created');
  }

  submitCreateTicket(): void {
    this.newTicket = Object.assign({}, this.createTicketForm.value);
    console.log(this.createTicketForm.value);
    // this.subscription = this.ticketList.createTicket(newTicket).subscribe({
    //   next: data => console.log(data),
    //   error: err => console.log(err)
    // });
  }

  showEditForm(): void {
    this.checkEdit = true;
  }

  acceptDelete(idTicket: number): void {
    $('#deleteModal' + idTicket).modal('hide');
    this.subscription = this.ticketService.deleteTicket(idTicket).subscribe({
      next: () => {
        this.getListTicket();
      },
      error: err => console.log(err),
      complete: () => {
        this.router.navigateByUrl('ticket/list');
      }
    });
  }

  onDelete(idTicket: number): void {

  }

  onEdit(idTicket: number): void {

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
