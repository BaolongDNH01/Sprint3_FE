import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { InfoCustomerComponent } from './info-customer/info-customer.component';



@NgModule({
  declarations: [ListCustomerComponent, AddCustomerComponent, InfoCustomerComponent],
  exports: [
    ListCustomerComponent,
    HttpClientModule,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class CustomerModule { }
