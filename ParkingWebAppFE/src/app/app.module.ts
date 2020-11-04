import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ParkingLotManageModule} from './parking-lot-manage/parking-lot-manage.module';
import { StatisticalComponent } from './statistical/statistical.component';
import {ChartsModule} from 'ng2-charts';
import { StatisticsByDateComponent } from './statistics-by-date/statistics-by-date.component';
import {GoogleChartsModule} from 'angular-google-charts';
import {CustomerModule} from './customer/customer.module';
import { TicketModule } from './ticket/ticket.module';
import { ParkingManagementComponent } from './parking-management/parking-management.component';
import { HomepageComponent } from './homepage/homepage.component';
import {RouterModule} from '@angular/router';
import {CarService} from './service/car.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import {UserModule} from './user/user.module';
import {LoginModule} from './login/login.module';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    AppComponent,
    StatisticalComponent,
    StatisticsByDateComponent,
    ParkingManagementComponent,
    HomepageComponent,
    NotificationComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ParkingLotManageModule,
    ChartsModule,
    GoogleChartsModule,
    CustomerModule,
    FormsModule,
    TicketModule,
    BrowserModule,
    ReactiveFormsModule,
    UserModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
