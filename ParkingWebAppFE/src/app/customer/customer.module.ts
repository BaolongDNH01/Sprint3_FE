import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ListCustomerComponent],
  exports: [
    ListCustomerComponent,
    HttpClientModule
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ]
})
export class CustomerModule { }
