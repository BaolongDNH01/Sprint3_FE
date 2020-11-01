import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ParkingLotManageModule} from './parking-lot-manage/parking-lot-manage.module';
import { StatisticalComponent } from './statistical/statistical.component';
import {ChartsModule} from 'ng2-charts';
import { StatisticsByDateComponent } from './statistics-by-date/statistics-by-date.component';
import {GoogleChartsModule} from 'angular-google-charts';
import {CustomerModule} from './customer/customer.module';
import { ParkingManagementComponent } from './parking-management/parking-management.component';
import { HomepageComponent } from './homepage/homepage.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CarService} from './service/car.service';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    StatisticalComponent,
    StatisticsByDateComponent,
    ParkingManagementComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    ParkingLotManageModule,
    ChartsModule,
    GoogleChartsModule,
    CustomerModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
