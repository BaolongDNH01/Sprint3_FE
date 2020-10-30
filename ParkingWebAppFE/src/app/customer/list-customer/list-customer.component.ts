import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  customerList: Customer[];
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.findAll().subscribe(
      next => {
        this.customerList = next;
      }, error => {
        this.customerList = new Array()
      }
    );
  }

}
