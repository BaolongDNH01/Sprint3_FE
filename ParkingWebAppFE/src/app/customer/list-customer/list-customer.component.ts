import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';
import {CarService} from '../../car/car.service';
import {Car} from '../../car/car';
import {TicketService} from '../../ticket/services/ticket.service';
import {Ticket} from '../../ticket/models/Ticket';
import {tick} from '@angular/core/testing';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  customerList: Customer[];
  carList: Car[];
  showCar = true;
  customerDetail =  new Customer();
  showDate = '';
  showTypeTicket = '';
  arrCar = [];
  constructor(private customerService: CustomerService, private carService: CarService, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.customerService.findAll().subscribe(
      next => {
        this.customerList = next;
      }, error => {
        this.customerList = new Array();
      }
    );
  }
  findCarByCustomer(id: number): void{
    this.arrCar = [];
    this.customerService.findById(id).subscribe(
      next => {
        this.customerDetail = next;
      }, error => {
        this.customerDetail = new Customer();
      }, () => {
        this.carService.findCarByCustomer(id).subscribe(
          next => {
            this.carList = next;
          }, error => {
            console.log('error');
            this.carList = new Array();
          }, () => {
            if (this.carList.length !== 0){
              this.showCar = true;
              for (let i = 0; i < this.carList.length; i++){
                this.ticketService.getTicket(this.carList[i].ticket).subscribe(
                  next => {
                    this.showDate = next.startDate + ' - ' + next.endDate;
                    this.showTypeTicket = next.tickTypeDetail;
                  }, error => {
                    this.showDate = '';
                    this.showTypeTicket = '';
                  }, () => {
                    this.arrCar.push([this.carList[i].carId, this.carList[i].type, this.showTypeTicket,
                      this.showDate, this.carList[i].color]);
                  }
                );
              }
            }else {
              this.showCar = false;
            }
          }
        );
      }
    );
  }
}
