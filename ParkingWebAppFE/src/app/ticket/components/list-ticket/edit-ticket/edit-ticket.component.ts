import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/ticket/models/Ticket';
import { TicketType } from 'src/app/ticket/models/TicketType';
import { TicketTypeService } from 'src/app/ticket/services/ticket-type.service';
import { TicketService } from 'src/app/ticket/services/ticket.service';
import instadate from 'instadate';
declare var $: any;

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {

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
    this.getListTicket();
    this.getListTicketType();
    this.minDate = new Date();

    this.createTicketForm = this.fb.group({
      ticketId: [''],
      carPlate: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      floorName: ['', [Validators.required]],
      zoneName: ['', [Validators.required]],
      parkingLot: ['', [Validators.required]],
      ticketTypeDetail: ['Loại', [Validators.required]],
      price: [''],
      ticketStatus: ['Chờ...'],
    });
    this.checkCreate = !this.checkCreate;
    console.log('created');

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

  comeBackToList(): void {
    this.router.navigateByUrl('ticket/list');
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
  submitEditForm(): void {
    this.editTicket = Object.assign({}, this.editTicketForm.value);
    this.editTicket.ticketId = this.ticketEditId;

    this.subscription = this.ticketService.patchTicket(this.editTicket).subscribe({
      next: () => this.router.navigateByUrl('/ticket/list'),
      error: err => console.log(err),
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
