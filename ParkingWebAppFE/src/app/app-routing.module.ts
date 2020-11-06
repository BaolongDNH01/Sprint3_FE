import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ParkingManagementComponent } from './parking-management/parking-management.component';
import { AuthLoginComponent } from './login/auth-login/auth-login.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DetailUserComponent } from './user/detail-user/detail-user.component';
import {ListCustomerComponent} from './customer/list-customer/list-customer.component';
import {AddCustomerComponent} from './customer/add-customer/add-customer.component';
import {InfoCustomerComponent} from './customer/info-customer/info-customer.component';
import {AddParkingLotComponent} from './parking-lot-manage/add-parking-lot/add-parking-lot.component';
import {EditParkingLotComponent} from './parking-lot-manage/edit-parking-lot/edit-parking-lot.component';
import {ParkingMapComponent} from './parking-lot-manage/parking-map/parking-map.component';
import {ListParkingLotComponent} from './parking-lot-manage/list-parking-lot/list-parking-lot.component';
import {StatisticalComponent} from './statistical/statistical.component';
import {StatisticsByDateComponent} from './statistics-by-date/statistics-by-date.component';
import {NotificationComponent} from './notification/notification.component';



export const routes: Routes = [
  {
    path: '', children: [
      {path: 'login', component: AuthLoginComponent},
      {
        path: '', component: HomepageComponent, children: [
          {
            path: 'ticket',
            loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
          },
          {path: 'add-user', component: AddUserComponent},
          {path: 'user/:id', component: DetailUserComponent},
          {path: 'userInfo/:id', component: DetailUserComponent},
          {path: 'list-user', component: ListUserComponent},
          {path: 'list-customer', component: ListCustomerComponent},
          {path: 'add-customer', component: AddCustomerComponent},
          {path: 'info-customer/:id', component: InfoCustomerComponent},
          {path: 'addParkingLot', component: AddParkingLotComponent},
          {path: 'editParkingLot/:id', component: EditParkingLotComponent},
          {path: 'parkingMap', component: ParkingMapComponent},
          {path: 'listParkingLot', component: ListParkingLotComponent},
          {path: 'statistical', component: StatisticalComponent},
          {path: 'statistical/statisticalByDate', component: StatisticsByDateComponent},
          {path: '', component: NotificationComponent},
        ]
      },
    ]
  }];

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
