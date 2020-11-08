import { TicketTypeService } from './../../services/ticket-type.service';
import { TicketType } from './../../models/TicketType';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ticket } from './../../models/Ticket';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from './../../services/ticket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import instadate from 'instadate';
import { stringify } from '@angular/compiler/src/util';

declare var $: any;
@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  ticketList: Ticket[];
  ticketTypeList: TicketType[];
  deletedTicketList: Ticket[];


  keywordSearch: string;
  startDate: string;
  endDate: string;
  currentPrice = 0;
  expiredTime: number;

  selectedDate: string;
  startDateHandle: Date;
  endDateHandle: Date;
  minDate: Date;

  currentDate: Date;


  checkCreate = false;
  checkEdit = false;
  checkGetDeleteList = false;


  page = 1;

  createTicketForm: FormGroup;
  newTicket: Ticket;

  data: any;

  constructor(
    private ticketService: TicketService,
    private ticketTypeService: TicketTypeService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getListTicket();
    this.getListTicketType();

    this.minDate = new Date();

    if(sessionStorage.getItem('idParkingLot')) {
      // this.checkCreate = true;
      this.showCreateForm();
    } else {
      this.checkCreate = false;
    }
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

  getListTicketType(): void {
    this.subscription = this.ticketTypeService.getAllTicketType().subscribe({
      next: data => this.ticketTypeList = data,
      error: err => console.log(err)
    });
  }

  getDeletedTicket(): void {
    this.subscription = this.ticketService.getDeletedTicket().subscribe({
      next: data => {
        this.deletedTicketList = data;
        for (const i of this.deletedTicketList) {
          if (i.ticketStatus === 'TICKET_DELETED') {
            i.ticketStatus = 'Đã xoá';
          }
        }
      },
      error: err => console.log(err),
      complete: () => this.checkGetDeleteList = true,
    });
  }

  showCreateForm(): void {
    this.createTicketForm = this.fb.group({
      ticketId: ['666'],
      carPlate: ['43-1234'], // get car plate cua ben car
      customerName: ['thien'], // get customer name cua ben customer
      startDate: ['', [Validators.required]],
      endDate: [''],
      floorName: [sessionStorage.getItem('floor')],
      zoneName: [sessionStorage.getItem('zone'), [Validators.required]],
      parkingLot: [parseInt(sessionStorage.getItem('idParkingLot')), [Validators.required]],
      ticketTypeDetail: ['Loại', [Validators.required]],
      price: [''],
      ticketStatus: ['TICKET_ENABLE'],
    });
    this.checkCreate = !this.checkCreate;
    console.log('created');
    // console.log(this.currentDate);
  }

  submitCreateTicket(): void {


    // this.subscription = this.ticketList.createTicket(newTicket).subscribe({
    //   next: data => console.log(data),
    //   error: err => console.log(err)
    // });
    this.checkCreate = false;
    sessionStorage.removeItem('zone');
    sessionStorage.removeItem('floor');
    sessionStorage.removeItem('idParkingLot');

    console.log(this.createTicketForm.value)

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

  handlingStartDateToEndDate(): void {
    this.selectedDate = (this.createTicketForm.get('startDate').value);
   
    this.currentDate = new Date(this.selectedDate);

    // Handling end date via ticket type
    switch (this.createTicketForm.get('ticketTypeDetail').value) {
      case 'vip-day': case 'normal-day': this.endDateHandle = instadate.addDays(this.currentDate, 1); break;
      case 'vip-week': case 'normal-week': this.endDateHandle = instadate.addDays(this.currentDate, 7); break;
      case 'vip-month': case 'normal-month': this.endDateHandle = instadate.addMonths(this.currentDate, 1); break;
      default: instadate.addDays(this.currentDate, 1); break;
    }
    this.endDate = instadate.isoDateString(this.endDateHandle);
    
  }

  handlingTicketWithPrice(): void {
    this.handlingStartDateToEndDate();
    // this.currentPrice = this.createTicketForm.get('price')
    switch (this.createTicketForm.get('ticketTypeDetail').value) {
      case 'vip-day': this.currentPrice = 5000; break;
      case 'vip-week': this.currentPrice = 35000; break;
      case 'vip-month': this.currentPrice = 150000; break;

      case 'normal-day': this.currentPrice = 2000; break;
      case 'normal-week': this.currentPrice = 14000; break;
      case 'normal-month': this.currentPrice = 60000; break;
      default: this.currentPrice = 0;
    }
  }


  onChoosePostion(): void {
    this.router.navigateByUrl('listParkingLot');
  }




  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}