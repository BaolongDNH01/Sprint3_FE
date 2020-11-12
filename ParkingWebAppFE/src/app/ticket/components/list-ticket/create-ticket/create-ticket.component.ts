import { CarService } from './../../../../service/car.service';
import { CustomerService } from './../../../../customer/customer.service';
import { Customer } from './../../../../customer/customer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/ticket/models/Ticket';
import { TicketType } from 'src/app/ticket/models/TicketType';
import { TicketTypeService } from 'src/app/ticket/services/ticket-type.service';
import { TicketService } from 'src/app/ticket/services/ticket.service';
import instadate from 'instadate';
import { isNgTemplate } from '@angular/compiler';
import { Car } from 'src/app/car/car';
declare var $: any;

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit, OnDestroy {

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
  editTicket: Ticket;
  ticketEditId: number;

  customerList: Customer[];
  alreadyCustomer: string;
  carFollowCustomer: Car[];

  constructor(
    private ticketService: TicketService,
    private ticketTypeService: TicketTypeService,
    private customerService: CustomerService,
    private carService: CarService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getListTicket();
    this.getCustomerList();
    this.getListTicketType();
    this.minDate = new Date();

    this.createTicketForm = this.fb.group({
      ticketId: [''],
      carPlate: [''],
      customerName: [this.alreadyCustomer],
      startDate: [''],
      endDate: [''],
      floorName: [''],
      zoneName: ['',],
      parkingLot: [''],
      ticketTypeDetail: ['Loại'],
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

  getCustomerList(): void {
    this.subscription = this.customerService.findAll().subscribe({
      next: data => {
        this.customerList = data;
        if (localStorage.getItem('customerName')) {
          this.alreadyCustomer = localStorage.getItem('customerName');
          console.log(this.alreadyCustomer);
        }
      },
      error: err => console.log(err),
      complete: () => {
        this.carService.getCarByCustomerName(this.alreadyCustomer).subscribe({
          next: data => {
            this.carFollowCustomer = data.filter(item => item.ticketStatusList[0] !== 'TICKET_ENABLE' );
          },
          error: err => console.log(err),
        });
      }
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

  changeCustomer(customerName: string): void {
    this.carService.getCarByCustomerName(customerName).subscribe({
      next: data => {
        this.carFollowCustomer = data.filter(item => item.ticketStatusList[0] !== 'TICKET_ENABLE' );
      },
      error: err => console.log(err),
    });

  }

  submitCreateTicket(): void {
    console.log(this.createTicketForm.value);
    // this.newTicket = Object.assign({}, this.createTicketForm.value);
    // this.subscription = this.ticketService.createTicket(this.newTicket).subscribe({
    //   next: () => {
    //     localStorage.removeItem('customerName');
    //     localStorage.removeItem('license');
    //     sessionStorage.removeItem('zone');
    //     sessionStorage.removeItem('floor');
    //     sessionStorage.removeItem('idParkingLot');
    //   },
    //   error: err => console.log(err),
    //   complete: () => {
    //     this.checkCreate = false;
    //     this.getListTicket();
    //   }
    // });

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
