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
  editTicketForm: FormGroup;
  newTicket: Ticket;
  editTicket: Ticket;
  ticketEditId: number;

  constructor(
    private ticketService: TicketService,
    private ticketTypeService: TicketTypeService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('idParkingLot') || localStorage.getItem('customerName')) {
      this.showCreateForm();
    } else {
      this.checkCreate = false;
    }
    this.getListTicket();
    this.getListTicketType();

    this.minDate = new Date();

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
      ticketId: [''],
      carPlate: [localStorage.getItem('license'), [Validators.required]],
      customerName: [localStorage.getItem('customerName'), [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      floorName: [sessionStorage.getItem('floor'), [Validators.required]],
      zoneName: [sessionStorage.getItem('zone'), [Validators.required]],
      // tslint:disable-next-line: radix
      parkingLot: [parseInt(sessionStorage.getItem('idParkingLot')), [Validators.required]],
      ticketTypeDetail: ['Loại', [Validators.required]],
      price: [''],
      ticketStatus: ['TICKET_ENABLE'],
    });
    this.checkCreate = !this.checkCreate;
    console.log('created');
  }

  submitCreateTicket(): void {
    this.newTicket = Object.assign({}, this.createTicketForm.value);
    this.subscription = this.ticketService.createTicket(this.newTicket).subscribe({
      next: () => {
        localStorage.removeItem('customerName');
        localStorage.removeItem('license');
        sessionStorage.removeItem('zone');
        sessionStorage.removeItem('floor');
        sessionStorage.removeItem('idParkingLot');
      },
      error: err => console.log(err),
      complete: () => {
        this.checkCreate = false;
        this.getListTicket();
      }
    });
  }

  acceptDelete(idTicket: number): void {
    $('#deleteModal' + idTicket).modal('hide');
    this.subscription = this.ticketService.deleteTicket(idTicket).subscribe({
      error: err => console.log(err),
      complete: () => {
        this.getListTicket();
        this.router.navigateByUrl('ticket/list');
      }
    });
  }

  updateTicket(idTicket: number): void {
    this.checkEdit = true;
    this.ticketEditId = idTicket;
    console.log(idTicket);
    this.subscription = this.ticketService.getTicketById(idTicket).subscribe({
      next: data => {
        this.editTicketForm = this.fb.group({
          ticketId: [data.ticketId],
          carPlate: [data.carPlate, [Validators.required]],
          customerName: [data.customerName, [Validators.required]],
          startDate: [data.startDate, [Validators.required]],
          endDate: [data.endDate],
          floorName: [data.floorName, [Validators.required]],
          zoneName: [data.zoneName, [Validators.required]],
          // tslint:disable-next-line: radix
          parkingLot: [data.parkingLot, [Validators.required]],
          ticketTypeDetail: [data.ticketTypeDetail, [Validators.required]],
          price: [data.price],
          ticketStatus: ['TICKET_ENABLE'],
        });
      }
    });
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
