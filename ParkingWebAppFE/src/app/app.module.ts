import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ParkingLotManageModule} from './parking-lot-manage/parking-lot-manage.module';
import { StatisticalComponent } from './statistical/statistical.component';
import {ChartsModule} from 'ng2-charts';
import { StatisticsByDateComponent } from './statistics-by-date/statistics-by-date.component';
import {GoogleChartsModule} from 'angular-google-charts';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StatisticalComponent,
    StatisticsByDateComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    ParkingLotManageModule,
    ChartsModule,
    GoogleChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
