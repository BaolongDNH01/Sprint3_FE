import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {ParkingManagementComponent} from './parking-management/parking-management.component';
import {InfoCustomerComponent} from './customer/info-customer/info-customer.component';
import {ListCustomerComponent} from './customer/list-customer/list-customer.component';
import {AddCustomerComponent} from './customer/add-customer/add-customer.component';


export const routes: Routes = [
  {
    path: 'ticket',
    loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path: '', children: [
      {path: '', component: ParkingManagementComponent},
      {path: 'info-customer/:id', component: InfoCustomerComponent},
      {path: 'list-customer', component: ListCustomerComponent},
      {path: 'add-customer', component: AddCustomerComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
