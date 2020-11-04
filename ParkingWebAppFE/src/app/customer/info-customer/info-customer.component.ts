import {Component, OnInit} from '@angular/core';
import {Customer} from '../customer';
import {Car} from '../../car/car';
import {CustomerService} from '../customer.service';
import {CarService} from '../../car/car.service';
import {TicketService} from '../../ticket/services/ticket.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-info-customer',
  templateUrl: './info-customer.component.html',
  styleUrls: ['./info-customer.component.css']
})
export class InfoCustomerComponent implements OnInit {
  carList: Car[];
  id = 0;
  customer = new Customer();
  arrCar = [];

  constructor(private customerService: CustomerService, private carService: CarService, private ticketService: TicketService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(paramMap.get('id'));
    });
    this.customerService.findById(this.id).subscribe(
      next => {
        this.customer = next;
      }, error => {
      }, () => {
        this.carService.findCarByCustomer(this.id).subscribe(
          next => {
            this.carList = next;
          }, error => {
            this.carList = new Array();
          }, () => {
            for (let i = 0; i < this.carList.length; i++) {
              this.arrCar.push([this.carList[i].carId,
                this.carList[i].type,
                this.carList[i].producer,
                this.carList[i].color,
                this.carList[i].license]);
            }
          }
        );
      }
    );
  }
}
