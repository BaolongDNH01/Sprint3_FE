import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { InfoCustomerComponent } from './info-customer/info-customer.component';



@NgModule({
  declarations: [ListCustomerComponent, AddCustomerComponent, InfoCustomerComponent],
  exports: [
    ListCustomerComponent,
    HttpClientModule,
    AddCustomerComponent,
    InfoCustomerComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ]
})
export class CustomerModule { }
