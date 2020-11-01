import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';
import {CarService} from '../../car/car.service';
import {Car} from '../../car/car';

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
  constructor(private customerService: CustomerService, private carService: CarService) { }

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
            }else {
              this.showCar = false;
            }
          }
        );
      }
    );
  }

  // showTicketDeadline(id: number): string{
  //
  // }

}
