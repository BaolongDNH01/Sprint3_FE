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
import { AppRoutingModule } from './app-routing.module';
import { ParkingManagementComponent } from './parking-management/parking-management.component';
import { HomepageComponent } from './homepage/homepage.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    StatisticalComponent,
    StatisticsByDateComponent,
    ParkingManagementComponent,
    HomepageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgxPaginationModule,
    ParkingLotManageModule,
    ChartsModule,
    GoogleChartsModule,
    CustomerModule,
    TicketModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
